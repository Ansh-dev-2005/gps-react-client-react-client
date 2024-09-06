const { Router } = require('express')
const {
    signIn,
    signUp,
    loggout,
    getAccessToken
} = require('../controllers/auth')
const { checkRefreshToken } = require('../middlewares/auth')

const router = Router()


router.post('/signin', signIn)
router.post('/signup', signUp)

router.post('/logout', checkRefreshToken, loggout)

router.post('/access-token', checkRefreshToken, getAccessToken)
module.exports = router