import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
  const {username, email, password} = new User(req.body);
  const hashedPassword = bcryptjs.hashSync(password,10); 
  const newUser = new User({username, email, password: hashedPassword});
  try {
    await newUser.save()
    .then(user => res.status(201).json({
      message: 'User created successfully',
      user: user
    }));
  } catch (error) {
    next(errorHandler(error.status, error.message));  
  }
} 