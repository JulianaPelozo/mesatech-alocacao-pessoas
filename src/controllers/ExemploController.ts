import {
Request,
Response
} from "express";

import User from "../models/userExemplo";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find()
    res.json(users)
}

export const createUsers = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newUser = new User({name});
    const savedUser = await newUser.save();
    res.json(savedUser);
}