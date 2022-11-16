const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const encode = (payload) => {
  return jwt.sign(payload, SECRET)
}

const decode = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = {
  encode,
  decode
}