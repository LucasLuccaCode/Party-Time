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
    type: mongoose.ObjectId
  },
  user_name: {
    type: String
  }
})

partySchema.index({ user_id: 1 })

partySchema.pre("save", function(){
  if(this.photos.length) this.photos = this.photos.map( url => process.env.APP_URL+"/photos/"+url)
})

module.exports = mongoose.model("Party", partySchema)