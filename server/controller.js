require('dotenv').config()

const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const userId = 3
const postId = 4
const imageId = 4

module.exports = {
    // getPost: (req, res) => {
    //     sequelize.query(`
    //     SELECT *
    //     FROM posts
    //     WHERE id = ${postId};
    //     `)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log(err))
    // },

    getAllPosts: (req, res) => {
        sequelize.query(`
        SELECT p.title, p.description, i.data
        FROM posts AS p
        JOIN images AS i
        ON p.id = i.post_id
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
    

}