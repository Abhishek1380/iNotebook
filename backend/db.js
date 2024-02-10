const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017";

const connectToMongo = () => {
    mongoose.connect(mongoURL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message)
        });
}

module.exports = connectToMongo;
