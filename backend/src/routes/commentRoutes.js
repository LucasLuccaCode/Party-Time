const router = require("express").Router()

// Middleware
const commentController = require("../controllers/commentController")

// Get post comment 
router.get("/:partyId", commentController.getComments)

// Create comment 
router.post("/", commentController.createComment)

// Update comment 
router.patch("/", commentController.updateComment)

// Delete comment 
router.delete("/:partyId/:commentId", commentController.deleteComment)

module.exports = router