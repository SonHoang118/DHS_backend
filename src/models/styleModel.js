const mongoose = require('mongoose')

const styleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id_projects_list: { type: Array },
})

const Style = new mongoose.model("Style", styleSchema)
module.exports = Style