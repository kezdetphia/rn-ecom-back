const User = require("../models/User");

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json({ deleteUserApiError: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(401).json("User not found!");
    }
    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ getUserApiError: err });
  }
};

module.exports = { deleteUser, getUser };
