const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req,res) => {
        sequelize.query(
            `drop table if exists users
            drop table if exists posts
            drop table if exists image
            
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                password TEXT NOT NULL
            );
            
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) NOT NULL,
                title TEXT,
                description TEXT
            );
            
            CREATE TABLE images (
                id SERIAL PRIMARY KEY,
                post_id INT REFERENCES posts(id) NOT NULL,
                image_link TEXT
            );
            
            INSERT INTO users (id, username, email, password)
            VALUES (1, 'jimjam', 'me@me.com', '1234'),
            (2, 'puzzlemaster', 'pm@yahoo.com', 'asdf');

            INSERT INTO posts (id, user_id, title, description)
            VALUES (1, 1, Cityscape by Annonymus, insert description here),
            (2, 1, Big Green Tractor by John Doe, insert description here),
            (3, 2, Brooklyn Bride by Ravensburger, insert description here);

            INSERT INTO images (id, post_id, image_link)
            VALUES (1, 1, 'https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (2, 2, 'https://images.unsplash.com/photo-1574492909706-09f2b2f0d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (3, 3, 'https://images.unsplash.com/photo-1590146758445-40be7019507d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
            
        `).then(() => {
            console.log('DB seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}