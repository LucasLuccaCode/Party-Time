const router = require("express").Router()

// Controllers
const userController = require("../controllers/userController")

// Register route
router.get("/:id", userController.getUser)

// Login route
router.patch("/", userController.updateUser)

module.exports = router