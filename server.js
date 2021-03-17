const http=require('http');
const fs = require('fs');
const _ =require('lodash');

const server=http.createServer((req,res)=>{
    //lodash
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();

    //set header contant type
    res.setHeader('contant-type','text/plain');
    
     
    let path ='./views/';
    switch(req.url){
        case '/':
            path+= 'index.html';
            break;
        case '/about':
            path+='about.html';
            res.statusCode =200;
            break;
         case '/about-me':
            res.statusCode=301;
            res.setHeader('location','/about');
            res.end();

            break;
        default:
            path+='404.html';
            break;
    }


    //send an html file
    fs.readFile(path,(err,data)=>{
        if(err){
        console.log(err);
        res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000,'localhost',()=>{
    console.log('lostening for request on port 3000');
});