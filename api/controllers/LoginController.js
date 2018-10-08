// 임시 저장을 위한 공간
const data = {}

module.exports = {
  async login(req, res) {
    const { type, id } = req.body
    if(!type || !id) res.badRequest()

    // 유효한 사용자인지 확인

    // 토큰 발급
    const token = 'abcd'

    res.json({token})
  },
  logout(req, res) {
    console.log('logout called')
    res.json({})
  }
}