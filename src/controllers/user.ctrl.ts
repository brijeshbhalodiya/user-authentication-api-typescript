import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { validateEmail } from "../utils/validator";
import asyncCatch from "./../errors/asyncCatch";
import { IUser } from "./../types/user";
import { BadUserInputError, CustomError, EntityNotFoundError } from "./../errors/customErrors";
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
    password: pwdHash
  });

  await newUser.save();

  const token = jwt.signToken({ userId: newUser._id }, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.setHeader("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    "message": "User registered successfully",
    token: token
  });
});

export const login = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as Pick<IUser, "email" | "password">
  
  if(!validateEmail(body.email)){
    return next(new BadUserInputError({fields: ['email']}))
  }

  const user: IUser | null = await User.findOne({ email: body.email });
  
  if(!user){
    return next(new EntityNotFoundError("user"));
  }

  const isPasswordValid: boolean = await bcrypt.compare(body.password, user.password)

  if(!isPasswordValid){
    return next(new EntityNotFoundError("user"));
  }

  const token = jwt.signToken({ userId: user._id }, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.setHeader("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    "message": "Success",
    token: token
  });



});