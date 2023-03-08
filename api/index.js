const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const imageDownloader = require('image-downloader');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place')
const Booking = require('./models/Booking')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs')
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

// GET IMAGES FROM UPLOADS FOLDER
app.use('/uploads', express.static(__dirname+'/uploads'))

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

// LOGOUT ENDPOINT
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
})

// UPLOAD IMAGE BY LINK ENDPOINT
app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image ({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json({filename: newName})
})

// UPLOAD BY FILE
const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
    const uploadedFiles = []
    //console.log(req.files)
    for (let i=0; i<req.files.length; i++) {
        //console.log(files)
        const {path,originalname} = req.files[i];
        console.log(originalname)
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads",'').replace('\\',''))
    }
    res.json(uploadedFiles); 
})

// POST REQUEST TO /PLACES TO ADD A PLACE
app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc)
    })
})

// GET PLACES FROM SPECIFIC USER (FOR MY ACCOMODATIONS PAGE '/account/places')
app.get('/user-places', (req,res) => {
    // after getting session's token i'll get user id and then get places where owner = id
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner:id}))
    })
})

// GET PLACE BY ID
app.get('/places/:id', async (req,res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

// UPDATE PLACE (BASED ON ID IN REQUEST)
app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    // I'LL ALSO GRAB ID FROM REQ BODY
    const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save()
            res.json('saved')
        }
    })
})

// GET ALL PLACES
app.get('/places', async (req,res) => {
    res.json( await Place.find())
})


// BOOK PLACE
app.post('/bookings', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        const {place,checkIn,checkOut,numberOfGuests,name,phone,email,price} = req.body
        Booking.create({
            user:id,place,checkIn,checkOut,numberOfGuests,name,phone,email,price
        }).then((doc) => {
            res.json(doc)
        }).catch((err) => {
            throw err;
        })
    })
})

// GET ALL BOOKINGS (FOR SPECIFIC ID)
app.get('/bookings', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return 'not logged in'
        const {id} = userData
        res.json(await Booking.find({user:id}).populate('place'))
    })
})

// APP PORT
app.listen(4000);