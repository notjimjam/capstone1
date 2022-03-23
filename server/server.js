require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const {SERVER_PORT} = process.env
const{seed} = require('./seed.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        
    },
    define: {
        timestamps: false
    }
})

app.use(express.json())
app.use(cors())

const {getAllPosts, getUser} = require('./controller.js')

app.post('/seed', seed)

app.get('/posts', getAllPosts)

//used as a tester
app.get('/users', getUser)


app.listen(SERVER_PORT, () => {
    console.log(`docked at port ${SERVER_PORT}`)
})