import { Request, Response } from 'express';
import { User, UserFront } from './../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const store = new UserFront();

export const index = async (_req: Request, res: Response): Promise<void> => {
    const users = await store.index();
    res.json(users);
};

export const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as jwt.Secret
        );
        res.json(token);
    } catch (e) {
        res.status(400);
        res.json(`${e}, ${user}`);
    }
};

export const authenticate = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await store.authenticate(email, password);
        if (user == null) {
            res.status(400);
            res.json('email or password not correct');
            return;
        }
        const token = jwt.sign(
            { user: user },
            process.env.TOKEN_SECRET as jwt.Secret
        );
        res.json(token);
    } catch (e) {
        res.status(400);
        res.json(`${e}`);
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as unknown as number;
    try {
        const user = await store.show(id as number);
        res.json(user);
    } catch (e) {
        res.status(400);
        res.json(`${id} ${e}`);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: req.params.id as unknown as number,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const newUser = await store.update(user);
        res.json(newUser);
    } catch (e) {
        res.status(400);
        res.json(`${e}, ${user}`);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = req.params.id as unknown as number;
    try {
        const user = await store.delete(id);
        res.json(user);
    } catch (e) {
        res.status(400);
        res.json(`${id} ${e}`);
    }
};
