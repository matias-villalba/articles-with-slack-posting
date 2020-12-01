'use strict'
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { username, password, tokenExpirationInSeconds } = require('../config')

router.post('/login', async (req, res, next) => {
    // user and pass should be stored in database (passord as a hash). 
    // For simplicity, we get a user/pass from config/ env variables
    if (req.body.username === username && req.body.password === password) {
        const token = jwt.sign({ auth: true }, req.app.get('jwt-key'), {
            expiresIn: tokenExpirationInSeconds

        })
        res.json({
            token: token
        })
    } else {
        res.status(403).send({ message: "Invalid credentials" })
    }
})


module.exports = router