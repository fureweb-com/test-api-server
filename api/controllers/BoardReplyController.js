const moment = require('moment')
const extractMandatoryFields = (req, res) => {
  const {authorization: jwtToken} = req.headers
  if(!jwtToken || jwtToken === 'undefined') return res.forbidden(), undefined

  const userInfo = TokenService.decodeJWT(jwtToken)
  console.log('userInfo', userInfo)
  const [category, boardId, replyId] = [req.param('category'), req.param('boardId'), req.param('replyId')]

  if(!category) return res.badRequest({message: ['category가 존재하지 않습니다.']}), undefined
  else if(!boardId) return res.badRequest({message: ['boardId이 존재하지 않습니다.']}), undefined
  else if(!replyId) return res.badRequest({message: ['replyId이 존재하지 않습니다.']}), undefined

  return {category, boardId, replyId, user: userInfo}
}

// 메모리에 임시로 작성
const replyList = [
  // {id, content, user_id, created_at, modifiedAt, is_like_votted, is_unlike_votted} 형태로 응답
  { id: 1, user_id: 1, name: '1빠충', content: '1빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
  { id: 2, user_id: 2, name: '2빠충', content: '2빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
  { id: 3, user_id: 3, name: '3빠충', content: '3빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
  { id: 4, user_id: 4, name: '4빠충', content: '4빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
  { id: 5, user_id: 5, name: '5빠충', content: '5빠', created_at: +moment(), is_like_votted: false, is_unlike_votted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
]

module.exports = {
  getReplyList(req, res) {
    const [category, boardId, page = 1] = [req.param('category'), req.param('boardId'), req.param('page')]
    const result = { replyList }

    res.json(result)
  },
  updateReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return
    
    const {category, boardId, replyId, user} = fields
    console.log('updateReply', category, boardId, replyId, user)
    const {content} = req.body
    let isUpdated = false
    replyList.forEach(reply => {
      if(reply.id === Number(replyId) && reply.user_id === user.id) {
        isUpdated = true
        reply.content = content
      }
      return reply
    })

    res.json({isUpdated})
  },
  deleteReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return

    const {category, boardId, replyId, user} = fields
    console.log('deleteReply', category, boardId, replyId, user)
    const indexToDelete = replyList.findIndex(reply => reply.id === Number(replyId) && reply.user_id === user.id)
    let isDeleted = false
    if(indexToDelete > -1)
      isDeleted = !!replyList.splice(indexToDelete, 1).length

    res.json({isDeleted})
  },
  likeReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return res.badRequest()

    const {category, boardId, replyId, user} = fields
    console.log('likeReply', category, boardId, replyId)
    res.json({category, boardId, replyId, userId: user.id})
  },
  dislikeReply(req, res) {
    const fields = extractMandatoryFields(req, res)
    if(!fields) return res.badRequest()

    const {category, boardId, replyId, user} = fields
    console.log('dislikeReply', category, boardId, replyId)
    res.json({category, boardId, replyId, userId: user.id})
  },
}
