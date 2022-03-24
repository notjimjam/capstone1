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
            `DROP TABLE if exists images;
            DROP TABLE if exists comments;
            DROP TABLE if exists users CASCADE;
            DROP TABLE if exists posts CASCADE;
            
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT NOT NULL,
                password_hash TEXT NOT NULL
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
                data TEXT
            );

            CREATE TABLE comments (
                id SERIAL PRIMARY KEY,
                post_id INT REFERENCES posts(id) NOT NULL,
                user_id INT REFERENCES users(id) NOT NULL,
                body TEXT
    
            );

            INSERT INTO users (id, username, email, password_hash)
            VALUES (1, 'puzzguru', 'me@me.com', '1234'),
            (2, 'puzzlemaster', 'pm@yahoo.com', 'asdf');
            
            INSERT INTO posts (id, user_id, title, description)
            VALUES (1, 1, 'Cityscape by Annonymus', 'insert description here'),
            (2, 1, 'Big Green Tractor by John Doe', 'insert description here'),
            (3, 2, 'Brooklyn Bride by Ravensburger', 'insert description here');
            
            ALTER SEQUENCE posts_id_seq RESTART WITH 4;
            ALTER SEQUENCE users_id_seq RESTART WITH 3;
            ALTER SEQUENCE images_id_seq RESTART WITH 4;

            INSERT INTO images (id, post_id, data)
            VALUES (1, 1, 'https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (2, 2, 'https://images.unsplash.com/photo-1574492909706-09f2b2f0d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (3, 3, 'https://images.unsplash.com/photo-1590146758445-40be7019507d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
            
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}