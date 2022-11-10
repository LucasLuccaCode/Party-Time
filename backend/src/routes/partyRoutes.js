const router = require("express").Router()
const multer = require("multer")

// Controllers
const partyController = require("../controllers/partyController")

// Config
const multerConfig = require("../config/multerConfig")

// Middlewares
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Create party
router.post("/", verifyToken, multer(multerConfig).fields([{ name: "photos" }]), partyController.register)

// Get all public parties
router.get("/all", partyController.allParties)

// Get all user parties
router.get("/userparties", verifyToken, partyController.userParties)

// Get public / private party
router.get("/:id", partyController.party)

// Delete party
router.delete("/:id", verifyToken, partyController.delete)

// Update party
router.patch("/", verifyToken, multer(multerConfig).fields([{ name: "photos" }]), partyController.update)

// Create comment 
router.post("/comment", verifyToken, partyController.createComment)

// Delete comment 
router.delete("/comment/:party_id/:comment_id", verifyToken, partyController.deleteComment)

module.exports = router