import express from "express"

import config from "./config.js"

import DB_Mongo from ".model/DB_Mongo.js"
DB_Mongo.connectDB()

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/movements", movementsRouter)

const PORT = process.env.PORT || config.PORT
const server = app.listen(PORT, () => console.log(`Server started in the port ${PORT}`))
server.on("ERROR!!", error => console.log(`Error in the server: ${error.message}`))