const brandList = [
  {
    id: 1, name: 'Mother ground',
    simple_description: '마더그라운드의 새 엘리먼트입니다. <br>까마귀烏오 WU Series',
    logo_image_url: '/images/img-brandlogo-motherground-48.svg',
    image_url:'/images/mother_ground.jpg',
    is_follow: false,
    latest_collection: {
      id: 1,
      is_funding_now: true,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 2, name: 'Rawrow',
    simple_description: 'Rawrow 관련 브랜드 간단 소개글',
    logo_image_url: '/images/img-brandlogo-rawrow-48.svg',
    image_url:'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 2,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 3, name: 'Hideout',
    simple_description: 'Hideout 관련 브랜드 간단 소개글',
    logo_image_url: '/images/img-brandlogo-hideout-48.svg', 
    image_url:'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 3,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 4, name: 'Partimento',
    simple_description: 'Partimento 관련 브랜드 간단 소개글',
    logo_image_url: 'https://via.placeholder.com/1000x1000',
    image_url: 'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 4,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 5, name: 'GBH',
    simple_description: 'GBH 관련 브랜드 간단 소개글',
    logo_image_url: 'https://via.placeholder.com/1000x1000',
    image_url: 'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 5,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 6, name: 'Frontrow',
    simple_description: 'Frontrow 관련 브랜드 간단 소개글',
    logo_image_url: 'https://via.placeholder.com/1000x1000',
    image_url: 'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 6,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 7, name: 'fureweb',
    simple_description: 'fureweb 관련 브랜드 간단 소개글',
    logo_image_url: 'https://via.placeholder.com/1000x1000',
    image_url: 'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 7,
      is_funding_now: true,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
  {
    id: 8, name: 'bindus',
    simple_description: 'bindus 관련 브랜드 간단 소개글',
    logo_image_url: 'https://via.placeholder.com/1000x1000',
    image_url: 'https://via.placeholder.com/1000x1000',
    is_follow: false,
    latest_collection: {
      id: 8,
      is_funding_now: false,
      image_list: ['/images/1.jpg', '/images/2.jpg']
    },
  },
]

module.exports = {
  getBrandList(req, res) {
    // 모든 브랜드 리스트를 응답시킨다.
    // 페이징 처리 필요
    // 스크롤 시 읽어온다.
    if (req.param('listOnly')) {
      return res.json({brandList: brandList.map(brand => {
        const target = Object.assign({}, brand)
        delete target.simple_description
        delete target.collectionImageList
        return target
      })})
    }
    
    res.json({brandList})
  },
  getBrandDetailInfo(req, res) {
    const id = req.param('id')
    if(!id || isNaN(id)) return res.badRequest({message: ['id not found']})

    const brandInfo = brandList.find(brand => brand.id === Number(id))
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