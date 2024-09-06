const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(
        null, 
        path.join(
            __dirname,
            '..',
            'public',
            'uploads'
        )
    )
    },
    filename:  (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+'-'+file.originalname)
    }
})

exports.upload = multer({ storage: storage })