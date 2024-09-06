const { Schema, model, ObjectId } = require('mongoose')



const userSchema = Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        requried: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique:true
    },
    mobileNumber: {
        type: Number,
        required: true,
        
    },
    profilePicture: {
        type: String,
        required: false
    },
    encpy_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enums: ['user', 'admin'],
        required: true,
        default: 'user'
    },
    sessions: [{
        type: ObjectId,
        ref: 'Session'
    }]

}, { timestamps: true })


const User = model('User', userSchema)

module.exports = User