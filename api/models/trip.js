const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tripImage: {type: String, required: true}
});

module.exports = mongoose.model('Trip', tripSchema);