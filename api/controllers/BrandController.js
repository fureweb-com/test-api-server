const {brandservice: BrandService} = global.sails.services

module.exports = {
  getBrandList(req, res) {
    // 모든 브랜드 리스트를 응답시킨다.
    // 페이징 처리 필요
    // 스크롤 시 읽어온다.
    const brandList = BrandService.selectList()
    if (req.param('listOnly')) {
      return res.json({brand_list: brandList.map(brand => {
        const target = Object.assign({}, brand)
        delete target.simple_description
        delete target.latest_collection
        return target
      })})
    }
    
    res.json({brand_list: brandList})
  },
  getBrandDetailInfo(req, res) {
    const id = req.param('id')
    if(!id || isNaN(id)) return res.badRequest({message: ['id not found']})

    const brandInfo = BrandService.selectById(id)
    if(!brandInfo) return res.badRequest({message: ['존재하지 않는 브랜드입니다.']})
    res.json(brandInfo)
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