const { Router } = require('express')

const {
    checkAccessToken
} = require('../middlewares/auth')

const { 
    getSights, 
    getSightById,
    addSight,
    updateSight
} = require('../controllers/sight')

const router = Router()

router.get('/all', checkAccessToken, getSights)
router.get('/id/:id', checkAccessToken, getSightById)


router.post('/new', checkAccessToken, addSight)
router.put('/update', checkAccessToken, updateSight)

module.exports = router