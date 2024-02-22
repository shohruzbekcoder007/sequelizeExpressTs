import { Request, Response } from "express";
import _ from 'lodash'
import { User } from "../models";
import bcrypt from "bcryptjs"
import { createUserValidator, loginValidator } from "../validations/user";

type UserType = {
    firstName?: string,
    lastName?: string,
    email: string,
    middleName?: string,
    address?: string,
    password: string
}

export const createUser = (
    async (req: Request, res: Response) => {

        let reqUser: UserType = _.pick(req.body, ['firstName', 'lastName', 'email', 'middleName', 'address', 'password'])
        const salt = await bcrypt.genSalt();
        reqUser.password = await bcrypt.hash(reqUser.password, salt);

        const { error } = createUserValidator(reqUser);
        if (error)
            return res.status(400).send(error.details[0].message);


        const newUser = User.build(reqUser);
        const new_user = await newUser.save()

        return res.send(new_user)
    }
)

export const loginUser = (
    async (req: Request, res: Response) => {

        let reqUser: UserType = _.pick(req.body, ['email', 'password'])

        const { error } = loginValidator(reqUser);
        if (error)
            return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ where: { email: reqUser.email } });
        if (!user)
            return res.status(400).send('Email yoki parol noto\'g\'ri');


        const isValidPassword = await bcrypt.compare(reqUser.password, user.password);
        if (!isValidPassword)
            return res.status(400).send('Email yoki parol noto\'g\'ri');

        return res.send(user)
    }
)