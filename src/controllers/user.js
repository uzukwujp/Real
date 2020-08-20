import User from "../models/user";
import validateSignUpInput from "../inputValidations/signUp";
import bcrypt from "bcrypt";
import validateSignInInput from "../inputValidations/signIn";
import generateToken from "../utilities/generateToken";

export const signUp = async (req, res) => {
  try {
    const { error } = validateSignUpInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: Number(req.body.phoneNumber),
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
      isAdmin: req.body.isAdmin,
    });
    const result = await user.save();
    if (result) {
      res.status(201).json({ message: "registration successful" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = validateSignInInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
