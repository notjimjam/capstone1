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
                description TEXT,
                image TEXT
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
            
            INSERT INTO posts (id, user_id, title, description, image)
            VALUES (1, 1, 'Cityscape by B&W', 'insert description here', 'https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (2, 1, 'Big Green Tractor by John Deer', 'insert description here', 'https://images.unsplash.com/photo-1574492909706-09f2b2f0d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (3, 2, 'Brooklyn Bridge by Ravensburger', 'insert description here', 'https://images.unsplash.com/photo-1590146758445-40be7019507d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (4, 2, 'Hollywood by Dowdle Folk Art', 'insert description here', 'https://gofatherhood.com/wp-content/uploads/2020/03/dowdle-jigsaw-puzzle-hollywood-5.jpg'),
            (5, 1, 'Happy Isles by Magic Puzzle Company', 'insert description here', 'https://preview.redd.it/zu29ysz32ds51.jpg?width=640&crop=smart&auto=webp&s=ed3c25273d0692f949888c568c1e6dfc4c520c37'),
            (6, 2, 'Minifigures Face by Lego', 'insert description here', 'https://cdn.shopify.com/s/files/1/0261/7291/5805/products/9781797210193_LEGOMinifigureFacesPuzzle_TopViewPuzzle.jpg?v=1618349341'),
            (7, 1, 'Mars by NASA', '100 piece awesome puzzle', 'https://cdn.shopify.com/s/files/1/0261/7291/5805/products/9781452181127.pt02_2048x2048.jpg?v=1618351405'),
            (8, 2, 'Gradient by Cloudberries', 'insert a really good description here', 'https://i.ytimg.com/vi/ECxkImGlrFg/maxresdefault.jpg');
            
            
            ALTER SEQUENCE posts_id_seq RESTART WITH 4;
            ALTER SEQUENCE users_id_seq RESTART WITH 3;

            `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))
        }
    }
    // CREATE TABLE images (
        //     id SERIAL PRIMARY KEY,
        //     post_id INT REFERENCES posts(id) NOT NULL,
        //     data TEXT
        // );

        // INSERT INTO images (id, post_id, data)
        // VALUES (1, 1, 'https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
        // (2, 2, 'https://images.unsplash.com/photo-1574492909706-09f2b2f0d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
        // (3, 3, 'https://images.unsplash.com/photo-1590146758445-40be7019507d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');

        // ALTER SEQUENCE images_id_seq RESTART WITH 4;