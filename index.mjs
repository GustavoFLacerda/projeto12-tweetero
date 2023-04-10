import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());


let usuarios = [
  {username: "a", avatar:"https://i.imgur.com/AD3MbBi.jpeg"},
   {username: "b", avatar:"https://i.imgur.com/AD3MbBi.jpeg"}
];
let tweets = [
];

app.post('/sign-up', (req,res) => {
    let correct = false;
    console.log(req.body);
    if("username" in req.body && "avatar" in req.body){
      correct = true;
    }
    const { username, avatar } = req.body;
    if(correct = true){
      let already = false;
      for(const i of usuarios){
        if(i.username === username){
          already = true;
          break;
        }
      }
      if(already === false){
        usuarios.push({ username, avatar });
        res.status(201).send({ message: "OK" });
      }
    }
    else{
      res.sendStatus(400);
    }
    
})

app.post('/tweets', (req, res) => {
  let correct = false;
  let usercorrect = false;
  console.log(req.headers.user)
  for(const i of usuarios){
    if(i.username === req.headers.user){
      usercorrect = true;
    }
  }
    if("tweet" in req.body && usercorrect){
      correct = true;
    }
  if(correct === true){
    const tweet = req.body.tweet;
  const username = req.headers.user;
  tweets.push({ username, tweet });
  res.status(201).send({ message: "OK" });
  }
  else{
    res.status(401).send({message: "UNAUTHORIZED"})
  }
})

app.get('/tweets', (req, res) => {
  let twt = [];
  const page = parseInt(req.query.page);
  for(let i = 10*(page -1) + 1*(page -1); tweets.length < 10 ? i < tweets.length : i < 10*(page) + 1*(page-1); i++){
      let e = tweets.slice().reverse();
      for(const j of usuarios){
        if(j.username === e[i].username){
          let obj = {
            username: e[i].username,
            avatar: j.avatar,
            tweet: e[i].tweet
          }
          twt.push(obj);
        }
      }
  }
  res.send([...twt])
})

app.listen(5000, () => console.log("Server running in port: 5000"));


/* Bonus */

app.get("/tweets/:username", (req, res) => {
  let twt = [];
  let usertweets = [];
  const page = parseInt(req.query.page);
  for(const i of tweets){
    if(i.username === req.params.username){
      usertweets.push(i);
    }
  }
  for(let i = 10*(page -1) + 1*(page -1); usertweets.length < 10 ? i < usertweets.length : i < 10*(page) + 1*(page-1); i++){
      let e = usertweets.slice().reverse();
      for(const j of usuarios){
        if(j.username === e[i].username){
          let obj = {
            username: e[i].username,
            avatar: j.avatar,
            tweet: e[i].tweet
          }
          twt.push(obj);
        }
      }
  }
  res.send([...twt])
})