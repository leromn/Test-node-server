const express = require('express');
const cors= require('cors');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose')
 

const  MONGO_URI = "mongodb+srv://esru2:Yonn4321@cluster0.sbh1vyc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resp=>{
        console.log('connected')})
  

// Set EJS as templating engine 
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//online folder
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())

    }
});
 
var upload = multer({ storage: storage });
var imgModel = require('./model');

app.get('/', (req, res) => {
    imgModel.find({})
    .then( (items) => {    
        res.render('imagesPage', { items: items });})

    .catch((err)=>{
        console.log(err);
        res.status(500).send('An error occurred');
    });
});

// Step 8 - the POST handler for processing the uploaded file
 

app.post('/', upload.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.type
        }
    }

    imgModel.create(obj)
    .then((item) => { res.redirect('/');})
    .catch(err=>console.log(err))
    
});    


app.get('/cors', (req, res) => {
res.send({ "msg": "This has CORS enabled 🎈" })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
