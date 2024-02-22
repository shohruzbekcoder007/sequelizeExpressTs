import { Request, Response } from "express";
import _ from 'lodash'
import { User } from "../models";

export const createUser = (
    async (req: Request, res: Response) => {
        const newUser = User.build(_.pick(req.body, ['firstName', 'lastName', 'email']))
        return await newUser.save()
    } 
)