import express from "express";
import {
  deleteById,
  getAllPosts,
  savePost,
  update,
} from "../services/post-service";
import { postValidationRules, validate } from "../utils/validator";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    //  1. Get posts by calling db
    const posts = await getAllPosts();
    // 2. return the post as response
    res.status(200).send(posts);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    // 1. create post by calling db
    const post = await savePost(body);
    // 2. return the post as response
    res.status(201).send(post._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    //   1. update post by calling db
    const post = await update(body, id);
    //   2. return the updated post
    return res.status(200).send(post._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    // 1. delete post by calling db
    await deleteById(id);
    // 2. return a message that, post is deleted
    res.status(200).send("Post Deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.post("/", postValidationRules(), validate, postHandler);
router.put("/:id", postValidationRules(), validate, putHandler);
router.delete("/:id", deleteHandler);

const configure = (app) => app.use("/api/posts", router);

export default configure;
