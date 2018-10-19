const moment = require('moment')

module.exports = {
  getArticleList(req, res) {
    console.log('getArticleList')
    const [type] = [req.param('type')]
    if(!type) return res.badRequest('타입이 존재하지 않습니다.')

    const result = {
      boardList: 
      type === 'faq' ? [
        { id: 1, type, user_id: 1, name: '1번 자주묻는질문 작성자', title: '1번 자주묻는질문 제목', content: '1번 자주묻는질문 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 2, type, user_id: 2, name: '2번 자주묻는질문 작성자', title: '2번 자주묻는질문 제목', content: '2번 자주묻는질문 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 3, type, user_id: 3, name: '3번 자주묻는질문 작성자', title: '3번 자주묻는질문 제목', content: '3번 자주묻는질문 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 4, type, user_id: 4, name: '4번 자주묻는질문 작성자', title: '4번 자주묻는질문 제목', content: '4번 자주묻는질문 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 5, type, user_id: 5, name: '5번 자주묻는질문 작성자', title: '5번 자주묻는질문 제목', content: '5번 자주묻는질문 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
      ] :
      type === 'qna' ? [
        { id: 1, type, user_id: 1, name: '1번 질문과 답변 작성자', title: '1번 질문과 답변 제목', content: '1번 질문과 답변 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 2, type, user_id: 2, name: '2번 질문과 답변 작성자', title: '2번 질문과 답변 제목', content: '2번 질문과 답변 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 3, type, user_id: 3, name: '3번 질문과 답변 작성자', title: '3번 질문과 답변 제목', content: '3번 질문과 답변 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 4, type, user_id: 4, name: '4번 질문과 답변 작성자', title: '4번 질문과 답변 제목', content: '4번 질문과 답변 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 5, type, user_id: 5, name: '5번 질문과 답변 작성자', title: '5번 질문과 답변 제목', content: '5번 질문과 답변 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
      ] :
      type === 'notice' ? [
        { id: 1, type, user_id: 1, name: '1번 공지사항', title: '1번 공지사항 제목', content: '1번 공지사항 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 2, type, user_id: 2, name: '2번 공지사항', title: '2번 공지사항 제목', content: '2번 공지사항 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 3, type, user_id: 3, name: '3번 공지사항', title: '3번 공지사항 제목', content: '3번 공지사항 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 4, type, user_id: 4, name: '4번 공지사항', title: '4번 공지사항 제목', content: '4번 공지사항 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
        { id: 5, type, user_id: 5, name: '5번 공지사항', title: '5번 공지사항 제목', content: '5번 공지사항 내용', view_count: 1, created_at: +moment(), updated_at: +moment() },
      ] : []
    }
    res.json(result)
  },
  getArticle(req, res) {
    console.log('getArticle')
    const [type, id] = [req.param('type'), req.param('id')]
    if(!type) return res.badRequest('타입이 존재하지 않습니다.')
    else if(!id) return res.badRequest('아이디가 존재하지 않습니다.')

    const result = {
      type,
      id,
      user_id: 1,
      name: '1번 게시글작성자',
      title: `${type}에 대한 ${id}번 글 테스트 제목`,
      content: `타입: ${type}, 아이디: ${id}}\n해당 게시글에 대한 본문을 DB에서 조회 후 응답`,
      view_count: 1,
      created_at: +moment(),
      updated_at: +moment(),

    }
    res.json(result)
  },
}