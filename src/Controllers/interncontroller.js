const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const mongoose = require("mongoose");

let createIntern = async function (req, res) {
  try {
    let data = req.body;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let name = req.body.name;
    let collegeName = req.body.collegeName;

    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Body is required" });

    if (!collegeName || collegeName.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "College Name is required" });

    let findCollege = await collegeModel.find({ name: collegeName });

    if (findCollege.length == 0)
      res
        .status(404)
        .send({ status: false, message: `${collegeName} doesn't exist` });

   

    //delete data.collegeName;

    if (!name || name.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Name is Required" });

    let nameValidate = /^[A-z]*$|^[A-z]+\s[A-z]*$/;

    if (!nameValidate.test(name))
      return res
        .status(400)
        .send({ status: false, message: `${name} is not a valid name` });

    if (!email || email.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Email is Required" });

    let validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validateEmail.test(email))
      return res
        .status(400)
        .send({ status: false, messsage: `${email} is not a valid emailId` });

    let findData = await internModel.findOne({ email: email, isDeleted: false });
    if (findData)
      return res
        .status(404)
        .send({ status: false, message: `${email} Already Exist` });

    if (!mobile || mobile.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Mobile number is Required" });

    let validateMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!validateMobile.test(mobile))
      return res
        .status(400)
        .send({ status: false, messsage: "Number must be Numeric and valid" });

    let findNumber = await internModel.find({
      mobile: mobile,
      isDeleted: false,
    });

    if (findNumber.length > 0)
      return res
        .status(404)
        .send({ status: false, message: `${mobile} Already Exist` });

    //let createData = { name, mobile, email, collegeId };

    let create = await internModel.create(data);
    res.status(201).send({ status: true, data: create });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.message });
  }
};

let getCollege = async (req, res) => {
  try {
    let data = req.query.collegeName;
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "provide the College name" });

    let findCollege = await collegeModel.find({ name: data });

    if (findCollege.length == 0)
      return res
        .status(404)
        .send({ status: false, message: `${data} doesn't exist` });

  //  if (findCollege[0].isDeleted == true)
   //   return res
     //   .status(404)
      //  .send({ status: false, message: `${data} is already deleted` });

    let findIntern = await internModel
      .find()
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });
    if (findIntern.length == 0)
      return res
        .status(404)
        .send({ status: false, messsage: `No intern applied in ${data}` });

    res.status(200).send({
      status: true,
      data: {
        name: data,
        fullName: findCollege[0].fullName,
        logoLink: findCollege[0].logoLink,
        interests: findIntern,
      },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// module.exports.createIntern = createIntern;
// module.exports.getCollege = getCollege;

module.exports={createIntern,getCollege} //destructuring