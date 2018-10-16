const moment = require('moment')
const getMandatoryFields = (req, res) => {
  const {authorization: jwtToken} = req.headers
  const userInfo = TokenService.decodeJWT(jwtToken)
  const [type, boardId, replyId] = [req.param('type'), req.param('boardId'), req.param('replyId')]

  if(!type) return res.badRequest('type이 존재하지 않습니다.')
  else if(!boardId) return res.badRequest('boardId이 존재하지 않습니다.')
  else if(!replyId) return res.badRequest('replyId이 존재하지 않습니다.')

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
    const {type, boardId, replyId, user: {id: userId}} = getMandatoryFields(req, res)
    const {content} = req.body
    
    console.log('updateReply', type, boardId, replyId, content)
    res.json({type, boardId, replyId, userId})
  },
  deleteReply(req, res) {
    const {type, boardId, replyId, user: {id: userId}} = getMandatoryFields(req, res)
    console.log('deleteReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId})
  },
  likeReply(req, res) {
    const {type, boardId, replyId, user: {id: userId}} = getMandatoryFields(req, res)
    console.log('likeReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId})
  },
  dislikeReply(req, res) {
    const {type, boardId, replyId, user: {id: userId}} = getMandatoryFields(req, res)
    console.log('dislikeReply', type, boardId, replyId)
    res.json({type, boardId, replyId, userId})
  },
}
