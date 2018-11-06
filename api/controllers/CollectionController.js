const moment = require('moment')

module.exports = {
  getCollectionInfo(req, res) {
    const collectionId = req.param('id')

    // 컬렉션 아이디에 해당하는 컬렉션 정보 리턴

    return res.json({
      brand_info: {
        id: collectionId, // 브랜드 아이디
        name: 'Mother ground', // 브랜드명
        logo_image_url: '/images/mother_ground.jpg', // 브랜드 로고 이미지
      },
      today: moment().format('YYYY-MM-DD'), // 서버 기준 오늘 날짜
      is_funding_now: true, // 현재 펀딩 여부... item_list에서 가장 높은 end_date와 오늘 날짜를 비교해야하나?
      id: collectionId,
      image_list: [
        '/images/5.jpg',
        '/images/6.jpg',
        '/images/7.jpg',
        '/images/8.jpg',
        '/images/9.jpg',
      ],
      title: '컬렉션 제목',
      content: '컬렉션 설명',
      item_list: [
        {
          id: 1,
          name: '아이템명',
          end_date: '2018-12-12', // 종료일
          accumulated_amount: 12345678, // 펀딩누적금액
          achievement_rate: 85, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: '/images/1.jpg', // 이미지 경로
        },
        {
          id: 2,
          name: '아이템명',
          end_date: '2018-12-10', // 종료일
          accumulated_amount: 12345678, // 펀딩누적금액
          achievement_rate: 155, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: '/images/2.jpg', // 이미지 경로
        },
        {
          id: 3,
          name: '아이템명',
          end_date: '2018-12-08', // 종료일
          accumulated_amount: 12345678, // 펀딩누적금액
          achievement_rate: 35, // 퍼센트 소수점 없음, 소수점 첫째자리 반올림처리
          image_url: '/images/3.jpg', // 이미지 경로
        },
      ],
    })
  }
}