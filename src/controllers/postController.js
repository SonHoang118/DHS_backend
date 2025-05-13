const Post = require("../models/postModel")

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find({}, 'title imgTitle slugify createdAt imgsId').sort({ createdAt: -1 })
            if (posts) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "get all posts success",
                    posts: posts
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    createPost: async (req, res) => {
        try {
            const { imgTitle, title, content, imgsId, slugify } = req.body
            console.log(slugify);
            if (!imgTitle || !title || !content) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields'
                })
            }
            const newPost = await Post.create({
                imgTitle,
                title,
                content,
                imgsId,
                slugify
            })
            if (newPost) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create post success",
                    user: newPost
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            const deletePost = await Post.findByIdAndDelete(req.params.id)
            if (deletePost) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Delete post success"
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    updatePost: async (req, res) => {
        try {
            const idPost = req.params.id
            const dataUpdate = req.body
            //Kiểm tra cần nhập thông tin thay đổi
            const { imgTitle, title, content, imgsId } = dataUpdate
            if (imgTitle || title || content || imgsId) {
                const postBeforUpdate = await Post.findByIdAndUpdate(
                    idPost,
                    dataUpdate,
                    { new: true }
                )
                if (postBeforUpdate) {
                    return res.status(200).json({
                        status: 200,
                        result: 'OK',
                        mes: 'Update post success'
                    })
                }
            }
            if (Object.keys(dataUpdate).length == 0) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'you need to enter something to update the post'
                })
            }
            return res.status(200).json({
                result: 'Error',
                mes: 'Data update invalid'
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update post',
                error: err
            })
        }
    },
    getDetailPost: async (req, res) => {
        try {
            const slugifyPost = req.params.id
            const post = await Post.findOne({ slugify: slugifyPost })
            if (post) {
                return res.status(200).json({
                    status: 200,
                    result: 'OK',
                    mes: 'get detail product success',
                    post

                })
            }
            else{
                return res.status(200).json({
                    status: 200,
                    result: 'error',
                    mes: 'can not find post'
    
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'error',
                error: err
            })
        }
    },
}

module.exports = postController
