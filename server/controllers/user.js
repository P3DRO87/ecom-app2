const { response, json } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res = response) => {
   try {
      const adminUser = await User.findById(req._id);

      if (adminUser.role !== "admin") {
         return res.status(401).json({ msg: "Unauthorized" });
      }

      const users = await User.find().select("-password").lean();

      res.json({ users });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const updateUser = async (req, res = response) => {
   try {
      const { id, role } = req.body;

      if (!role) return res.status(400).json({ msg: "Invalid role" });

      const adminUser = await User.findById(req._id);

      if (adminUser.role !== "admin") {
         return res.status(401).json({ msg: "Unauthorized" });
      }

      const userToUpdate = await User.findById(id);

      if (!userToUpdate) return res.status(400).json({ msg: "Invalid user" });

      const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

      res.json({ updatedUser });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const loginUser = async (req, res = response) => {
   const { email = "", password = "" } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid user - Email" });

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) return res.status(400).json({ msg: "Invalid user - Password" });

      const { role, name, _id } = user;

      const token = await generateJWT({ name, _id });

      res.json({ token, user: { email, role, name, _id } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const registerUser = async (req, res = response) => {
   const { email = "", password = "", name } = req.body;

   try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "The user already exist" });

      user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      user.role = "client";

      await user.save();

      const token = await generateJWT({ name, _id: user._id });

      const { _id, role, email: userEmail } = user;

      res.json({ token, user: { _id, role, email: userEmail } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const validateToken = async (req, res = response) => {
   const { token = "" } = req.cookies;

   try {
      const { _id, name } = req;

      const userDB = await User.findById(_id);

      if (!userDB) return res.status(400).json({ msg: "Invalid user" });

      const { role } = userDB;

      res.json({ token, user: { _id, name, role } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const oAuthLogin = async (req, res = response) => {
   if (!req.body.email) return res.status(400).json({ msg: "Missing email" });
   if (!req.body.name) return res.status(400).json({ msg: "Missing Name" });

   try {
      const userDB = await User.findOne({ email: req.body.email });

      if (userDB) {
         const { _id, role, email, name } = userDB;

         return res.json({ _id, role, email, name });
      }

      const newUserInfo = { password: "Silence is golden", role: "client" };

      const newUser = new User({ ...req.body, ...newUserInfo });
      await newUser.save();

      const { name, email, role, _id } = newUser;

      res.status(201).json({ name, email, role, _id });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = {
   getUsers,
   updateUser,
   loginUser,
   registerUser,
   validateToken,
   oAuthLogin,
};
