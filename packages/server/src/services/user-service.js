import { NotFound } from "../utils/errors";

// const User = mongoose.model("User");
import User from "../models/User";

export const saveUser = async (user) => {
  const newUser = await new User(user).save();
  return newUser;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user;
};

export const update = async (user, id) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
  }).exec();

  if (updatedUser) {
    return updatedUser;
  }

  throw new NotFound("User not found by given id");
};

export const deleteById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (user) {
    await User.deleteOne({ _id: id });
    return;
  }

  throw new NotFound("User not found by given id");
};
