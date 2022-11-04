const multer = require("multer")
const path = require("path")

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("tmp", "uploads"))
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
}