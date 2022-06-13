const UserModel = require("../models/userModel")

const basicCode = async function (req, res) {
    let tokenDataInHeaders = req.headers.token
    console.log(tokenDataInHeaders)

    console.log("HEADER DATA ABOVE")
    console.log("hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)" })
}



const createUser = async function (req, res) {
    let data = req.body
    let tokenDataInHeaders = req.headers.token
    console.log(tokenDataInHeaders)
    req.headers['month']='june'
    console.log(req.headers)
    
    res.send({ msg:hiii })
}

const getUsersData = async function (req, res) {
    let allUsers = await UserModel.find()
    res.send({ msg: allUsers })
}

module.exports.createUser = createUser
module.exports.getUsersData = getUsersData
module.exports.basicCode = basicCode