const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// --- CONFIGURATION ---
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- DATABASE SCHEMA & MODEL ---
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema)

// --- API ROUTES ---
app.post('/api/submit', async (req, res) => {
    console.log(req.body)
});

app.post('/api/send', async (req, res) => {
    console.log(req.body)

    let newUser = User.findOne({ phone: req.body.phone });
    if (!newUser && newUser !== User.findOne({ phone: req.body.phone })) {
        newUser = new User(req.body);
        await newUser.save();
    }
    res.redirect('/api/users');
})

app.get('/api/users', async (req, res) => {
    const result = await User.find({});
    console.log(result)
    res.json(result);
});
app.get('/api/db/load', async (req, res) => {
    const users = require('./data/users.json');
    users.map(async (user) => {
        const newUser = new User(user);
        await newUser.save();
    })
    res.redirect('/');
})
app.get('/api/db/clear', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/');
})

// --- VIEW ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/users', ( req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/users.html'))
})

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});