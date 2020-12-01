'use strict'
const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.post('/users', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (e) {
        next(e)
    }
})


router.get('/users/:userId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.json(user)
    } catch (e) {
        next(e)
    }
})

router.delete('/users/:userId', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.json(user)
    } catch (e) {
        next(e)
    }
})

module.exports = router