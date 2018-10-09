const axios = require('axios')
const serverHost = process.env.NODE_ENV === 'production' ? 'https://api.odigaji.com' : 'http://localhost:3000'

module.exports = {
  async join(req, res) {
    const {email, password1, password2, name, mobile, referrer} = req.body
    
    // validation (일단 생략)
    if(!email || !password1 || !password2 || !name)
      return res.badRequest('필수 정보가 누락되었습니다.')
    else if(password1 !== password2)
      return res.badRequest('비밀번호가 서로 일치하지 않습니다.')

    // 회원 가입 처리 -- 트랜잭션 처리 일단 없음 -_- DB의 도움을 받을 예정.
    const selectedUser = UserService.find('email', email)
    if(selectedUser) return res.badRequest('사용중인 이메일입니다.')

    const currentUser = { id: UserService.nextId(), email, password: password1, name, mobile, referrer }
    UserService.save(currentUser)

    // 로그인 처리 후 토큰 발행하여 발급된 토큰 가져오기
    const {status, data: result} = (await axios.post(`${serverHost}/api/v1/login`, {type: 'email', id: currentUser.id}))

    // 토큰이 발행되지 않은, status가 200이 아닌경우 별도 처리 필요

    // 테스트 응답용 데이터
    delete currentUser.password
    res.json(Object.assign(result, {user: {...currentUser}}))
  }
}