require("dotenv").config()

const mongoose = require("mongoose")

const partySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  party_date: {
    type: Date,
    required: true
  },
  photos: {
    type: Array
  },
  privacy: {
    type: Boolean
  },
  user_id: {
    type: mongoose.ObjectId,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
})

partySchema.index({ user_id: 1 })

module.exports = mongoose.model("Party", partySchema)