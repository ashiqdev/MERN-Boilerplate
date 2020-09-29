import { response } from "express";
import { NotFound } from "../utils/errors";

// const Post = mongoose.model("Post");
import Post from "../models/Post";

export const savePost = async (post) => {
  const newUser = await new Post(post).save();
  return newUser;
};

export const getAllPosts = async () => {
  const posts = await Post.find();
  return posts;
};

export const update = async (post, id) => {
  const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, {
    new: true,
  }).exec();

  if (updatedPost) {
    return updatedPost;
  }

  throw new NotFound("Post not found by given id");
};

export const deleteById = async (id) => {
  const post = await Post.findOne({ _id: id });
  if (post) {
    return Post.deleteOne({ _id: id });
  }

  throw new NotFound("Post Not found by given id");
};
