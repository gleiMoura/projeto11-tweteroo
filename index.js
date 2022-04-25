import express from 'express';
import cors from 'cors';

const app = express();
const users = [];
const tweets = [];
const port = 5000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is working in port ${port}`)
})

app.post('/sign-up', (req, res) => {
    let user = req.body;
    if (Object.keys(user).length === 2 && Object.keys(user)[0] === "username" && Object.keys(user)[1] === "avatar") {
        if (user.username === '' || user.avatar === '') {
            res.status(400).send('Todos os campos são obrigatórios!');
        } else {
            if (users.length === 0) {
                users.push(user);
            } else {
                users.forEach(element => {
                    if (user.username !== element.username) { //não coloca um usuário mais de uma vez;
                        users.push(user);
                    }
                })
            }
            res.status(201).send(user)
        }
    } else {
        res.sendStatus(400);
    }
})

app.get('/sign-up', (req, res) => {
    res.send(users);
})

app.post('/tweets', (req, res) => {
    let avatar = null;
    if (users.length !== 0) {
        users.forEach(element => {
            if (req.body.username === element.username) {
                avatar = element.avatar;
            }
        })
    }
    let tweet = {
        username: req.body.username,
        avatar: avatar,
        tweet: req.body.tweet
    };
    if (tweet.username === '' || tweet.tweet === '') {
        res.status(400).send('Todos os campos são obrigatórios!')
    } else {
        tweets.push(tweet);
        res.status(201).send(tweet);
    }
});

//app.get('/tweets', (req, res) => {
//    const tenTweets = [];
//    if (tweets.length > 10) {
//       for (let i = tweets.length - 1; i > tweets.length - 11; i--) {
//           tenTweets.push(tweets[i]);
//        }
//        res.send(tenTweets)
//    } else {
//       res.send(tweets);
//    }
//});

app.get('/tweets/:user', (req, res) => {
    const person = req.params.user;
    if (tweets.length !== 0) {
        const personTweets = tweets.filter(element => {
            if (element.username === person) {
                return element;
            }
        })
        res.status(201).send(personTweets);
    } else {

    }
});

app.get('/tweets', (req, res) => {
    const tenTweets = [];
    if (tweets.length > req.query.page * 10) {
       for (let i = tweets.length - 1; i > tweets.length - (req.query.page*10 + 1); i--) {
           tenTweets.push(tweets[i]);
        }
        res.send(tenTweets)
    } else {
       res.send(tweets);
    }
});
