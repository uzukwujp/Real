import User from "../models/user";
import validateSignUpInput from "../inputValidations/signUp";
import bcrypt from "bcrypt";
import validateSignInInput from "../inputValidations/signIn";
import generateToken from "../utilities/generateToken";
import sharp from "sharp";
import { join } from "path";

export const signUp = async (req, res) => {
  try {
    const { error } = validateSignUpInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let fileName;

    if (req.file) {
      fileName = `thum_${req.file.filename}`;

      const resize_image = await sharp(req.file.path)
        .resize(200, 200)
        .png()
        .toFile(join(__dirname, `../avatars/${fileName}`));
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: Number(req.body.phoneNumber),
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
      isAdmin: Boolean(req.body.isAdmin),
      avatar: fileName,
    });
    console.log(user);

    user.completeName();

    const result = await user.save();
    if (result) {
      res.status(201).json({ message: "registration successful", result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: e.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      res.status(400).json({ message: "no user account found" });
    }
    const fileName = `thum_${req.file.filename}`;
    const resize_image = await sharp(req.file.path)
      .resize(200, 200)
      .png()
      .toFile(join(__dirname, `../avatars/${fileName}`));

    user.avatar = fileName;
    const result = await user.save();
    res.status(200).json({ message: "photo uploaded successfully", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
