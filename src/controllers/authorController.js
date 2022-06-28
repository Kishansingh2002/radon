const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const validator = require("email-validator");
let stringPattern = /^[A-Za-z. ]{2,30}$/;
let passwordPattern =
  /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

const createAuthor = async function (req, res) {
  try {
    let data = req.body;

    //false statement

    if (!data.fname.match(stringPattern)) {
      return res.status(400).send({
        status: false,
        msg: "fname Must Be An Alphabet And Of Atleast Two Characters",
      });
    }
    if (!data.lname) {
      return res
        .status(400)
        .send({ status: false, msg: "lname Must Be Present" });
    }
    if (!data.lname.match(stringPattern)) {
      return res.status(400).send({
        status: false,
        msg: "lname Must Be An Alphabet And Of Atleast Two Characters",
      });
    }
    if (!data.title) {
      return res
        .status(400)
        .send({ status: false, msg: "title Must Be Present" });
    }
    if (data.title != "Mr" && data.title != "Mrs" && data.title != "Miss") {
      return res
        .status(400)
        .send({ status: false, msg: "title Must Be Mr,Mrs or Miss" });
    }

    if (!validator.validate(data.email))
      if (!data.email)
        //validator use of packege

        return res
          .status(400)
          .send({ status: false, msg: "Email Must Be Required" });

    let email = req.body.email;
    let duplicate = await authorModel.findOne({ email: email });
    if (duplicate)
      return res
        .status(400)
        .send({ status: false, msg: "Email Already Exist." });

    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, msg: "password Must Be Present" });
    }
  //  if (!data.password.match(passwordPattern)) {
 //     return res
      //  .status(400)
      //  .send({
      //    status: false,
     //     msg: "password Must Contain One Uppercase,Lowercase,Number,Symbol And Minimum Length Should Be 8-Character",
    //    });
  //  }

    const saveData = await authorModel.create(data);
    if (!saveData)
      return res.status(500).send({
        status: false,
        data: "Can't save Your Data Something went wrong",
      });

    res.status(201).send({ status: true, data: saveData });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};
const authorLogin = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email)
      return res.status(400).send({ status: false, msg: "Email Not Present" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "Password Not Present" });
    let findAuthor = await authorModel.findOne({
      email: email,
      password: password,
    });

    if (!findAuthor)
      return res.status(401).send({
        status: false,
        msg: "Email Or Password not Valid",
      });

    //    ➡️  ✍️ jwt.sign Token creation

    let token = jwt.sign(
      {
        authorId: findAuthor._id.toString(),
      },
      "Group 16"
    );
    res.status(201).send({ status: true, data: token });
  } catch (err) {
    //console.log(error.message)
    res.status(500).send({
      status: false,
      msg: err.message,
    });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.authorLogin = authorLogin;
