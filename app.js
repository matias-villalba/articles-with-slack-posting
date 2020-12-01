'use strict'

const fs = require('fs')
const express = require('express')
const app = express()
const { port, mongodbUrl, authTokenKeyPath } = require('./config')
app.set('jwt-key', fs.readFileSync(authTokenKeyPath).toString())

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const usersRoute = require('./routes/users')
const articlesRoute = require('./routes/articles')
const authenticationRoute = require('./routes/authentication')

const authenticationMiddleware = require('./middlewares/authentication')

mongoose.connect(mongodbUrl, { useNewUrlParser: true }).
    catch(e => {
        console.log(e)
        process.exit(1)
    });

app.use(bodyParser.json())

app.use(authenticationRoute)

app.use(authenticationMiddleware)

app.use(usersRoute)
app.use(articlesRoute)

app.use((err, req, res, next) => {
    console.error(err.stack)
    return err.code ? res.status(err.code).send(err.message)
        : res.status(500).send('Internal error')
})
app.listen(port, () => {
    console.log(`app listening at port ${port}`)
})