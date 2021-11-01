const fs = require("fs"); // xử lý file

// CRUD => files
const addUser = async (user) => {
  try {
    const stringUsers = await fs.promises.readFile("users.json", { encoding: "utf-8" });
    const users = JSON.parse(stringUsers);
    const newUsers = [...users, { id: users.length + 1, ...user }];
    await fs.promises.writeFile("users.json", JSON.stringify(newUsers));
  } catch (err) {
    console.log(err);
  }
};

const readUsers = async () => {
  try {
    const stringUsers = await fs.promises.readFile("users.json", { encoding: "utf-8" });
    const users = JSON.parse(stringUsers);
    return users;
  } catch (err) {
    console.log(err);
  }
};

const readUser = async (id) => {
  try {
    const stringUsers = await fs.promises.readFile("users.json", { encoding: "utf-8" });
    const users = JSON.parse(stringUsers);
    const user = users.find((user) => user.id === id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id, ...dataUpdate) => {
  try {
    const stringUsers = await fs.promises.readFile("users.json", { encoding: "utf-8" });
    const users = JSON.parse(stringUsers);
    const index = users.findIndex((user) => user.id === id);
    if (index < 0) {
      return console.log(`[ERROR] Not found user with id: ${id}`);
    }
    if (dataUpdate.length == 0) {
      return console.log(`[ERROR] Invalid Information.`);
    }
    const newData = {
      id: id,
      username: dataUpdate[0] ?? users[index].username,
      password: dataUpdate[1] ?? users[index].password,
    };

    if (dataUpdate[0]) {
      users.splice(index, 1, newData);
    }
    await fs.promises.writeFile("users.json", JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  try {
    const stringUsers = await fs.promises.readFile("users.json", { encoding: "utf-8" });
    const users = JSON.parse(stringUsers);
    const index = users.findIndex((user) => user.id === id);
    if (index < 0) {
      return console.log(`[ERROR] Not found user with id: ${id}`);
    }
    users.splice(index, 1);
    await fs.promises.writeFile("users.json", JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
};
