const express = require('express');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === "/sign-up"){
        let obj = {username: req.username, avatar: req.avatar};
        fs.writeFile('./users.txt', obj, (err) => {
            if(err){
                throw err;
                res.end("Error");
            }
            else{
                console.log("OK");
            }
        })
        res.end("OK");
    }
    else if(req.url === "/tweets" && req.method ==="POST"){

    }
})