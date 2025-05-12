const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    imgTitle: {},
    title: {},
    content: { type: String},
    imgsId: {},
    slugify:{}
}, {
    timestamps: true
})

const Post = new mongoose.model("Post", postSchema)
module.exports = Post