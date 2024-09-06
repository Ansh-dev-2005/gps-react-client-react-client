const { Router } = require('express')
const { upload } = require('../utils/upload')
const { fileUpload } = require('../controllers/upload')
const { checkAccessToken } = require('../middlewares/auth')

const router = Router()


router.post('/image', checkAccessToken, upload.single('image'), fileUpload)

module.exports = router