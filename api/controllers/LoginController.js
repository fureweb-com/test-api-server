module.exports = {
  async login(req, res) {
    const { provider, uid, email, password } = req.body
    console.log('login called', provider, uid, email, password)
    if(!provider) return res.badRequest()

    // 프로바이더가 이메일인 경우, 내부에 저장된 암호화된 비밀번호와 일치하는지 확인 필요
    let currentUser = {}
    if(String(provider).toUpperCase() === 'EMAIL') {
      // email, password
      if(!email) return res.badRequest({message: ['이메일 주소를 입력해주세요.']})
      else if(!password) return res.badRequest({message: ['비밀번호를 입력해주세요.']})

      currentUser = UserService.checkPassword(email, password)
      if(!currentUser) return res.badRequest({message: ['로그인 실패']})
    } else {
      // provider, uid
      if(!uid) return res.badRequest({message: ['고유번호 누락']})
      currentUser = UserService.findByProviderAndId(provider, uid)
      
      if(!currentUser) return res.badRequest({message: ['로그인 실패']})
    }

    // 토큰 발급
    // 발급 시점으로부터 30분(기본) 유효한 모든 요청에 사용할 토큰
    // 전달받은 사용자 이름을 name에 넣어 토큰을 내려준다. 아래 토큰 인코딩 필요!
    const token = TokenService.encodeJWT({provider, uid, email})
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iu2FjOyKpO2EsCJ9.H8QPT0JlOxF-4MEMA3R54JF5tNFIGvlKwbFfrMwKZI4'
    // 토큰 만료 시 갱신때 사용하기 위한 토큰
    const refreshToken = 'test.token.for_refresh'

    res.json({token, refreshToken, name: currentUser.name, thumbnail_image: currentUser.thumbnail_image})
  },
  logout(req, res) {
    console.log('logout called')
    res.json({})
  }
}