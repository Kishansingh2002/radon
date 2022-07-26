const validUrl = require("valid-url");
const shortid = require("shortid");
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  13190,
  "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("gkiOIPkytPI3ADi14jHMSWkZEo2J5TDG", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

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

    if (!isValid(longUrl)) {
      return res.status(400).send({ status: false, msg: "please enter url" });
    }

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json("Invalid base url");
    }
    let getUrl = await GET_ASYNC(`${longUrl}`);
    let fetchurl = JSON.parse(getUrl); //string se hatane ka kam krta hai
    if (fetchurl) {
      return res
        .status(200)
        .send({ status: true, message: " fetch Successfull", data: fetchurl });
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
    await SET_ASYNC(`${longUrl}`, JSON.stringify(mainData));

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
    let cachedLongUrl = await GET_ASYNC(`${urlCode}`);
    if (cachedLongUrl) {
      console.log("redirect from cache");
      return res.status(302).redirect(JSON.parse(cachedLongUrl));
    }
    const checkurl = await UrlModel.findOne({ urlCode: urlCode }); //hm jo urlCode dal rhe hai vo DB me hai ki nhi

    if (!checkurl) {
      await SET_ASYNC(`${urlCode}`, JSON.stringify(url.longUrl));
      console.log("redirect from DB");
      return res.status(302).redirect(checkurl.longUrl); //check url mil gaya to redirect kr dege
    }
    return res.status(400).send({ status: false, msg: "No url found" }); //checkurl nhi milega to ye msg aayega
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports.createUrl = createUrl;
module.exports.getUrl = getUrl;
