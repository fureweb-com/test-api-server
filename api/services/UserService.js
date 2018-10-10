// 임시 사용자 정보 저장소 (메모리)
const users = []

module.exports = {
  nextId() {
    console.log('UserService.nextId()')
    return users.length + 1
  },
  save(user) {
    console.log('UserService.save(user)', user)
    return users.push(user)
  },
  find(type, value) {
    console.log(`UserService.find(${type}, ${value})`)
    const availableType = ['id', 'email', 'name', 'providerId']
    if(!availableType.includes(type)) return null
    else if(type === 'providerId') {
      // 이메일도 함께 체크
      const currentUser = users.find(user => user[type] === value)
      return currentUser ? users.find(user => user['email'] === currentUser.email) : null
    } else {
      return users.find(user => user[type] === value)
    }
  },
  checkPassword(email, password) {
    console.log(`UserService.checkPassword(${email}, ${password})`)
    return users.find(user => user.email === email && user.password === password)
  },
  update(user) {

  },
  delete(id) {

  }
}