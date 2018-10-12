const axios = require('axios')

module.exports = {
  // oAuth 처리 후 사용자 정보를 돌려준다.
  async oAuth(req, res) {
    const [type, tokenType, accessToken] = [req.param('type'), req.param('token_type'), req.param('access_token')]
    
    let result = {}, userInfo = undefined

    if(type === 'naver') {
      // type별로 각각 알맞은 헤더를 작성한 뒤 http 요청한 결과를 얻어와 userInfo로 담아준다.
      const options = {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      }
      userInfo = (await axios.get('https://openapi.naver.com/v1/nid/me', options)).data.response
    }

    res.json(Object.assign(result, userInfo))
  }
}