const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const CookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express()

// SALT FOR PW
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'lahwf89y39p1o3g913472nf285vwoajfa58awhd84971'

// JSON PARSE
app.use(express.json());

app.use(cookieParser())

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
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id}, 
                jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            }) 
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.status(422).json('not found')
    }
})

// PROFILE ENDPOINT - check cookies for token, if token exists first verify then get info
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id) 
            res.json({name,email,_id})  
        })
    } else {
        res.json(null)
    }
})

// APP PORT
app.listen(4000);