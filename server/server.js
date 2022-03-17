require('dotenv').config()

const {SERVER_PORT} = process.env

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())





app.listen(SERVER_PORT, () => {
    console.log(`docked at port ${SERVER_PORT}`)
})