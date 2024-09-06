
exports.getRequestData = (req, res, next) => {

    try {
        console.log('\x1b[33m%s\x1b[0m', `IP: ${req.ip} | Headers: ${JSON.stringify(req.headers)} | Body: ${JSON.stringify(req.body)}`)
        next()
    }catch(err) {
        return res.status(400).json({
            error:true,
            message: "An Unexpected Error"
        })
    }
}