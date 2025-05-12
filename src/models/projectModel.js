const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    imgs: {},
    name: {},
    investor: {},
    totalCost: {},
    location: {},
    date: {},
    decs: {},
    nFloors: {},
    style: {},
    area: {},
    slugify:{}
}, {
    timestamps: true
})

const Project = new mongoose.model("Project", projectSchema)
module.exports = Project