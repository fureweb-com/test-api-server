// config/local.js 파일에 iamport 속성에 아래 필요한 키들을 넣어둔다.
const {rest_key, rest_secret} = global.sails.config.iamport
const axios = require('axios')

module.exports = {
  // @ POST
  async setBillingKey({body: {card_number, expiry, pwd_2digit, birth}}, res) {
    if(!rest_key || !rest_secret) 
      return res.badRequest({message: ['config/local.js 파일 내 iamport: {rest_key, rest_secret} 속성을 설정 후 요청하세요.']})

    // 사용자가 입력한 카드정보를 통해 iamport에 billingKey를 요청해 얻어온 뒤 리턴시킨다.
    const customer_uid = 'abcd_1234' // 주문과 관련된 사용자 고유번호, 이 값이 향후 결제를 위한 billingKey가 된다.

    /**
     * card_number: 카드번호 16자리
     * expiry: 만료일(MMYY)
     * pwd_2digit: 카드 비밀번호 앞 두자리
     * birth: 생년월일 6자리 또는 법인번호 10자리
     */
    // console.log(card_number, expiry, pwd_2digit, birth)

    // 토큰 발급
    const tokenUrl = 'https://api.iamport.kr/users/getToken'
    const tokenData = {imp_key: rest_key, imp_secret: rest_secret}
    const tokenHeaders = {'Content-Type': 'application/json'}
    const {access_token} = (await axios.post(tokenUrl, tokenData, {headers: tokenHeaders})).data.response

    // 빌링키 발급.. 사용자 고유번호를 빌링키로 사용하도록 iamport쪽에 등록 요청한다.
    // customer_uid가 abcd_1234인 경우, 향후 abcd_1234로 즉시 승인요청할 수 있는 준비가 되는 것이다.
    const billingKeyUrl = `https://api.iamport.kr/subscribe/customers/${customer_uid}`
    const billingKeyData = {card_number, expiry, birth, pwd_2digit}
    const billingKeyHeaders = {'Content-Type': 'application/json', 'Authorization': access_token}

    const {code, message} = (await axios.post(billingKeyUrl, billingKeyData, {headers: billingKeyHeaders})).data

    if (code === 0) {
      res.json({code, message: [message]})
    } else {
      res.badRequest({code, message: [message]})
    }
  }
}
