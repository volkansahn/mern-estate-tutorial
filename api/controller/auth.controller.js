import User from "../models/user.model.js"

export const signup = (req,res) =>{
  const newUser = new User(req.body);
  newUser.save()
  .then(user => res.status(201).json({
    message: 'User created successfully',
    user: user
  }));
} 