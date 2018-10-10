const axios = require('axios')
const serverHost = process.env.NODE_ENV === 'production' ? 'https://api.odigaji.com' : 'http://localhost:3000'
const isValidSignup = (provider, args) => {
  if(provider === 'email') {
    console.log('email check')
    const {email, password, name} = args
    return !email || !password || !name ? false : true
  } else {
    console.log('!email check')
    const {id} = args
    return !id ? false : true
  }
}

const getUserByProvider = (provider, args) => {
  if(provider === 'email') {
    console.log('getUserByProvider email')
    const {email} = args
    if(!email) return null
    else return UserService.find('email', email)
  } else {
    console.log('getUserByProvider !email')
    const {id} = args
    if(!id) return null
    else return UserService.find('id', id)
  }
}

module.exports = {
  async signup(req, res) {
    console.log('signup called')
    const {provider, id, email, password, name, mobile, referrer} = req.body
    
    if(!isValidSignup(provider, {id, email, password, name, mobile, referrer})){
      return res.badRequest('필수 정보가 누락되었습니다.')
    }

    // 회원 가입 처리 -- 트랜잭션 처리 일단 없음 -_- DB의 도움을 받을 예정.
    const selectedUser = getUserByProvider(provider, {id, email, password, name, mobile, referrer})
    
    // const selectedUser = UserService.find('email', email)
    if(selectedUser) return res.badRequest('이미 가입된 사용자입니다.')
    
    const currentUser = { id: UserService.nextId(), email, password, name, mobile, referrer }
    UserService.save(currentUser)

    // 로그인 처리 후 토큰 발행하여 발급된 토큰 가져오기
    const {status, data: result} = (await axios.post(`${serverHost}/api/v1/users/login`, {provider, email, password}))

    // 토큰이 발행되지 않은, status가 200이 아닌경우 별도 처리 필요

    // 테스트 응답용 데이터
    res.json(Object.assign(result))
  },
  
}