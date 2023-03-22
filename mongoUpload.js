// Step 1 - set up express & mongoose

const mongoose = require('mongoose');
const fs = require('fs');

const  MONGO_URI = "mongodb+srv://esru2:Yonn4321@cluster0.sbh1vyc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resp=>{
        console.log('connected')})

// User Model
const User = mongoose.model(
    'ImgCollection',
    new mongoose.Schema({
        picTitle: {
            type: String,
            required: true
        },
        avatar: {
            type: Buffer, // casted to MongoDB's BSON type: binData
            required: true
        }
    }));


const userData = {
    picTitle: 'krishnav2',
    avatar: fs.readFileSync(`./uploads/Untitled.png`),
}

const user = new User(userData);
user.save()
    .then(() => console.log('User Saved Successfully!'))
    .catch((err) => console.log(`Error in Saving User: ${err}`));
