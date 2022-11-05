require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (token) => {
  if (!token) return this.status(401).json({ error: "Acesso negado!" })
  try {
    const encoded = jwt.verify(token, process.env.SECRET)
    const user = User.findOne({ _id: encoded.id }, { password: 0 })
    return user
  } catch (err) {
    console.log(err)
    this.status(401).json({ error: "Acesso negado!" })
  }
}