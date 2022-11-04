const router = require("express").Router()

// Controllers
const authController = require("../controllers/authController")

// Register route
router.post("/register", authController.register)

// Login route
router.post("/login", authController.login)

module.exports = router