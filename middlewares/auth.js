const { expressjwt:expressJwt } = require('express-jwt')
const fs = require('fs')
const path = require('path')


const PUBLIC_KEY_REFRESH_TOKEN = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        'keys',
        'refreshToken',
        'public.pem'
    )
)

const PUBLIC_KEY_ACCESS_TOKEN = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        'keys',
        'accessToken',
        'public.pem'
    )
)

exports.checkRefreshToken = expressJwt({
    property: "refreshToken",
    algorithms: ['RS256'],
    secret: PUBLIC_KEY_REFRESH_TOKEN
})

exports.checkAccessToken = expressJwt({
    property: "accessToken",
    algorithms: ['RS256'],
    secret: PUBLIC_KEY_ACCESS_TOKEN
})