require('dotenv').config(); // Load passwords / ports from .env
module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: 'ilsayedb'
};