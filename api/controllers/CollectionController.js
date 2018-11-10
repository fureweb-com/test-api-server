const moment = require('moment')

module.exports = {
  getCollectionInfo(req, res) {
    const collectionId = req.param('id')

    // 컬렉션 아이디에 해당하는 컬렉션 정보 리턴
    console.log('getCollectionList')
    return res.json({
      brand_info: {
        id: Number(collectionId), // 브랜드 아이디
        name: 'Mother ground', // 브랜드명
        logo_image_url: '/images/mother_ground.jpg', // 브랜드 로고 이미지
      },
      timestamp: +moment(), // 서버 기준 오늘 날짜, ms
      is_funding_now: true, // 현재 펀딩 여부... item_list에서 가장 높은 end_date와 오늘 날짜를 비교해야하나?
      id: Number(collectionId),
      image_list: [
        '/images/5.jpg',
        '/images/6.jpg',
        '/images/7.jpg',
        '/images/8.jpg',
        '/images/9.jpg',
      ],
      title: `${collectionId}번 브랜드의 컬렉션 제목`,
      content: `${collectionId}번 브랜드의 컬렉션 설명이 이곳에 작성되어 내려가고, 소셜미디어 공유 시 태그로 활용됩니다.`,
      item_list: [
        {
          id: 1,
          name: 'S001 SOU (Green grey)',
          end_date: '2018-11-09', // 종료일
          accumulated_amount: 98000, // 펀딩누적금액
          achievement_rate: 325, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: 'https://www.mother-ground.com/wp-content/uploads/2018/06/s001_gg-730x730.jpg', // 이미지 경로
        },
        {
          id: 2,
          name: 'S001 SI (White2)',
          end_date: '2018-12-10', // 종료일
          accumulated_amount: 98000, // 펀딩누적금액
          achievement_rate: 85, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: 'https://www.mother-ground.com/wp-content/uploads/2017/10/s001_wht2-730x730.jpg', // 이미지 경로
        },
        {
          id: 3,
          name: 'S001 QU (Ivory)',
          end_date: '2018-11-06', // 종료일
          accumulated_amount: 98000, // 펀딩누적금액
          achievement_rate: 235, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: 'https://www.mother-ground.com/wp-content/uploads/2017/05/s001_iv_main-730x730.jpg', // 이미지 경로
        },
        {
          id: 4,
          name: 'S001 QU (Ivory 2)',
          end_date: '2018-11-06', // 종료일
          accumulated_amount: 98000, // 펀딩누적금액
          achievement_rate: 45, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: 'https://www.mother-ground.com/wp-content/uploads/2017/05/s001_iv_main-730x730.jpg', // 이미지 경로
        },
      ],
    })
  }
}