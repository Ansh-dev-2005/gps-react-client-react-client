const Sight = require('../models/sight')


exports.getSights = async (req, res) => {
    try {

        const {
            page,
            limit
        } = req.query

        const response = await Sight
                                .paginate(
                                    {
                                        
                                    },
                                    {
                                        page: page || 1,
                                        limit: limit || 10
                                    }
                                )

        res.json({
            success: true,
            message: 'Sights Available',
            dbRes: response
        })
    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occurred!'
        })
    }
}

exports.getSightById = async (req, res) => {
    try {

        const {
            id
        } = req.params

        const response = await Sight
                                .findOne({ _id: id })
                                .populate({
                                    path: 'userId',
                                    select: 'firstName lastName '
                                })
        if(!response)
            return res.status(404).json({
                    error: true,
                    message: `Sight With ID: ${id} Not Found`
                })
                
        res.json({
            success: true,
            message: `Sight With ID:${id} Found`,
            dbRes: response
        })
    }catch(err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occurred!'
        })
    }
}

exports.addSight = async (req, res) => {
    try {
        const {
            gpsCoordinates,
            imageUrl,
            remarks
        } = req.body
        const sight = new Sight({
            gpsCoordinates: gpsCoordinates,
            imageUrl: imageUrl,
            userId: req.accessToken._id,
            remarks: remarks
        })

        const response = await sight.save()

        res.status(201).json({
            success: true,
            message: 'Sight Created Successfully!',
            dbRes: response
        })

    }catch(err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occurred!'
        })
    }
}

exports.updateSight = async (req, res) => {
    try {

    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occurred!'
        })
    }
}
