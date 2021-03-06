const axios = require('axios')
const Key = {
  NAVER: global.sails.config.NAVER
}

module.exports = {
  // oAuth 처리 후 사용자 정보를 돌려준다.
  async oAuth(req, res) {
    
    // https://nid.naver.com/oauth2.0/token?client_id={클라이언트 아이디}&client_secret={클라이언트 시크릿}&grant_type=authorization_code&state={상태 토큰}&code={인증 코드}
    let [code, state, provider, tokenType, accessToken] = [req.param('code'), req.param('state'), req.param('provider'), req.param('token_type'), req.param('access_token')]
    let result = {}, userInfo = undefined

    console.log(code, state, provider, tokenType, accessToken)

    if(provider === 'naver') {
      // code와 state가 넘어온 경우, provider, tokenType, accessToken을 얻어 별도로 할당처리를 해야한다.
      if(code && state) {
        const {clientId, clientSecret} = Key.NAVER
        const {token_type, access_token} = (await axios.get(`https://nid.naver.com/oauth2.0/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&state=${state}&code=${code}`)).data
        accessToken = access_token
        tokenType = token_type
      }
 
      console.log('Provider: ', provider, tokenType, accessToken)
      // provider별로 각각 알맞은 헤더를 작성한 뒤 http 요청한 결과를 얻어와 userInfo로 담아준다.
      const options = {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      }
      try {
        userInfo = (await axios.get('https://openapi.naver.com/v1/nid/me', options)).data.response
      } catch(e) { console.log('요청 실패') }
    }

    res.json(Object.assign(result, userInfo))
  }
}