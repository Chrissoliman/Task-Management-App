import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import generateTokenAndCookie from "../lib/utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be longer than 6 characters" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordMatch) {
      return res.status(200).json({ error: "Invalid email or password." });
    }

    const token = await generateTokenAndCookie(user._id, res);

    res.status(201).json({
      token,
      email: user.email,
    });
  } catch (error: any) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Succefully" });

  } catch (error: any) {
    console.log("Error in Logout controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
