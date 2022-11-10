const router = require("express").Router()

// Middleware
const commentController = require("../controllers/commentController")

// Get post comment 
router.get("/:id", commentController.getComments)

// Create comment 
router.post("/", commentController.createComment)

// Delete comment 
router.delete("/:party_id/:comment_id", commentController.deleteComment)

module.exports = router