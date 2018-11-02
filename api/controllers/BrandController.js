const brandList = [
  {id: 1, name: 'Motherground', simpleDescription: '이번엔 모래沙와 바위巖으로 만납니다.<br>마더그라운드 2019 S/S', imageUrl: '/images/mother_ground.jpg', isFollow: false, collectionList: [{id: 1, imageUrl:'/images/mother_ground.jpg', isFundingNow: true}, {id: 2, imageUrl:'/images/mother_ground.jpg', isFundingNow: false}]},
  {id: 2, name: 'Rawrow', simpleDescription: 'Rawrow 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 3, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 4, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 3, name: 'Hideout', simpleDescription: 'Hideout 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 5, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 6, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 4, name: 'Partimento', simpleDescription: 'Partimento 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 7, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 8, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 5, name: 'GBH', simpleDescription: 'GBH 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 9, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 10, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 6, name: 'Frontrow', simpleDescription: 'Frontrow 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 11, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 12, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 7, name: 'fureweb', simpleDescription: 'fureweb 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 13, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 14, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
  {id: 8, name: 'bindus', simpleDescription: 'bindus 관련 브랜드 간단 소개글', imageUrl: 'https://via.placeholder.com/1000x1000', isFollow: false, collectionList: [{id: 15, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}, {id: 16, imageUrl:'https://via.placeholder.com/1000x1000', isFundingNow: false}]},
]

module.exports = {
  getBrandList(req, res) {
    // 모든 브랜드 리스트를 응답시킨다.
    // 페이징 처리 필요
    // 스크롤 시 읽어온다.
    res.json({brandList})
  },
  getBrandDetailInfo(req, res) {
    const id = req.param('id')
    if(!id || isNaN(id)) return res.badRequest({message: ['id not found']})

    const brandInfo = brandList.find(brand => brand.id === id)
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