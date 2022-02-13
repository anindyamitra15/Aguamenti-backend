const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  bcrypt_salt,
  access_token,
  salt_rounds,
} = require("../../config/env.config");

const Register = async (name, email, pass, res) => {
  try {
    const findUser = await User.findOne({ email });
    if (findUser)
      return {
        code: 400,
        message: `User exists, try logging in`,
      };

    const salt = await bcrypt.genSalt(salt_rounds);
    const password = await bcrypt.hash(pass, salt);
    const newUser = new User({ name, email, password });
    await newUser.save();
    return {
      code: 200,
      message: `Registered`,
    };
  } catch (err) {
    console.log(err);
    return {
      code: 500,
      message: `Service Error ${err}`,
    };
  }
};

const Login = async (email, pass) => {
  try {
    const findUser = await User.findOne({ email });
    if (!findUser)
      return {
        code: 400,
        message: `User doesn't exist, try registering`,
      };

    if (!(await bcrypt.compare(pass, findUser.password)))
      return {
        code: 400,
        message: `Invalid credentials`,
      };

    const token = jwt.sign(
      {
        email: User.email,
        name: User.name,
        chip_id: User.chip_id,
      },
      access_token,
      {
        expiresIn: "1h",
      }
    );

    return {
      code: 200,
      token,
      message: "Success",
    };
  } catch (err) {
    console.log(err);
    return {
      code: 500,
      message: `${err}`,
    };
  }
};

module.exports = { Register, Login };
