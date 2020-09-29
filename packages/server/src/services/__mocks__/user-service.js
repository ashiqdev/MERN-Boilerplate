import User from "../../models/User";

const users = [
  {
    id: "1",
    name: "test001",
    email: "test001@gmail.com",
  },
];

export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

export const getUserById = (id) => {
  const user = users.find((u) => u.id === id);
  return user;
};

export const update = (body, id) => {
  users[0].name = body.name;
  users[0].email = body.email;
  return users[0];
};

export const deleteById = () => {
  users[0] = [];
};
