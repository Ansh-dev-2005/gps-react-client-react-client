require('dotenv').config()
require('log-timestamp')
const cors = require('cors'); // Make sure this is correctly imported
const express = require('express')
const mongoose = require('mongoose')
const { getRequestData } = require('./middlewares/logger')

// use cors



const authRoutes = require('./routes/auth')
const sightRoutes = require('./routes/sight')
const userRoutes = require('./routes/user')
const uploadRoutes = require('./routes/upload')




const PORT = process.env.PORT || 8000
const DATABASE = process.env.DATABASE || ""


const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json())
app.use(getRequestData)


app.use('/auth', authRoutes)
app.use('/sight', sightRoutes)
app.use('/user', userRoutes)
app.use('/upload', uploadRoutes)




mongoose.connect(DATABASE, {

}).then(() => {
    console.log('\x1b[36m%s\x1b[0m', 'Database Connected')
    app.listen(PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `Server Running At PORT: ${PORT}`)
    })
})
.catch((err) => {
    console.log('\x1b[31m', `An Error Occured!`)
    console.log(err)
})