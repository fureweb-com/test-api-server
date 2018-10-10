module.exports = {
  async login(req, res) {
    const { provider, id, email, password } = req.body
    console.log('login called', provider, id, email, password)
    if(!provider) return res.badRequest()

    // 프로바이더가 이메일인 경우, 내부에 저장된 암호화된 비밀번호와 일치하는지 확인 필요
    let currentUser = {}
    if(String(provider).toUpperCase() === 'EMAIL') {
      // email, password
      if(!email) return res.badRequest('이메일 주소를 입력해주세요.')
      else if(!password) return res.badRequest('비밀번호를 입력해주세요.')

      currentUser = UserService.checkPassword(email, password)
      if(!currentUser) return res.badRequest('로그인 실패')
    } else {
      // provider, id
      if(!id) return res.badRequest('고유번호 누락')
      currentUser = UserService.findByProviderAndId(provider, id)
      
      if(!currentUser) return res.badRequest('로그인 실패')
    }

    // 토큰 발급
    // 발급 시점으로부터 30분(기본) 유효한 모든 요청에 사용할 토큰
    const token = 'abcd.efg.hijk'
    // 토큰 만료 시 갱신때 사용하기 위한 토큰
    const refreshToken = 'bcde.fgh.ijkl'

    res.json({token, refreshToken, name: currentUser.name, thumbnailImage: currentUser.thumbnailImage})
  },
  logout(req, res) {
    console.log('logout called')
    res.json({})
  }
}