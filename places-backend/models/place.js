const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, reqired: true},
    description: { type: String, reqired: true},
    image: { type: String, reqired: true},
    address: { type: String, reqired: true},
    location: {type: Object, reqired: true},
    creator: { type: String, reqired: true}
});

module.exports = mongoose.model('Place', placeSchema);