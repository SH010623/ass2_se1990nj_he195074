require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const bookRoute = require('./routes/bookRouter');
const memberRoute = require('./routes/memberRouter');
const loanRoute = require('./routes/loanRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/books', bookRoute);
app.use('/api/members', memberRoute);
app.use('/api/loans', loanRoute);

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});