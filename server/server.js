require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const {SERVER_PORT} = process.env
const{seed} = require('./seed.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)



app.listen(SERVER_PORT, () => {
    console.log(`docked at port ${SERVER_PORT}`)
})