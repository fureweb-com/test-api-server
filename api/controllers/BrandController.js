module.exports = {
  getBrandList(req, res) {
    // 모든 브랜드 리스트를 응답시킨다.
  },
  getBrandDetailInfo(req, res) {
    const id = req.param('id')
  },
  followBrand(req, res) {
    const id = req.param('id')
    const {authorization} = req.headers
    // authorization: jwtToken을 통해 우리 사용자인지 확인한다.
    if (!authorization) return res.badRequest({message: ['token not found']})

    const decodedToken = TokenService.decodeJWT(authorization)
    res.json({decodedToken})
  },
  unfollowBrand(req, res) {
    const id = req.param('id')
    const {authorization} = req.headers
    // authorization: jwtToken을 통해 우리 사용자인지 확인한다.
    if (!authorization) return res.badRequest({message: ['token not found']})

    const decodedToken = TokenService.decodeJWT(authorization)
    res.json({decodedToken})
  },
}