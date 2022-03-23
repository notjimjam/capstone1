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

// let posts = sequelize.define('posts',{
//     user_id: Sequelize.INTEGER,
//     title: Sequelize.TEXT,
//     description: Sequelize.TEXT
// })

// let images = sequelize.define('images', {
//     post_id: Sequelize.INTEGER,
//     data: Sequelize.TEXT
// })

const userId = 1
const postId = 4
const imageId = 4

module.exports = {
    
    getAllPosts: (req, res) => {
        sequelize.query(`
        SELECT p.title, p.description, i.data
        FROM posts AS p
        JOIN images AS i
        ON p.id = i.post_id
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getUser: (req,res) => {
            sequelize.query(`
            SELECT *
            FROM users
            WHERE id = ${userId}
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
    
    // makeNewPost: (req, res) => {
    //     console.log('req', req.body)

    //     return posts.create({
    //         user_id: userId,
    //         title: req.body.title,
    //         description: req.body
    //     }).then(function (posts) {
    //         if(posts) {
    //             res.send(posts[0])
    //         } else {
    //             res.status(400).send('error in creating new post')
    //         }
    //     })

    //     // return images.create({
    //     //     post_id: postId,
    //     //     data: req.body.data
    //     // })

    
    // }
    
        
    }