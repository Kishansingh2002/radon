const publisherModel = require('../models/publisherModel')
const createPublisher = async function (req, res) {
    let data = req.body;
    let saveData = await publisherModel.create(data);
    res.send({ msg: saveData });
}

module.exports.createPublisher = createPublisher