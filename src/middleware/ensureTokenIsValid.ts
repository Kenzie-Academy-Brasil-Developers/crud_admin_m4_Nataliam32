import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

const ensureTokenIsValid = (req: Request, res: Response, next: NextFunction): Response | void => {
    let token = req.headers.authorization;

    if(!token) {
        throw new AppError("Missing bearer token", 401);
    };

    token = token.split(" ")[1];

    verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error) {
            throw new AppError(error.message, 401);
        };
        res.locals = {...res.locals, decoded};
    });

    return next();
};

export default ensureTokenIsValid;
