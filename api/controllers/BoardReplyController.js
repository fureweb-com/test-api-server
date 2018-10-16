const moment = require('moment')
const extractMandatoryFields = (req, res) => {
  const {authorization: jwtToken} = req.headers
  if(!jwtToken) return res.forbidden(), undefined

  const userInfo = TokenService.decodeJWT(jwtToken)
  const [type, boardId, replyId] = [req.param('type'), req.param('boardId'), req.param('replyId')]

  if(!type) return res.badRequest('type이 존재하지 않습니다.'), undefined
  else if(!boardId) return res.badRequest('boardId이 존재하지 않습니다.'), undefined
  else if(!replyId) return res.badRequest('replyId이 존재하지 않습니다.'), undefined

  return {type, boardId, replyId, user: userInfo}
}

module.exports = {
  getReplyList(req, res) {
    const [type, boardId, page = 1] = [req.param('type'), req.param('boardId'), req.param('page')]
    const result = {
      replyList: [
        // {id, content, user_id, created_at, modifiedAt, is_like_votted, is_unlike_votted} 형태로 응답
        { id: 1, user_id: 1, name: '1빠충', content: '1빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 2, user_id: 2, name: '2빠충', content: '2빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 3, user_id: 3, name: '3빠충', content: '3빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 4, user_id: 4, name: '4빠충', content: '4빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 5, user_id: 5, name: '5빠충', content: '5빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
      ]
    }

    res.json(result)
  },
  updateReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return

    const {type, boardId, replyId, user} = fields
    const {content} = req.body
    
    console.log('updateReply', type, boardId, replyId, content)
    res.json({type, boardId, replyId, userId: user.id})
  },
  deleteReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return

    const {type, boardId, replyId, user} = fields
    console.log('deleteReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId: user.id})
  },
  likeReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return

    const {type, boardId, replyId, user} = fields
    console.log('likeReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId: user.id})
  },
  dislikeReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return

    const {type, boardId, replyId, user} = fields
    console.log('dislikeReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId: user.id})
  },
}
