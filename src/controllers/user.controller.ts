import { Request, Response } from "express";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    
    const newUser = await userServices.create(res.locals.validatedData);
    
    
    return res.status(201).json(newUser);
  };

export default { create };