const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  partyId: {
    type: mongoose.ObjectId,
    required: true
  },
  partyUserId: {
    type: mongoose.ObjectId,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
})

commentSchema.index({ partyId: 1 })

module.exports = mongoose.model("Comment", commentSchema)