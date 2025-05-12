const Project = require("../models/projectModel")
const Type = require("../models/styleModel")

const typeProductService = {
    createTypeProduct: (typeProductData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newTypeProduct = await Type.create(typeProductData)
                if (newTypeProduct) {
                    resolve(newTypeProduct)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    updateTypeProduct: (idType, updateDate) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, id_product, type_change } = updateDate
                console.log('name', name)
                if (name) {
                    console.log('update')
                    const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                        idType,
                        { name },
                        { new: true }
                    )
                    if (typeProductBeforUpdate) {
                        resolve({
                            status: 200,
                            result: 'OK',
                            mes: 'Update type product success',
                            typeProductBeforUpdate
                        })
                    }
                } else if (id_product) {
                    if (!type_change) {
                        resolve({
                            status: 400,
                            result: 'Err',
                            mes: 'Can notu pdate type product success'
                        })
                    }
                    else if (type_change == 2) {
                        //remove
                        const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                            idType,
                            { $pull: { id_projects_list: id_product } },
                            { new: true }
                        )
                        if (typeProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update type product success',
                                typeProductBeforUpdate
                            })
                        }
                    } else if (type_change == 1) {
                        //add
                        const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                            idType,
                            { $push: { id_projects_list: id_product } },
                            { new: true }
                        )
                        if (typeProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update type product success',
                                typeProductBeforUpdate
                            })
                        }
                    }
                }

                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getDetailTypeProduct: (idType) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy thông tin product và trả về
                console.log('first', idType)
                const type = await Type.findOne({ _id: idType })
                if (type) {
                    resolve({
                        type
                    })
                }
                reject({ status: 404, err: error, mes: 'Cant find type' })
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    // getManyDetailTypeProduct: (idType) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             //Tất cả đều Ok --> lấy thông tin product và trả về
    //             console.log('first', idType)
    //             const type = await Type.find({ _id: idType })
    //             if (type) {
    //                 resolve({
    //                     type
    //                 })
    //             }
    //             reject({ status: 404, err: error, mes: 'Cant find type' })
    //         }
    //         catch (err) {
    //             reject(err)
    //         }
    //     }
    //     )
    // },
    deleteTypeProduct: (idType) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteTypeProduct = await Type.findByIdAndDelete(idType)
                if (deleteTypeProduct) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete type product success'
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getAllDetailTypeProduct: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const types = await Type.find({}).lean()
                if (types) {
                    resolve({
                        types
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getAllTypeProductName: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const types = await Type.find({}, 'name _id').lean()
                if (types) {
                    resolve({
                        types
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    }
}

const typeProductController = {
    createTypeProduct: async (req, res) => {
        const { name } = req.body
        try {
            if (!name) {
                return res.status(200).json({
                    status: 400,
                    result: 'Err',
                    mes: "You need to enter required filed"
                })
            }
            const TypeAlreadyCheck = await Type.findOne({ name })
            if (TypeAlreadyCheck) {
                return res.status(200).json({
                    status: 409,
                    result: 'Error',
                    mes: 'Type already exists'
                })
            }
            const newType = await typeProductService.createTypeProduct(req.body)
            if (newType) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create type success",
                    type: newType
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
    getDetailTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const type = await typeProductService.getDetailTypeProduct(idType)
            if (type) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail type product success',
                    ...type
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
    getDetailTypeProductName: async (req, res) => {
        try {
            const nameType = req.params.name
            console.log('nameType', nameType);
            const type = await Type.findOne({ name: nameType })
            if (type) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail Type product by name success',
                    type
                })
            }
            return res.status(200).json({
                status: 404
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    getManyDetailTypeProduct: async (req, res) => {
        try {
            const { idTypes } = req.body
            const goods = await Type.find({
                _id: { $in: idTypes }
            }, 'name _id');
            res.json(goods);
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    getAllDetailTypeProduct: async (req, res) => {
        try {
            const types = await typeProductService.getAllDetailTypeProduct()
            if (types) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all types success',
                    ...types
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
    getAllTypeProductName: async (req, res) => {
        try {
            const types = await typeProductService.getAllTypeProductName()
            if (types) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all name types success',
                    ...types
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
    updateAddProducts: async (req, res) => {
        const { idsType, idProduct } = req.body
        console.log(idsType, idProduct);
        try {
            const result = await Type.updateMany(
                { _id: { $in: idsType } },
                { $addToSet: { id_projects_list: idProduct } }
            )
            if (result) {
                return res.status(200).json({
                    status: 200,
                    ...result
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
    updateDeleteProducts: async (req, res) => {
        const { idsType, idProduct } = req.body

        try {
            const result = await Type.updateMany(
                { _id: { $in: idsType } },
                { $pull: { id_projects_list: idProduct } }
            )
            if (result) {
                return res.status(200).json({
                    status: 200,
                    ...result
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
    updateTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const dataUpdate = req.body
            console.log('first', idType)
            //Kiểm tra cần nhập thông tin thay đổi
            if (true) {
                const resultUpdateType = await typeProductService.updateTypeProduct(idType, dataUpdate)
                if (resultUpdateType) {
                    return res.status(200).json({
                        ...resultUpdateType
                    })
                }
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update type',
                error: err
            })
        }
    },
    deleteTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const type = await Type.findOne({ _id: idType })
            if (type) {
                console.log('type', type?.id_projects_list);
                const result = await Project.updateMany(
                    { _id: { $in: type?.id_projects_list } },
                    { $pull: { style: idType } }
                )
                if (result) {
                    const resultDeleteType = await typeProductService.deleteTypeProduct(idType)
                    // var resultDeleteType = true
                    if (resultDeleteType) {
                        return res.status(200).json({
                            status: 200,
                            ...resultDeleteType
                        })
                    }
                }
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
}

module.exports = typeProductController

