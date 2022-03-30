
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const SERVER_PORT = process.env.PORT || 4003
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
app.use(bodyParser.urlencoded({ extended: true }))

const {getAllPosts, getUser, makeNewPost, getPost} = require('./controller.js')

app.post('/seed', seed)

app.get('/posts', getAllPosts)

//used as a tester
app.get('/users', getUser)

app.post('/newPost', makeNewPost)

app.get('/posts/:id', getPost)



app.listen(SERVER_PORT, () => {
    console.log(`docked at port ${SERVER_PORT}`)
})