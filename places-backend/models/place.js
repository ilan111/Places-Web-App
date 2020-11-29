const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true},
    address: { type: String, required: true},
    location: {type: Object, required: true},
    creator: { type: String, required: true}
});

module.exports = mongoose.model('Place', placeSchema);