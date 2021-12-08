const UserModel = require("./user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new Error("Username could not be empty.");
    }

    if (password && password.length <= 6) {
      //password?.length <= 6
      throw new Error("Password should contain at least 6 characters.");
    }

    const existedUser = await UserModel.findOne({ username });
    if (existedUser) {
      throw new Error("Something went wrong.");
    }
    const salt = await bcrypt.genSalt(10);
    // salt: chuỗi ngẫu nhiên tăng độ mạnh của hàm mã hóa
    // nếu ko có salt => password đã mã hóa có thể giải bằng cách băm password tương ứng và so sánh chuỗi tương ứng
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({ username, password: hashPassword });
    res.send({ success: 1, data: newUser });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existedUser = await UserModel.findOne({ username });
    if (!existedUser) {
      throw new Error("Login Failed (username not found)");
    }

    const hashPassword = existedUser.password;
    const matchedPassword = await bcrypt.compare(password, hashPassword);
    if (!matchedPassword) {
      throw new Error("Login Failed (password not matched)");
    }
    res.send({
      success: 1,
      data: {
        _id: existedUser._id,
        username: existedUser.username,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};
module.exports = {
  signUp,
  signIn,
};
