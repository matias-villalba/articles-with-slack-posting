'use strict'
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

    const token = req.headers['access-token'];
    if (!token) {
        res.status(403).send({ message: 'Error: access-token is required' })
        return
    }
    jwt.verify(token, req.app.get('jwt-key'), (err, decoded) => {
        if (err) {
            res.status(403).send({ message: 'Error: invalid token' })
            return
        }
        next();
    });
}