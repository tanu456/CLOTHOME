const express = require("express");
const path = require("path");
const app = express();
const port = 800;
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
app.get('/Contact',(req,res)=>{
   const params = { }
   res.status(200).render('Contact.pug',params) 
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});