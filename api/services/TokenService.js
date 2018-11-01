const atob = require('atob')

const b64DecodeUnicode = str => {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = `0${code}`
    }
    return `%${code}`
  }))
}

const getDecodedPayload = str => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/')
  switch (output.length % 4) {
    case 0: break
    case 2: output += '=='; break
    case 3: output += '=';  break
    default: throw 'Illegal base64url string!'
  }

  try { return b64DecodeUnicode(output) } 
  catch (err) { return atob(output) }
}

const getEncodedHeader =_=> {
  const header = {
    'typ': 'JWT',
    'alg': 'HS256',
  }

  return new Buffer(JSON.stringify(header)).toString('base64').replace('=', '')
}

const getEncodedSignature =(encodedHeader, encodedPayload)=>{
  const crypto = require('crypto')
  const signature = crypto.createHmac('sha256', 'secret').update(`${encodedHeader}.${encodedPayload}`).digest('base64').replace('=', '')
  return signature
}

module.exports = {
  encodeJWT(payload = {}) {
    const encodedHeader = getEncodedHeader()
    const encodedPayload = new Buffer(JSON.stringify(payload)).toString('base64').replace('=', '')
    const encodedSignature = getEncodedSignature(encodedHeader, encodedPayload)
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
  },
  decodeJWT(jwtToken) {
    const token = jwtToken.split('.')

    let decodedPayload
    if(token.length !== 3) {
      decodedPayload = '{}'
    } else {
      const [,payload,] = token
      decodedPayload = getDecodedPayload(payload)
    }

    return JSON.parse(decodedPayload)
  }
}