module.exports = {
  async login(req, res) {
    const { type, id } = req.body
    if(!type || !id) return res.badRequest()

    // 유효한 사용자인지 확인

    // 타입이 이메일인 경우, 내부에 저장된 암호화된 비밀번호와 일치하는지 확인 필요

    // 토큰 발급
    // 발급 시점으로부터 30분(기본) 유효한 모든 요청에 사용할 토큰
    const token = 'abcd.efg.hijk'
    // 토큰 만료 시 갱신때 사용하기 위한 토큰
    const refreshToken = 'bcde.fgh.ijkl'

    res.json({token, refreshToken})
  },
  logout(req, res) {
    console.log('logout called')
    res.json({})
  }
}