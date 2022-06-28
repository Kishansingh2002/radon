const express = require("express");

const router = express.Router();

const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");
const {authentication,authorization} = require("../middlewares/authorization");

router.post("/authors", authorController.createAuthor);

router.post("/login", authorController.authorLogin);

router.post("/blogs", authentication,blogsController.createBlogs);

router.get("/blogs", authentication,blogsController.getAllBlogs);

router.put("/blogs/:blogId", authentication,authorization,blogsController.updateBlogsById);

router.delete("/blogs/:blogId",authentication,authorization,blogsController.deleteBlogsById);

router.delete("/blogs", authentication,blogsController.deleteBlogsByQuery);

router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    msg: "The api you request is not available",
  });
});

module.exports = router;
