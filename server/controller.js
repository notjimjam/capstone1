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

let posts = sequelize.define('posts',{
    user_id: Sequelize.INTEGER,
    title: Sequelize.TEXT,
    description: Sequelize.TEXT,
    image: Sequelize.TEXT
},{
    timestamps: false
})

// let images = sequelize.define('images', {
//     post_id: Sequelize.INTEGER,
//     data: Sequelize.TEXT
// })

const userId = 1
const postId = 1
const imageId = 4

module.exports = {
    
    getAllPosts: (req, res) => {
        sequelize.query(`
        SELECT p.title, p.description, p.id, p.image
        FROM posts AS p
        ORDER BY p.id DESC
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
        console.log('request', req.params.id)
        const pId = req.params.id
        sequelize.query(`
        SELECT *
        FROM posts
        WHERE id = ${pId};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    
    makeNewPost: (req, res) => {
        console.log('i love requests', req.body)
        
        return posts.create({
            user_id: userId,
            title: req.body.title,
            description: req.body.desc,
            image: req.body.image
        }).then(function (posts) {
            res.redirect('/public/index.html')
        })

    }
    
        
    }


    // SELECT p.title, p.description, p.id, i.data
    //     FROM posts AS p
    //     LEFT JOIN images AS i
    //     ON p.id = i.post_id 
    //     ORDER BY p.id DESC
    //     `)