const express = require("express");
const path = require("path");

const mongoose = require('mongoose');
const bodyparser= require('body-parser')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const app = express();
const port = 8000;

//DEFINE MONGOOSE SCHEMA
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String
  });

  const Contact = mongoose.model('Contact', ContactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get("/contact", (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post("/contact", (req, res)=>{ 
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("saved successfully")
    }).catch(()=>{
        res.status(400).send("not sent")
    });
    //res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
