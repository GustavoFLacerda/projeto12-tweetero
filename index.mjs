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
    const { username, avatar } = req.body;
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
})

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  tweets.push({ username, tweet });
  res.status(201).send({ message: "OK" });
})

app.get('/tweets', (req, res) => {
  let twt = [];
  for(let i = 0; tweets.length < 3 ? i < tweets.length : i < 3; i++){
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