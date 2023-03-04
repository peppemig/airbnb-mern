const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
require('dotenv').config()

const app = express()

// SALT FOR PW
const bcryptSalt = bcrypt.genSaltSync(10);

// JSON PARSE
app.use(express.json());

// CORS CONFIG
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// MDB CONNECTION
mongoose.connect(process.env.MONGO_URL)

// REGISTER ENDPOINT
app.post('/register', async (req, res) => {
    const {name,email,password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e)
    }
});

// LOGIN ENDPOINT
app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email:email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            res.json('pass ok')  
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.status(422).json('not found')
    }
})

// APP PORT
app.listen(4000);