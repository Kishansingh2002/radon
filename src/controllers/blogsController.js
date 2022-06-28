const { default: mongoose } = require("mongoose");
const authorModel = require("../models/authorModel");
const blogsModel = require("../models/blogsModel");

//➡️ POST METHOD, CREATE NEW BLOG USING

const createBlogs = async function (req, res) {
  try {
    const data = req.body;
    if (Object.keys(data).length == 0) {
      // if body is empty then return "msg" body ka key agr zero hai to ye retrn krega
      return res.status(400).send({
        status: false,
        msg: "Post Body Data Required",
      });
    }
    //false statement
    if (!data) {
      return res
        .status(400)
        .send({ status: falase, msg: "Post Body Data Required" });
    }
    if (Object.keys(data.authorId).length > 24) {
      return res.status(400).send({ status: false, msg: "authorId is invelid" });
    }
    if (Object.keys(data.authorId).length < 24) {
      return res.status(400).send({ status: false, msg: "authorId is invelid" });
    }

    if (!data.authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AutherId is mandatory" });
    }
    if (!data.title) {
      return res.status(400).send({ status: false, msg: "Title is mandatory" });
    }
    if (!data.body) {
      return res
        .status(400)
        .send({ status: false, msg: "Body Data is mendatory" });
    }
    if (!data.category) {
      return res
        .status(400)
        .send({ status: false, msg: "Category is mendatory" });
    }
    const ValidAuthor = await authorModel.findById(data.authorId);
    if (!ValidAuthor) {
      return res.status(401).send({
        status: false,
        msg: "Invalid Author, please try with a valid AuthorId",
      });
    }

    const saveData = await blogsModel.create(data);
    res.status(201).send({ status: true, data: saveData });
  } catch (err) {
    res.status(400).send({ status: false, msg: err.message });
  }
};

//➡️ GET METHOD, GET ALL LIST OF BLOGS

const getAllBlogs = async (req, res) => {
  try {
    let data = req.query;

    data.isdeleted = false;
    data.isPublished = true;

    const allBlogs = await blogsModel.find(data);

    if (allBlogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "Blogs list not found",
      });
    }

    res.status(200).send({
      status: true,
      data: allBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      msg: err.message,
    });
  }
};

//➡️ PUT METHOD, UPDATE BY BLOG ID AS PARAMS
const updateBlogsById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = req.body;

    if (Object.keys(data).length == 0)
      return res.status(400).send({
        status: false,
        msg: "Body is Required",
      });
    if (
      Blog.tags &&
      Blog.body &&
      Blog.title &&
      Blog.category && //and ,and
      Blog.subcategory
    ) {
      (Blog.tags = updatedBlog.tags),
        (Blog.body = updatedBlog.body),
        (Blog.title = updatedBlog.title),
        (Blog.category = updatedBlog.category),
        (Blog.subcategory = updatedBlog.subcategory);
    } else {
      return res.status(404).send({ status: false, msg: "wrong key entered" });
    }

    let Blog = await blogsModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      {
        $set: { body: data.body, title: data.title, category: data.category },
        $push: { tags: data.tags, subcategory: data.subcategory },
      },
      { new: true }
    );
    if (!Blog)
      return res.status(404).send({
        status: false,
        msg: "blogsId related data unavailable",
      });

    blogData.publishedAt = Date();
    blogData.isPublished = true;
    blogData.save();
    res.status(200).send({
      status: true,
      data: Blog,
    });
    console.log(Blog);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//➡️ DELETE METHOD, DELETE BY BLOG-iD AS PARAMS

const deleteBlogsById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let result = await blogsModel.findByIdAndUpdate({
      _id: blogId,
      isDeleted: false,
    });
    if (!result)
      return res.status(404).send(
        {
          status: false,
          msg: "User data not found",
        },
        { isDeleted: true, deletedAt: Date() },
        { new: true }
      );

    res.status(200).send({ status: true, msg: "Deleted Successfull" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//➡️ DELETE METHOD, DELETE BY QUERY
const deleteBlogsByQuery = async function (req, res) {
  try {
    let data = req.query;
    if (data.authorId) {
      if (data.authorId != req.decodedToken.authorId) return res.status(401).send({
          status: false,
          msg: "user is not authorized "
      });
  }

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "no query params available ",
      });
    }   

    data.isDeleted = false;
    data.authorId=req.decodedToken.authorId;

    const deleteData = await blogsModel.find(data).updateMany(data, {
      $set: {
        isDeleted: true,
        deletedAt: Date(),
      },
    });
    if (!deleteData) {
      return res.status(404).send({
        status: false,
        msg: "query data not found ",
      });
    }

    res.status(200).send({
      status: true,
      data: deleteData,
      msg: "data deleted saccssesful",
    });
    console.log(deleteData);
  } catch (error) {
    res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};

   




    
    
    

    
module.exports.createBlogs = createBlogs;
module.exports.deleteBlogsById = deleteBlogsById;
module.exports.getAllBlogs = getAllBlogs;
module.exports.updateBlogsById = updateBlogsById;
module.exports.deleteBlogsByQuery = deleteBlogsByQuery;
