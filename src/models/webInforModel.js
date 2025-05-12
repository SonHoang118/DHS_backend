const mongoose = require('mongoose');

const webInfoSchema = new mongoose.Schema({
    totalViews: { type: Number, default: 0 },
    imgsBanner: {}
});

const WebsiteInfo = mongoose.model('WebsiteInfo', webInfoSchema);

module.exports = WebsiteInfo;
