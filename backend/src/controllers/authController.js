const bcrypt = require("bcrypt")
const User = require("../models/User")

// Helpers
const createUserToken = require("../helpers/createUserToken")
const encryptPassword = require("../helpers/encryptPassword")

exports.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body
  try {
    // Check for empty fields
    if (!name || !email || !password || !confirm_password)
      return res.json({ error: "Por favor, preencha todos os campos!" })

    // Check exists email
    const existsEmail = await User.findOne({ email })
    if (existsEmail) return res.json({ error: "O email informado já está em uso" })

    // Check if passwords match
    if (password !== confirm_password)
      return res.json({ error: "As senhas não conferem!" })

    // Encrypt password
    const passwordHash = await encryptPassword(password)

    const data = {
      name,
      email,
      password: passwordHash
    }

    const user = await User.create(data)

    // Create token with email and user id
    const token = createUserToken(user)

    res.json({
      error: null,
      msg: "Usuário criado com sucesso!",
      token,
      user_id: user._id
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao cadastrar usuário" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    //check for empty fields
    if (!email || !password)
      return res.json({ error: "Por favor preencha todos os campos" })

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user)
      return res.json({ error: "Email inválido!" })

    // check password match
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.json({ error: "Senha inválida!" })

    // Create token with email and user id
    const token = createUserToken(user)

    res.json({
      error: null,
      msg: "Usuário autenticado com sucesso!",
      token,
      user_id: user._id
    })

  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Erro ao tenar fazer login." })
  }
}