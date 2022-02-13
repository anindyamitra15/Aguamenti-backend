const UserServices = require("../services/user.services");

const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({
        message: `Bad request`,
      });
    const { code, message } = await UserServices.Register(
      name,
      email,
      password
    );
    res.status(code).json({ message });
  } catch (err) {
    return res.status(500).json({
      message: `Controller Error ${err}`,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: `Bad request`,
      });
    const { code, message, token } = await UserServices.Login(email, password);
    return res.status(code).json({
      message,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Controller Error ${err}`,
    });
  }
};

module.exports = { Register, Login };
