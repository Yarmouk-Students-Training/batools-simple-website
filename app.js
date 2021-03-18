const express=require('express');
const { redirect } = require('statuses');
const morgan =require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');
const { render } = require('ejs');

//express app
const app = express();
//conect with mangodb
const dbURI ='mongodb://batool-99:batool123456@nodetuts-shard-00-00.u2sir.mongodb.net:27017,nodetuts-shard-00-01.u2sir.mongodb.net:27017,nodetuts-shard-00-02.u2sir.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13tk6f-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
 .then((result )=> console.log('conected') )
 .catch((err )=> console.log(err));
//listen for requests
app.listen(3000);

//middlware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res) =>{
    const blog =new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body : 'more about my new blog'

    });

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    });
})

app.get('/all-blogs',(req,res)=> {
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/single-blogs',(req,res)=> {
    Blog.findById('605281756c67562ce0d694bc')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});


app.post('/blogs',(req,res) =>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result) =>{
        res.redirect('/');
    })
    .catch((err) =>{
        console.log(err);
    });

})
app.get('/blogs/:id',(req,res)=>{
    const id =req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details', { blog: result,title: 'blog details'});
    })
    .catch(err =>{
        console.log(err);
    });
})

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
    