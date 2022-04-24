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
    if (users.length === 0) {
        users.push(user);
    } else {
        users.forEach(element => {
            if (user.username !== element.username) {
                users.push(user);
            }
        })
    }
    res.send("OK");
})

app.get('/sign-up', (req, res) => {
    res.send(users)
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
    tweets.push(tweet);
    res.send("OK");
});

app.get('/tweets', (req, res) => {
    const tenTweets = [];
    if (tweets.length > 10) {
        for (let i = tweets.length - 1; i > tweets.length - 11; i--) {
            tenTweets.push(tweets[i]);
        }
        res.send(tenTweets)
    } else {
        res.send(tweets);
    }
})

