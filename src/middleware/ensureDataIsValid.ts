import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const validatedData: any = schema.parse(req.body);
    res.locals = {...res.locals, validatedData};
    
    return next();
  };

export default ensureDataIsValidMiddleware;