// 임시 사용자 정보 저장소 (메모리)
const users = []

module.exports = {
  getUserByProvider(provider, args) {
    if(String(provider).toLowerCase() === 'email') {
      console.log('getUserByProvider email')
      const {email} = args
      if(!email) return null
      else return UserService.find('email', email)
    } else {
      console.log('getUserByProvider !email', provider)
      const {uid: providerId} = args
      if(!provider || !providerId) return null
      else return UserService.findByProviderAndId(provider, providerId)
    }
  },
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
  findByProviderAndId(provider, uid) {
    console.log(`UserService.findByProviderAndId(${provider}, ${uid})`)
    return users.find(user => user.provider === provider && user.providerId === uid)
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