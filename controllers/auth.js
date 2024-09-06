const User = require('../models/user')
const Session = require('../models/session')

const { 
    hashPassword 
} = require('../utils/hasher')

const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const { 
    ObjectId 
} = require('mongoose')

const PRIVATE_KEY_REFRESH_TOKEN = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        'keys',
        'refreshToken',
        'private.pem'
    )
)

const PRIVATE_KEY_ACCESS_TOKEN = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        'keys',
        'accessToken',
        'private.pem'
    )
)

exports.signUp = async (req, res) => {

    try{

        const {
            firstName,
            lastName,
            username,
            emailAddress,
            mobileNumber,
            password
        } = req.body

        const salt = crypto.randomUUID()

        const encpy_password = await hashPassword(password, salt)

        const user = new User({
            firstName: firstName,
            lastName: lastName ? lastName : '',
            username: username ? username : emailAddress,
            emailAddress: emailAddress,
            mobileNumber: mobileNumber,
            salt: salt,
            encpy_password: encpy_password,
            role: 'user'
        })

        const response = await user.save()

        const refreshToken = jwt.sign(
            {
                _id: response._id, //User ID
                user: {
                    _id: response._id,
                    email: response.emailAddress, 
                    firstName: response.firstName, 
                    lastName: response.lastName ? response.lastName : '',
                    role: response.role,
                    mobileNumber: response.mobileNumber,
                    username: response.username
                }
            },
            PRIVATE_KEY_REFRESH_TOKEN, //Private Key
            {
                algorithm: 'RS256', //Algorithm
                allowInsecureKeySizes: true, //Must Be False In Production
                expiresIn: '30d' //Expiry 
            }
        )

        response.salt = undefined
        response.encpy_password = undefined

        let time = new Date() //get current time
        time.setTime(time.getTime() + 30 * 24 * 3600 * 1000) //change the time to unix

        const session = new Session({
            refreshToken: refreshToken,
            userId: response._id,
            clientInfo: JSON.stringify(req.headers),
            expiry: time
        })

        await session.save()

        res.status(201).json({
            success: true,
            message: 'User Created Successfully!',
            refreshToken: refreshToken,
            dbRes: response
        })
        


    }catch(err) {
        console.log('\x1b[31m', err)
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
        })
    }

}

exports.signIn = async (req, res) => {

    try{

        const {
            emailAddress,
            password
        } = req.body

    
        const response = await User.findOne({ emailAddress })

        if(!response) 
            return res.status(401).json({
                error: true,
                message: 'User / Password Incorrect!'
            })

        const encpy_password = await hashPassword(password, response.salt)

        if(encpy_password !== response.encpy_password)
                return res.status(401).json({
                    error: true,
                    message: 'User / Password Incorrect!'
                })
                
        const refreshToken = jwt.sign(
            {
                _id: response._id, //User ID
                user: {
                    _id: response._id,
                    email: response.emailAddress, 
                    firstName: response.firstName, 
                    lastName: response.lastName ? response.lastName : '',
                    role: response.role,
                    mobileNumber: response.mobileNumber,
                    username: response.username
                }
            },
            PRIVATE_KEY_REFRESH_TOKEN, //Private Key
            {
                algorithm: 'RS256', //Algorithm
                allowInsecureKeySizes: true, //Must Be False In Production
                expiresIn: '30d' //Expiry 
            }
        )
        response.salt = undefined
        response.encpy_password = undefined

        let time = new Date() //get current time
        time.setTime(time.getTime() + 30 * 24 * 3600 * 1000) //change the time to unix

        const session = new Session({
            refreshToken: refreshToken,
            userId: response._id,
            clientInfo: JSON.stringify(req.headers),
            expiry: time
        })

        const responseTwo = await session.save()

        const update = await User
                                .updateOne(
                                    {
                                        emailAddress
                                    },
                                    {
                                       $push: {
                                            sessions: responseTwo._id
                                       }
                                    }
                                )

        // //generate cookie with name auth and value as jwtToken
        // res.cookie("refreshToken", token, {
        //     expire: time, //expire time
        //     path: "/", //path of the cookie
        //     domain: process.env.DOMAIN, //domain of the site
        // })

        res.status(200).json({
            success: true,
            message: 'Logged In!',
            dbRes: response,
            refreshToken: refreshToken
        })
        


    }catch(err) {
        console.log('\x1b[31m', err)

        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
        })
    }
   
}

exports.loggout = async (req, res) => {
    try {
        
        const update = await Session
                            .updateOne(
                                {
                                    refreshToken: req.headers.authorization.split(' ')[1]
                                },
                                {
                                    status: 'revoked',
                                    expiry: 21276597000
                                }
                            )

        res.status(200).json({
            logout: true,
            redirect: true,
            dbRes: update
        })

    }catch(err) {
        console.log('\x1b[31m', err)

        //If Error Give Error Response 
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!'
        })
    }
   
}

exports.getAccessToken = async (req, res) => {

    try{

        const {
            refreshToken
        } = req.body

        let currentTime = new Date() //get current time
        currentTime.setTime(currentTime.getTime()) //change the time to unix

        const response = await Session
                                .findOne({ 
                                    refreshToken: refreshToken,
                                    status: 'active',
                                    expiry: {
                                        $gte: currentTime
                                    }
                                 })
                                .populate({ 
                                    path: 'userId',
                                    model: 'User',
                                    select: '-salt -encpy_password'
                                })
        if(!response) 
            return res.status(401).json({
                error: true,
                message: 'Not A Valid Refresh Token'
            })
                
        const accessToken = jwt.sign(
            {
                _id: response._id, //User ID
                user: {
                    _id: response.userId._id,
                    email: response.userId.emailAddress, 
                    firstName: response.userId.firstName, 
                    lastName: response.userId.lastName ? response.lastName : '',
                    role: response.userId.role,
                    mobileNumber: response.userId.mobileNumber,
                    username: response.userId.username
                }
            },
            PRIVATE_KEY_ACCESS_TOKEN, //Private Key
            {
                algorithm: 'RS256', //Algorithm
                allowInsecureKeySizes: true, //Must Be False In Production
                expiresIn: '30min' //Expiry 
            }
        )

        let time = new Date() //get current time
        time.setTime(time.getTime() + 1800 * 1000) //change the time to unix

        //generate cookie with name auth and value as jwtToken
        res.cookie("accessToken", accessToken, {
            expire: time, //expire time
            path: "/", //path of the cookie
            domain: process.env.DOMAIN, //domain of the site
        })

        res.status(200).json({
            success: true,
            message: 'Access Token Generated!',
            accessToken: accessToken
        })
        


    }catch(err) {
        console.log('\x1b[31m', err)

        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
        })
    }
}