const { Schema, model, ObjectId } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const sightSchema = Schema({
    
    gpsCoordinates: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    remarks: {
        type: String
    }

}, { timestamps: true })

sightSchema.plugin(mongoosePaginate)

const Sight = model('Sight', sightSchema)

module.exports = Sight