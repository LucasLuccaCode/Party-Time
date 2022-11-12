require("dotenv").config()

const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const Comment = require("./Comment")

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
  likes: {
    type: Array,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
})

partySchema.post("save", async function (party, next) {
  if (party._id) {
    await Comment.create({
      partyId: party._id,
      partyUserId: party.user_id,
      comments: []
    })
      .catch(err => console.log(err))
  }
  next()
})

partySchema.post("remove", async function (doc, next) {
  try {
    const partyId = this._id
    const photos = this.photos

    // Delete comments party
    await Comment.deleteOne({ partyId: partyId })

    // Delete party images
    if (photos.length) {
      photos.forEach(filename => {
        fs.unlinkSync(path.resolve("tmp", "uploads", filename))
      })
    }
  } catch (err) {
    // const error = new Error("Erro ao apagar collection comentários.")
    next(err)
  }
  next()
})

partySchema.index({ user_id: 1 })

module.exports = mongoose.model("Party", partySchema)