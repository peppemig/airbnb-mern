const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    checkIn: {type: Date, required:true},
    checkOut: {type: Date, required:true},
    name: {type: String, required:true},
    phone: {type: Number, required:true},
    email: {type: String, required:true},
    price: Number,
    numberOfGuests: Number,
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel;