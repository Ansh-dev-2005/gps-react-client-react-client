const { Schema, model, ObjectId } = require('mongoose')



const sessionSchema = Schema({

    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    clientInfo: {
        type: String,
        required: true
    },
    expiry: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enums: ['active', 'revoked'],
        default: 'active'
    }

}, { timestamps: true })


const Session = model('Session', sessionSchema)

module.exports = Session