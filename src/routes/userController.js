const UserModel=require("../routes/userModel.js")

const createUser= async function(req, res){
    var data =req.body
    let savedData= await UserModel.create(data)
    res.send({msge: savedData})

}
const getUserData= async function(req, res){
    let allUser= await UserModel.find()
    res.send({msge: allUser})
}
module.exports.createUser=createUser
module.exports.getUserData=getUserData