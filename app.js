const express=require('express');
const { redirect } = require('statuses');
const morgan =require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');

//express app
const app = express();
//conect with mangodb
const dbURI ='mongodb+srv://batool-99:batool123456@nodetuts.u2sir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
 .then((result )=> console.log('conected') )
 .catch((err )=> console.log(err));
//listen for requests
app.listen(3000);

//middlware & static files
app.use(express.static('public'))
app.use(morgan('dev'));


//register viwe engine
app.set('view engine','ejs');




app.get('/',(req,res)=> {

const blogs = [
    {title: 'batool finds eggs',  sinppet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'monther finds stars ', sinppet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'how to defeat bowser', sinppet: 'lorem ipsum dolor sit amet consectetur'},

];

    res.render('index' ,{title:'home', blogs });

});


app.get('/about',(req,res)=> {

    res.render('about', {title:'about'});
    
});


app.get('/blogs/create',(req,res)=>{

    res.render('creat',{title:'create'});
});

//404 page
app.use((req,res)=> {

    res.status(404).render('404', {title:'404'})

});
    