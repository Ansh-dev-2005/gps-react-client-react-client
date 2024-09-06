const { Router } = require('express')

const {
    checkAccessToken
} = require('../middlewares/auth')

const { 
    updateProfile, 
    getProfile
} = require('../controllers/user')

const router = Router()

router.put('/update', checkAccessToken, updateProfile)
router.get('/profile', checkAccessToken, getProfile)

module.exports = router