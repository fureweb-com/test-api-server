const moment = require('moment')

module.exports = {
  getReplyList(req, res) {
    const [type, boardId, page = 1] = [req.param('type'), req.param('id'), req.param('page')]
    const result = {
      replyList: [
        // {id, content, userId, createdAt, modifiedAt, isLikeVotted, isUnlikeVotted} 형태로 응답
        { id: 1, userId: 1, name: '1빠충', content: '1빠', createdAt: +moment(), isLikeVotted: false, isUnlikeVotted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 2, userId: 2, name: '2빠충', content: '2빠', createdAt: +moment(), isLikeVotted: false, isUnlikeVotted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 3, userId: 3, name: '3빠충', content: '3빠', createdAt: +moment(), isLikeVotted: false, isUnlikeVotted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 4, userId: 4, name: '4빠충', content: '4빠', createdAt: +moment(), isLikeVotted: false, isUnlikeVotted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
        { id: 5, userId: 5, name: '5빠충', content: '5빠', createdAt: +moment(), isLikeVotted: false, isUnlikeVotted: false }, // 현재 사용자가 해당 댓글에 대해 추천 또는 비추천했는지에 대한 데이터
      ]
    }

    res.json(result)
  }
}