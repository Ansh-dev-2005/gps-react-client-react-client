const User = require('../models/user')


exports.updateProfile = async (req, res) => {

    try{

        const {
            _id
        } = req.auth

        const {
            update
        } = req.body

        update.salt ? update.salt = undefined : null
        update.encpy_password ? update.encpy_password = undefined : null
        update.emailAddress ? update.emailAddress = undefined : null
        update.mobileNumber ? update.mobileNumber = undefined : null


        const response = await User
                                .updateOne(
                                    {
                                        _id: _id
                                    },
                                    update
                                )

        res.json({
            success: true,
            message: "User Details Updated!",
            dbRes: response
        })
        
    }catch(err) {
        return res.status(400).json({
            error:true,
            message: "An Unexpected Error Occured!"
        })
    }
}

exports.getProfile = async (req, res) => {

    try{

        const {
            _id
        } = req.auth

        const response = await User
                                .findOne({ _id })
                                .select("-salt -encpy_password")

        res.json({
            success: true,
            message: "User Details Found!",
            dbRes: response
        })
        
    }catch(err) {
        return res.status(400).json({
            error:true,
            message: "An Unexpected Error Occured!"
        })
    }
}