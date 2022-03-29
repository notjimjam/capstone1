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
            VALUES (1, 1, 'Cityscape by B&W', 'I’m not going to lie to you… this puzzle was my worst nightmare, but I know that would probably be the case when I picked it up. My partner and I were looking for a challenge and oh boy, did we find it! We tried our best to separate out the pieces by the details we saw. I would say we got about 50% wrong. The lack of color made it so hard and we were relying heavily on the patterns and details we saw. I can say we did complete it and I am so proud of that! I can also say we will never being doing this again for the sake of our relationship. We dropped it off at the nearest thrift store. If you see it there and decide to pick it up, don’t say we didn’t warn you. Good luck puzzling out there, friends!', 'https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (2, 1, 'Big Green Tractor by John Deer', 'What a fun little puzzle! My 4 year old got a kick out of helping Dad put this together. He said it gets 11 stars out of 5- so there ya have it. It was small enough at 50 pieces for him to feel like he could participate, but challenging enough that I would recommend helping them do it. It made for some good father/son time and I can’t wait to do more with him as he gets older. I picked this up at Goodwill, but you could probably find something similar online if you are interested.', 'https://images.unsplash.com/photo-1574492909706-09f2b2f0d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            (3, 2, 'New York Skyline by Ravensburger', 'My first 2000 piece puzzle! This puzzle was an absolute beauty once it was fully completed. The colors matched the most perfect sunset. A very high quality photograph used for this! Ravensburger puzzles have always been my favorite because I love doing photorealistic puzzles versus cartoons/drawings. I found this puzzle very challenging, but I enjoyed doing it a little bit whenever I had free time. I found it easier for me to tackle the sky portion first because it was mostly just matching colors. It worked for me because the building all looked way too similar for me to make any real headway at the beginning. Good luck if you decide to give this one a try.

            https://www.ravensburger.us/products/jigsaw-puzzles/adult-puzzles/new-york-skyline-16011/index.html
            ', 'https://images.unsplash.com/photo-1590146758445-40be7019507d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHB1enpsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
            
            
            (4, 2, 'Hollywood by Dowdle Folk Art', 'I can’t say enough good about Dowdle puzzles. At this point, I should own stock in this company with how large my collection is. I just really love the art of every single puzzle. It is so easy to spot a Dowdle puzzle because of his unique art style. We had a blast doing this Hollywood themed puzzle. It was 500 pieces and took 3 of us a couple hours to complete. The colors, like in all of his puzzles, are so rich and vibrant. The picture does not do it justice! We were able to approach it by separating the colors into different piles and found that worked really well. I can’t say enough good about the quality of these puzzles either. I recommend them to everyone.
            
            As for where to get one, I picked mine up at Costco. There is a whole website for Dowdle puzzles so check them out there if your Costco doesn’t sell them.
            
            https://dowdlefolkart.com/products/hollywood-500
            ', 'https://gofatherhood.com/wp-content/uploads/2020/03/dowdle-jigsaw-puzzle-hollywood-5.jpg'),

            (5, 1, 'Black and White by Areaware', 'This was such a different puzzle compared to my usual landscape puzzle. It was fun challenging myself with all the different shades of black to white. I look forward to trying another puzzle by this company in the near future. I would recommend to start sorting the puzzle into the obvious different colors.. Black and white. Then proceed to the gray last, working outside in. Good luck to all your crazy puzzlers.

            Here’s the link: https://huckberry.com/store/areaware/category/p/67509-large-gradient-puzzle?avad=184698_c27b8e541&utm_medium=affiliate&utm_source=www.nytimes.com%2Fwirecutter
            ', 'https://cdn.thewirecutter.com/wp-content/uploads/2020/03/puzzle-lowres-2x1-.jpg?auto=webp&quality=75&crop=2:1&width=1024'),

            (6, 1, 'Happy Isles by Magic Puzzle Company', 'OMG! You guys need to check out this puzzle. It’s 100 pieces of complete mayhem. HANDS DOWN THE COOLEST PUZZLE I’VE EVER DONE! Ok ok… I’m done yelling now. But seriously, this is a brilliant idea and something totally unique for you puzzlers out there who are looking for something different to change things up. I can’t say too much without spoiling the magic of this puzzle. It has some of the most unique pieces I’ve ever seen in a puzzle to date. The overall puzzle isn’t what it seems and you never stop getting whiplash from the constant change of directions. There are also many easter eggs to look for as you go and once you are done. I cannot wait to complete the entire MPC collection of puzzles. As far as strategies go– without giving too much away, my biggest tip is “if you think it’s an edge, it’s probably an edge”. 

            GOOD LUCK FRIENDS… you’ll need it.
            
            Here’s the link for those looking for the most fun experience: https://www.target.com/p/the-happy-isles-jigsaw-puzzle-from-the-magic-puzzle-company-1000pc/-/A-79567224
            
            I just picked up the puzzle at Target. I found it in the game section, not with the puzzles. Hope you love it as much as I did.
            ', 'https://preview.redd.it/zu29ysz32ds51.jpg?width=640&crop=smart&auto=webp&s=ed3c25273d0692f949888c568c1e6dfc4c520c37'),

            (7, 2, 'Geode by Nervous System', 'These are some of the coolest puzzle pieces I have ever seen in my life! What a challenging puzzle this was with such a unique overall shape. There wasn’t much variation in color so it made it that much harder. This is one of those puzzles I don’t think I’ll ever get bored of building. Will I rip my hair out every time? Oh most definitely, but it doesn’t make the final product any less worth the hair loss. I would recommend that everyone pick up this puzzle. Let me know what you think if you decide to pick this up. Yes, the price tag is well worth it.

            Here’s a link you silly puzzlers: https://www.uncommongoods.com/product/geode-puzzle?_br_psugg_q=geode
            ', 'https://mymodernmet.com/wp/wp-content/uploads/2019/03/geode-puzzle.jpg'),

            (8, 1, 'The One Million Dollar Puzzle by MSCHF', 'I’m just going to start off by saying that I am not millionaire and I am pretty sad about that. This puzzle was difficult because of the QR code running throughout, but the bright colors made it easier to match like pieces. I separated it by color and it made it pretty straight forward from there. The pieces that happened to be all black were matched based on shape and pure guessing sometimes. It was a fun challenge simply because of the idea that MAYBE just MAYBE you could be a millionaire at the end of it. Yes it is very gimmicky, but I had a good time putting together this 500 piece puzzle.

            They are still selling this on amazon if you are interested: https://www.amazon.com/ONE-MILLION-DOLLAR-PUZZLE-MSCHF/dp/B099MY2173
            ', 'https://helios-i.mashable.com/imagery/articles/07APPUy4KcBeJ29ag43EX75/hero-image.fill.size_1248x702.v1637340567.jpg'),

            (9, 2, 'Minifigures Face by Lego', 'LEGO LOVERS and PUZZLERS UNITE! 

            Honestly, this is the best of both worlds. This 1000 piece, yellow monstrosity was a CHALLENGE! Let me tell you. If anyone has a good idea for better ways to approach this, reach out. I went into this like I would any other puzzle and it was TOUGH! It took several days to complete because every piece looked the same as the next. I really could have used a 30 page pamphlet with detailed step by step instructions like you get building a lego set to get through this quicker. Despite the negativity, I had a BLAST doing this and look forward to picking up more of these lego puzzles in the future.
            
            Join the mayhem: https://www.amazon.com/Minifigure-Faces-Piece-Jigsaw-Puzzle/dp/179721019X/ref=sr_1_2?keywords=LEGO+Puzzle&qid=1648491754&sr=8-2
            ', 'https://cdn.shopify.com/s/files/1/0261/7291/5805/products/9781797210193_LEGOMinifigureFacesPuzzle_TopViewPuzzle.jpg?v=1618349341'),
            (10, 1, 'Mars by NASA', 'My 7 year old loved putting this puzzle together with me! Her space obsession is bleeding into every aspect of our lives, even puzzling isn’t safe. With that being said, this puzzle was a blast to complete with her. The overall shape was unique- adding a fun challenge. There wasn’t much in variety of the color, which made it that more challenging. While it was a relatively small puzzle for an adult, it was great to put together with a kid. We will definitely be doing another one of these soon, as my daughter insists on completing the whole solar system. 

            Got a link for you if you’re interested: https://www.chroniclebooks.com/products/mars-100-piece-puzzle
            
            P.S. the box for this thing is incredible!
            
            May the force be with you or whatever the kids are saying now days.
            ', 'https://cdn.shopify.com/s/files/1/0261/7291/5805/products/9781452181127.pt02_2048x2048.jpg?v=1618351405'),
            (11, 2, 'Gradient by Cloudberries', 'This puzzle was surprisingly a good time. I purchased this 1000 piece puzzle from Barnes and Noble hoping it would provide a different type of challenge. It did not disappoint! My partner and I were able to complete this in a single night, dividing the pieces into colors. It made it easier to complete building from the outside in due to the vibrancy of the pieces on the outside. By the time we made it to the middle, the pieces were really light. We had a great time doing it and thought it was much easier to complete than we originally thought. 

            Here is the link to buy from the source if you are interested: https://www.cloudberries.co.uk/product/amazing-gradient-jigsaw-puzzle-for-adults-1000-pieces/
            
            Good luck puzzling!!
            
            ', 'https://i.ytimg.com/vi/ECxkImGlrFg/maxresdefault.jpg'),

            (12, 1, 'Infinite Galaxy 2 by Nervous System', 'Let’s just start by saying WOW! Just wow. This is the most beautiful puzzle I have ever seen. The pieces are stunning and the quality is excellent. I’m not going to lie to you. This puzzle is very pricey, but I personally think it is worth it. This puzzle is called infinite for a reason. If you are going into this puzzle thinking you’ll solve this, you better think again. There are so many ways to approach this and that, I think, is the fun of it. It is easily the most unique experience I have had when puzzling. I hope one day to invest in another one of their creations. This is something I can see leaving on a table for people to experience.

            If you want to go through this experience with me, here is the link to buy it from my modern met: https://store.mymodernmet.com/products/infinite-galaxy-puzzle-2
            ', 'https://cdn.shopify.com/s/files/1/2433/0703/products/infinity-puzzle-2-nervous-system-3_1000x1000.jpg?v=1557721348');

            
            
            ALTER SEQUENCE posts_id_seq RESTART WITH 13;
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