const validUrl = require("valid-url");
const shortid = require("shortid");

const UrlModel = require("../models/urlModel");
const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === String && value.trim().length === 0) return false;
  return true;
};
const createUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const baseUrl = "http://localhost:3001";

    if (Object.keys(req.body).length == 0)
      return res.status(400).send({
        status: false,
        message: "Invalid URL Please Enter valid details",
      });
    // if (!longUrl)
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "longUrl is required" });

    if (!isValid(longUrl)) {
      return res.status(400).send({ status: false, msg: "please enter url" });
    }

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json("Invalid base url");
    }

    // Create url code
    const urlCode = shortid.generate();
    if (!validUrl.isUri(longUrl))
      return res
        .status(400)
        .send({ status: false, msg: "longUrl is not Invalid" });

    let url = await UrlModel.findOne({ longUrl });

    if (url) {
      return res
        .status(400)
        .send({ status: false, msg: "This longUrl already shorting" });
    }
    const shortUrl = baseUrl + "/" + urlCode;
    req.body.urlCode = urlCode; //req.body me urlCode aor shorturl dal rhe hai uske bad usko create kr rhe hai
    req.body.shortUrl = shortUrl; //because hmko shorturl and Urlcode dono dalna hoda

    url = await UrlModel.create(req.body);

    let mainData = await UrlModel.findOne({ urlCode: urlCode }).select({
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    return res.status(201).send({
      status: true,
      message: "URL create successfully",
      data: mainData,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.msg });
  }
};

const getUrl = async (req, res) => {
  try {
    let urlCode = req.params.urlCode;
    const checkurl = await UrlModel.findOne({ urlCode: urlCode }); //hm jo urlCode dal rhe hai vo DB me hai ki nhi

    if (!checkurl) {
      return res.status(302).redirect(checkurl.longUrl); //check url mil gaya to redirect kr dege
    }
    return res.status(404).send({ status: false, msg: "No url found" }); //checkurl nhi milega to ye msg aayega
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports.createUrl = createUrl;
module.exports.getUrl = getUrl;
