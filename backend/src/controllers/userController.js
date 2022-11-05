const User = require("../models/User")

// Helpers
const getUserByToken = require("../helpers/getUserByToken")
const createUserToken = require("../helpers/createUserToken")
const encryptPassword = require("../helpers/encryptPassword")

exports.getUser = async (req, res) => {
  const reqId = req.params.id
  try {
    const token = req.header("auth-token")
    const { _id } = await getUserByToken(token)
    const user_id = _id.toString()

    // Check if ids match
    if (user_id !== reqId) return res.status(401).json({ error: "Acesso negado!" })

    const user = await User.findOne({ _id: user_id }, { password: 0 })
    if (!user) return res.status(400).json({ error: "O usuário não existe!" })

    res.json({ error: null, user })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Usuário não encontrado!" })
  }
}

exports.updateUser = async (req, res) => {
  const { id: reqId, name, email, password, confirm_password } = req.body
  try {
    const token = req.header("auth-token")
    const user = await getUserByToken(token)
    const user_id = user._id.toString()

    // Check if ids match
    if (user_id !== reqId) return res.status(401).json({ error: "Acesso negado!" })

    // Check exists email
    const existsEmail = await User.findOne({ email })
    if (user.email !== email && existsEmail)
      return res.json({ error: "O email informado já está em uso" })

    // Check if passwords match
    if (password !== confirm_password)
      return res.json({ error: "As senhas não conferem!" })

    const updateData = {
      name,
      email
    }

    // Encrypt password
    if (password) updateData.password = await encryptPassword(password)

    const newUser = await User.findOneAndUpdate(
      { _id: user_id },
      { $set: updateData },
      { new: true }
    )

    // Create token with email and user id
    const newToken = createUserToken(newUser)

    res.json({
      error: null,
      msg: "Usuário atualizado!",
      token: newToken,
      user_id: newUser._id
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao atualizar usuário" })
  }
}