const express = require('express');
const app = express();
const log = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const tripsRoutes = require('./api/routes/trips');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://dbTrips:'+ process.env.MONGO_ATLAS_PW + '@node-rest-trips-kpvvn.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;


app.use(log('dev'));
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

// Routes que vão lidar com requisições
app.use('/trips', tripsRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);




app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

