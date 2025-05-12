const Project = require("../models/projectModel")

const projectController = {
    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.find({}, 'name imgs investor location slugify totalCost style date').sort({ createdAt: -1 })
            if (projects) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "get all projects success",
                    projects: projects
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
    createProject: async (req, res) => {
        try {
            /////////////////
            const { imgs, date, decs, investor, location, nFloors, name, style, totalCost, area, slugify } = req.body
            if (!imgs || !name) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields'
                })
            }
            const newPost = await Project.create({
                imgs,
                date,
                decs,
                investor,
                location,
                nFloors,
                name,
                style,
                totalCost,
                area,
                slugify
            })
            if (newPost) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create project success",
                    project: newPost
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
    deleteProject: async (req, res) => {
        try {
            console.log(req.params.id);
            const deletePost = await Project.findByIdAndDelete(req.params.id)
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
    updateProject: async (req, res) => {
        try {
            const idProject = req.params.id
            const dataUpdate = req.body
            console.log(dataUpdate);
            const { imgs, date, decs, investor, location, nFloors, name, style, totalCost, area, slugify } = dataUpdate
            if (imgs || date || decs || investor || location || nFloors || name || style || totalCost || area || slugify) {
                const projectBeforUpdate = await Project.findByIdAndUpdate(
                    idProject,
                    dataUpdate,
                    { new: true }
                )
                if (projectBeforUpdate) {
                    return res.status(200).json({
                        status: 200,
                        result: 'OK',
                        mes: 'Update project success'
                    })
                }
            }
            if (Object.keys(dataUpdate).length == 0) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'you need to enter something to update the user'
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
                mes: 'Can not update project',
                error: err
            })
        }
    },
    getDetailProject: async (req, res) => {
        try {
            const slugifyProject = req.params.id
            const project = await Project.findOne({ slugify: slugifyProject })
            if (project) {
                return res.status(200).json({
                    status: 200,
                    result: 'OK',
                    mes: 'get detail product success',
                    project

                })
            }
            else{
                return res.status(200).json({
                    status: 200,
                    result: 'error',
                    mes: 'can not find project'
    
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'error',
                error: err
            })
        }
    }
}

module.exports = projectController