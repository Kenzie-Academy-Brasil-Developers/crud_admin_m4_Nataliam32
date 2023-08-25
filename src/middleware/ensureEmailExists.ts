import { Request, Response, NextFunction } from "express";
import { User, UserQueryResult } from "../interfaces";
import { AppError } from "../error";
import { client } from "../database";

const ensureEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { email } = req.body;
    const queryResult: UserQueryResult = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    const userEmail: User = queryResult.rows[0];

    if(userEmail) {
        throw new AppError("Email already registered", 409);
    };

    return next();
};

export default ensureEmailExists;