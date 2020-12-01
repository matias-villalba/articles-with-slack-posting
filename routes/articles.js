'use strict'
const express = require('express')
const Article = require('../model/Article')
const SlackMessage = require('../slack/SlackMessage')
const router = express.Router()
const { WebClient } = require('@slack/web-api');
const { slackChannel, slackToken } = require('../config')

const slackClient = new WebClient(slackToken);


router.post('/articles', async (req, res, next) => {
    try {
        const articleCreated = await Article.create(req.body)
        const article = (await articleCreated.populate('user')
            .execPopulate()).toJSON()
        const slackMessage = new SlackMessage(slackClient, article.user.name, article.title, slackChannel)
        await slackMessage.post()

        delete article.userId
        res.json(article)
    } catch (e) {
        next(e)
    }
})

router.put('/articles/:articleId', async (req, res, next) => {
    try {
        await Article.findByIdAndUpdate(req.params.articleId, req.body)
        res.json(req.body)
    } catch (e) {
        next(e)
    }
})


router.get('/articles/:articleId', async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId)
        if (!article) {
            return res.status(404).send('Article not found')
        }
        res.json(article)
    } catch (e) {
        next(e)
    }
})

router.delete('/articles/:articleId', async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.articleId)
        if (!article) {
            return res.status(404).send('Article not found')
        }
        res.json(article)
    } catch (e) {
        next(e)
    }
})


router.get('/articles', async (req, res, next) => {
    try {
        const query = req.query.tag ? { tags: { $in: [].concat(req.query.tag) } } : {}
        const articles = await Article.find(query)
            .populate({ path: 'user' })
            .exec()

        res.json(articles.map(a => ({ ...a.toJSON(), userId: undefined })))
    } catch (e) {
        next(e)
    }
})

module.exports = router