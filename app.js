const express = require("express");
const path = require("path");
const app = express();
const port = 800;
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
var urlencodedparser = bodyparser.urlencoded({extended: false});

mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true, useUnifiedTopology: true});

//define schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,

  });

const Contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    console.log("Y IS")
   const params = { }
   res.status(200).render('Contact.pug',params) 
})

app.post('/contact',urlencodedparser, (hp,res) =>{
    console.log(hp.body);
    var myData = new Contact(hp.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})