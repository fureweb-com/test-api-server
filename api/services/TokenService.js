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

module.exports = {
  decodeJWT(jwtToken) {
    const token = jwtToken.split('.')

    if(token.length !== 3) throw `invalid jwt token: ${jwtToken}`
    const [,payload,] = token
    const decodedPayload = getDecodedPayload(payload)

    return JSON.parse(decodedPayload)
  }
}