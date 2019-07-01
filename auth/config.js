require('dotenv').config();

// Protection //
module.exports = {
    secret: process.env.JWT_SECRET
};