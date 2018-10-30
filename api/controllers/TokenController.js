module.exports = {
  refreshToken(req, res) {
    // refresh용 token을 전달받는다.
    const {refreshToken} = req.body
    if(!refreshToken) return res.badRequest({message: ['refreshToken not found']})

    console.log('refreshToken request::', refreshToken)
    // 토큰 새로 발급 후 응답
    return res.json({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IuqwseyLoOuQnOyCrOyaqeyekCJ9.Ow1rIA5jY2yTFL3CHA8spD_iODBfQBqflPkcfO9Gm-I', 
      refreshToken: 'new_refresh_token_from_server'
    })
  }
}