'use strict'
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: String,
  tags: { type: [String], index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] }
}, { versionKey: false, toJSON: { virtuals: true }, id: false })


articleSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})



const Article = mongoose.model('Article', articleSchema)


module.exports = Article
