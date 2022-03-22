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

app.post('/seed', seed)

const userId = 3
const postId = 4
const imageId = 4

module.exports = {
    getUser: (req, res) => {
        sequelize.query(
            `SELECT *
            FROM users
            WHERE id = ${userId};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getPost: (req, res) => {
        sequelize.query(`
        SELECT *
        FROM posts
        WHERE id = ${postId};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    

}

app.listen(SERVER_PORT, () => {
    console.log(`docked at port ${SERVER_PORT}`)
})