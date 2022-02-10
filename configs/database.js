const dotEnv = require('dotenv');
const Mongoose = require('mongoose');

dotEnv.config({ encoding: 'utf-8' });

Mongoose.Promise = global.Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/phone_book';

// Mongoose authenticate polyfill wrapper
Mongoose.authenticate = function() {
    return new Promise((res, rej) => {
        Mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            res();
        }).catch(err => {
            rej(err);
        });
    });
};

module.exports = Mongoose;

// const db = {};
// db.mongoose = Mongoose;
// db.uri = dbUri;

// module.exports = db;