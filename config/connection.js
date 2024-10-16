const mongoose = require('mongoose');

function DBconnection() {
    const DB = mongoose.connect(process.env.DB_URL);
    if (DB) console.log('Connection Success')
}

module.exports = {DBconnection}