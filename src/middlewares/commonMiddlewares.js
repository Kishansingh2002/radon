const moment = require("moment");


const mid1 = function (req, res, next) {
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`${timestamp} , ${req.socket.remoteAddress} , ${req.route.path}`)
    next();

}
const mid2 = function (req, res, next) {
    req.falana = "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid2")
    next()
}

const mid3 = function (req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4 = function (req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}

module.exports.moment = moment
module.exports.mid1 = mid1
module.exports.mid2 = mid2
module.exports.mid3 = mid3
module.exports.mid4 = mid4
