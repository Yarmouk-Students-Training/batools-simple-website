const express=require('express');
const { redirect } = require('statuses');
const morgan =require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//conect with mangodb
const dbURI ='mongodb://batool-99:batool123456@nodetuts-shard-00-00.u2sir.mongodb.net:27017,nodetuts-shard-00-01.u2sir.mongodb.net:27017,nodetuts-shard-00-02.u2sir.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13tk6f-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
 .then((result )=>  console.log('conected'))
 .catch((err )=> console.log(err));


//listen for requests
app.listen(3000);

//register viwe engine
app.set('view engine','ejs');


//middlware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// routes
app.get('/',(req,res)=> {
    res.redirect('/blogs')
});

app.get('/about',(req,res)=> {

    res.render('about', {title:'about '});
});

app.get('/page',(req,res)=> {

    res.render('page', {title:'page '});
});
//blog routers
app.use('/blogs', blogRoutes);


//404 page
app.use((req,res)=> {

    res.status(404).render('404', {title:'404'})

});
    