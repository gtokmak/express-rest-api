require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const router = require('./src/routers')
const errorHandlerMiddleware = require('./src/middlewares/errorHandler')
const db = require('./src/db/db.connection.js')
db()

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.get('/', (req, res) => {
    res.json({message: "Hoş geldiniz."})
})
app.use("/api", router)

// hata yakalama
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server ${port} baslatildi.`)
})