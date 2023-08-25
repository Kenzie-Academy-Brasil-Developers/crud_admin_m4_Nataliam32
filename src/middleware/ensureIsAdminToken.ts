import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureIsAdminToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { admin } = res.locals.decoded;

    if(!admin) {
        throw new AppError("Insufficient permission", 403);
    };

    return next();
};

export default ensureIsAdminToken; 