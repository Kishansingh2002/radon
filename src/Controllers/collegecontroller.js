const collegeModel = require("../models/collegeModel");

let createCollege = async (req, res) => {
  try {
    let data = req.body;
    let name = req.body.name;
    let fullName = req.body.fullName;
    let logoLink = req.body.logoLink;
    //    const {name} = data
    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Body is required" });

    if (!name || name.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "College Name is Required" });

    let validateName = /^[a-zA-Z.]+$/;

    if (!validateName.test(name))
      return res
        .status(400)
        .send({ status: false, message: `${name} is not a valid name` });

    

    const findName = await collegeModel.find({ name: name, isDeleted: false });

    if (findName.length > 0)
      return res
        .status(401)
        .send({ status: false, message: `${name} already exist` });

    if (!fullName || fullName.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "College Full Name is Required" });

    let validateFullName = /^[A-Za-z\s]{1,}[\,]{0,1}[A-Za-z\s]{0,}$/;

    if (!validateFullName.test(fullName))
      return res
        .status(400)
        .send({
          status: false,
          message: `${fullName} is not a valid FullName`,
        });

    if (!logoLink || logoLink.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "logo is Required" });

    let validateLogoLink =
      /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm;

    if (!validateLogoLink.test(logoLink))
      return res
        .status(400)
        .send({
          status: false,
          message: `${logoLink} is not a valid logoLink`,
        });

    // const internData = {name.trim()}
    const createData = await collegeModel.create(data);

    if (!createData)
      return res
        .status(500)
        .send({ status: false, message: "Creation Failed" });
    res.status(201).send({ status: true, data: createData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createCollege = createCollege;
