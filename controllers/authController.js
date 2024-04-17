const User = require("../models/User");

const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    location: req.body.location,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully! -CREATEUSER API" });
  } catch (err) {
    res.status(500).json({ createUserApiError: err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json("Wrong credentials provide a valid email! -LOGINUSER API");
    }

    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const decryptedPass = decryptedPassword.toString(CryptoJs.enc.Utf8);

    if (decryptedPass !== req.body.password) {
      return res
        .status(401)
        .json("Wrong credentials provide a valid password! -LOGINUSER API");
    }

    const userToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (err) {
    res.status(500).json({ loginUserApiError: err });
  }
};

module.exports = { createUser, loginUser };
