const WebsiteInfo = require("../models/webInforModel")


const webInfoController = {
    getWebInfo: async (req, res) => {
        try {
            await WebsiteInfo.findOneAndUpdate(
                {},
                { $inc: { totalViews: 1 } },
                { upsert: true, new: true } // tạo nếu chưa có
            );
            const infoData = await WebsiteInfo.find({})
            if (infoData) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "get all info success",
                    infoData
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

    //ADMIN
    // createProject: async (req, res) => {
    //     try {
    //         const newPost = await WebsiteInfo.create({
    //             imgsBanner: ["https://4kwallpapers.com/images/wallpapers/modern-architecture-look-up-reflection-glass-building-3840x2160-2881.jpg", "https://plus.unsplash.com/premium_photo-1669412515480-ab95d79d47b1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww", "https://i.pinimg.com/originals/0b/8c/55/0b8c551e7041ac733f985a40c10343c7.jpg"],
    //         })
    //         if (newPost) {
    //             return res.status(200).json({
    //                 status: 200,
    //                 result: 'OKK',
    //                 mes: "Create project success",
    //                 project: newPost
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }
    // },

    updateProject: async (req, res) => {
        try {
            const webId = req.params.id
            const dataUpdate = req.body
            //Kiểm tra cần nhập thông tin thay đổi
            const { imgsBanner } = dataUpdate
            if (imgsBanner) {
                const webInforBeforUpdate = await WebsiteInfo.findByIdAndUpdate(
                    webId,
                    dataUpdate,
                    { new: true }
                )
                if (webInforBeforUpdate) {
                    return res.status(200).json({
                        status: 200,
                        result: 'OK',
                        mes: 'Update success'
                    })
                }
            }
            if (Object.keys(dataUpdate).length == 0) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'you need to enter something to update'
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
                mes: 'Can not update',
                error: err
            })
        }
    },
}

module.exports = webInfoController