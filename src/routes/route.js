const express = require("express");

const router = express.Router();
const Collegecontroller = require("../Controllers/collegecontroller");
const Interncontroller = require("../Controllers/interncontroller")


router.post("/functionup/colleges", Collegecontroller.createCollege);
router.post("/functionup/interns", Interncontroller.createIntern);
router.get("/functionup/collegeDetails",Interncontroller.getCollege);

router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    msg: "The api you request is not available",
  });
});

module.exports = router;
