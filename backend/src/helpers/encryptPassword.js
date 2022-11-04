const bcrypt = require("bcrypt")

module.exports = async (password) => {
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}