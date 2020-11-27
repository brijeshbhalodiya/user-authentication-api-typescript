import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { validateEmail } from "../utils/validator";
import asyncCatch from "./../errors/asyncCatch";
import { IUser } from "./../types/user";
import { BadUserInputError, CustomError } from "./../errors/customErrors";
import User from "./../models/User";
import jwt from "./../utils/jwt";


export const signup = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as Pick<IUser, "firstName" | "lastName" | "email" | "password" | "userDetails">

  if(!validateEmail(body.email)){
    return next(new BadUserInputError({fields: ['email']}))
  }

  const user: IUser | null = await User.findOne({ email: body.email });

  if(user){
    return next(new CustomError('Email is already registered', 'CONFLICT', 409))
  }

  const pwdHash: string = await bcrypt.hash(body.password, 12);
  
  const newUser: IUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    pwdHash
  });

  await newUser.save();

  const token = jwt.signToken({ userId: newUser._id });

  res.setHeader("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    "message": "User registered successfully",
    token: token
  });
});