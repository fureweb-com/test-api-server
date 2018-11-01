// config/local.js 파일에 iamport 속성에 아래 필요한 키들을 넣어둔다.
const {rest_key, rest_secret} = global.sails.config.iamport
const axios = require('axios')

module.exports = {
  // @ POST
  async setBillingKey({body: {card_number, expiry, pwd_2digit, birth}}, res) {
    if (!rest_key || !rest_secret) 
      return res.badRequest({message: ['config/local.js 파일 내 iamport: {rest_key, rest_secret} 속성을 설정 후 요청하세요.']})

    // 테스트용 메서드
    if (card_number === '1234123412341234' && expiry === '1234' && pwd_2digit === '12' && birth === '123456')
      return res.json({code: 0, message: [null]})

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
    const billingKeyData = {card_number, expiry: '20' + expiry.slice(2,4) + '/' + expiry.slice(0,2) , birth, pwd_2digit}
    const billingKeyHeaders = {'Content-Type': 'application/json', 'Authorization': access_token}

    const {code, message} = (await axios.post(billingKeyUrl, billingKeyData, {headers: billingKeyHeaders})).data

    if (code === 0) {
      res.json({code, message: [message]})
    } else {
      res.badRequest({code, message: [message]})
    }
  },
  setCardPassword({body: {password = ''}}, res) {
    if (!password) return res.badRequest({message: ['비밀번호가 누락되었습니다.']})
    else if (password.length !== 6) return res.badRequest({message: ['비밀번호는 6자리로 작성되어야합니다.']})

    // 사용자가 자신이 등록한 간편결제 비밀번호로 사용할 정보를 전달받습니다.
    // 실제 사용 시 password는 6자리가 아닌, 복호화할 수 있는 암호화된 문자열이어야합니다.
    console.log(`사용자 uid를 요청 헤더에서 추출한 뒤, 해당 사용자에 대한 간편결제비밀번호인 ${password}를 등록처리한다.`)
    res.json({password})
  }
}
