const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
const createBook = async function (req, res) {
    let data = req.body;
    if (!data.author || !data.publisher)
        res.send({ msg: "Author ID/Publisher ID is required" })
    else if (!ObjectId.isValid(data.author) || !ObjectId.isValid(data.publisher))
        res.send({ msg: "The Author/Publisher is not present" })
    else {
        let saveData = await bookModel.create(data);
        res.send({ msg: saveData });
    }
}
const listAllBooks = async function (req, res) {
    let getData = await bookModel.find().populate(['author', 'publisher'])
    res.send({ msg: getData })
}
const updateBooks = async function (req, res) {
    let publisherId = await publisherModel.find({ name: { $in: ["Penguin", "HarperCollins"] } }).select("_id");
    let updateData
    for (let i = 0; i < publisherId.length; i++) {
        updateData = await bookModel.updateMany({ publisher: publisherId[i]._id }, { $set: { isHardCover: true } })
    }
    let authorId = await authorModel.find({ rating: { $gt: 3.5 } }).select("_id")
    let updateData1;
    for (let i = 0; i < authorId.length; i++) {
        updateData1 = await bookModel.updateMany({ author: authorId[i]._id }, { $inc: { price: 10 } })
    }
    res.send({ msg1: updateData, msg2: updateData1 })
}

module.exports.createBook = createBook
module.exports.listAllBooks = listAllBooks
module.exports.updateBooks = updateBooks 
