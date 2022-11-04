const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  const token = req.header("auth-token")
  if(!token) return res.status(401).json({ error: "Acesso negado!"})
  
  try {
    const encoded = jwt.verify(token, process.env.SECRET)
    next()
  } catch(err){
    console.log(err)
    res.status(401).json({ error: "Acesso negado!"})
  }
}