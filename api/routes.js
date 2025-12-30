const app = require('express').Router();
const { User, Message } = require('./db/models');

// --- API ROUTES ---
app.use('/contacts', require('./routes/user'));
app.use('/messages', require('./routes/message'));
app.use('/admin', require('./routes/admin'))



module.exports = app;