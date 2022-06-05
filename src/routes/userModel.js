
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobail: {
        type: String,
        unique: true,
        require: true,
    },

emailId: String,
    gender:{ type: String, enum: ['male', 'female', 'LGBTQ'] },
age: Number,},{timestamps: true} )
module.exports=mongoose.model('User',userSchema)