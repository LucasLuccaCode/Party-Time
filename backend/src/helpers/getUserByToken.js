require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (token) => {
  if(!token) return

  const encoded = jwt.verify(token, process.env.SECRET)
  const user = User.findOne({ _id: encoded.id }, { password: 0 })
  return user
}