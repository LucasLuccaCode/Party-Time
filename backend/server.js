const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")

// Import routes
const authRoutes = require("./src/routes/authRoutes")
const userRoutes = require("./src/routes/userRoutes")

// Middlewares
const verifyToken = require("./src/middlewares/checkTokenMiddleware")

// Config
const PORT = 3000
app.use(cors())
app.use("/photos", express.static(path.resolve("tmp", "uploads")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connection with mongodb
const db = require("./src/config/db")
db.once("open", () => {
  console.log("Connected on mongodb")
  app.emit("logged")
})

// home route 
app.get("/", (req, res) => {
  res.json({ message: "Start Route" })
})

// Use routes
app.use("/auth", authRoutes)
app.use("/user", verifyToken, userRoutes)


// Start server
app.on("logged", () => {
  app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
  })
})