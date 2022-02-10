const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./configs/database');

const contactsRouter = require('./routes/contacts');

// Mongoose database connection and authentication
db.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.log('Error: ' + err);
        process.exit();
    });

// db.mongoose.connect(db.uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Database connected...');
// }).catch(err => {
//     console.log('Error: ' + err);
//     process.exit();
// });

const port = process.env.PORT || 3000;
const app = express();

// Mddlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

// Default routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to CRUD API"});
});

// App routes
app.use('/contacts', contactsRouter);

// Invalid routes
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : "404 Not found!"
    })
});

// Express HTTP listening
app.listen(port, () => {
    console.log(`CRUD API server is listening on port ${port}`);
});