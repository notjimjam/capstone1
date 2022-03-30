
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

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

//static endpoints for deployment

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/'))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.js"))
})

app.get("/styles", (req, res) =>  {
    res.sendFile(path.join(path.join(__dirname, "../public/index.css")))
}) 

app.get("/works", (req, res) =>  {
    res.sendFile(path.join(path.join(__dirname, "../public/works.html")))
})

app.get("/posts", (req, res) =>  {
    res.sendFile(path.join(path.join(__dirname, "../public/post.html")))
})

app.get("/newPost", (req, res) =>  {
    res.sendFile(path.join(path.join(__dirname, "../public/newPost.html")))
})


app.use(express.static(path.join(__dirname, "../public")))

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