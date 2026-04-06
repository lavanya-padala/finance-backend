const Record = require("../models/Record");
const User=require("../models/User");

exports.createUser= async (req, res) => {
  try {
        const { name, email, role, status } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const user = await User.create({
        name,
        email,
        role,
        status
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
  { returnDocument: 'after' }
    );
    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    //delete records associated with user also
    await Record.deleteMany({createdBy:req.user.id});
    await User.findByIdAndDelete(req.user.id);       
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};