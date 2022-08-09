import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
        next();
    } catch (err) {
        res.status(401);
        res.json('acess denied token not valid');
    }
};

export default verifyAuthToken;
