const router = require("express").Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controllers
const commentController = require("../controllers/commentController")

// Get post comment 
router.get("/:partyId", commentController.getComments)

// Create comment 
router.post("/", verifyToken, commentController.createComment)

// Update comment 
router.patch("/", verifyToken, commentController.updateComment)

// Delete comment 
router.delete("/:partyId/:commentId", verifyToken, commentController.deleteComment)

module.exports = router