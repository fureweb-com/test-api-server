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
  selectList() {
    return brandList
  },
  selectById(id) {
    return brandList.find(brand => brand.id === Number(id))
  }
}