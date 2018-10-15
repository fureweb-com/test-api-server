const moment = require('moment')

module.exports = {
  getArticle(req, res) {
    const [type, id] = [req.param('type'), req.param('id')]
    if(!type) return res.badRequest('타입이 존재하지 않습니다.')
    else if(!id) return res.badRequest('아이디가 존재하지 않습니다.')

    const result = {
      type,
      id,
      title: `${type}에 대한 ${id}번 글 테스트 제목`,
      content: `타입: ${type}, 아이디: ${id}}\n해당 게시글에 대한 본문을 DB에서 조회 후 응답`,
    }
    res.json(result)
  },
}