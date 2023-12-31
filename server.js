const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./routes/users')
const cityRouter = require('./routes/cities')

const SERVERDEVPORT = 4741
const CLIENTDEVPORT = 5173

mongoose.connect(process.env.DATABASE_URL)

const app = express()

// cross origin resource sharing
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${CLIENTDEVPORT}` }))

const PORT = process.env.PORT || SERVERDEVPORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

app.use('/users', userRouter)
app.use('/cities',cityRouter)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

module.exports = app