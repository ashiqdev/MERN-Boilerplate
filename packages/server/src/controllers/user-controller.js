import express from "express";
import {
  deleteById,
  getAllUsers,
  getUserById,
  saveUser,
  update,
} from "../services/user-service";
import { NotFound } from "../utils/errors";
import { userValidationRules, validate } from "../utils/validator";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    //  1. Get users by calling db
    const users = await getAllUsers();
    // 2.return the post as response
    res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user) {
      return res.status(200).send(user);
    }
    throw new NotFound("User not found by given id");
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    // 1. create user by calling db
    const user = await saveUser(body);
    // 2. return the user as response
    res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    //   1. update user by calling db
    const user = await update(body, id);
    //   2. return the updated user
    return res.status(200).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteById(id);
    res.status(200).send("User Deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.get("/:id", getByIdHandler);
router.post("/", userValidationRules(), validate, postHandler);
router.put("/:id", putHandler);
router.delete("/:id", deleteHandler);

const configure = (app) => app.use("/api/users", router);

export default configure;
