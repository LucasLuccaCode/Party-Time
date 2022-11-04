const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")

// Import routes

// Middlewares

// Config
const PORT = 3000
app.use(cors())
app.use("/photos", express.static(path.resolve("tmp", "uploads")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connection with mongodb

// home route 
app.get("/", (req, res) => {
  res.json({ message: "Start Route" })
})

// Use routes

// Start server
app.listen(PORT, () => {
  console.log("Listening on port " + PORT)
})