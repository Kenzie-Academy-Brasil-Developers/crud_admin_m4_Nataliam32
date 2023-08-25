import { Request, Response } from "express";
import { userServices } from "../services";
import { UserRead } from "../interfaces";
import { userReadSchema } from "../schemas";

const create = async (req: Request, res: Response): Promise<Response> => {
    
    const newUser = await userServices.create(res.locals.validatedData);
    
    
    return res.status(201).json(newUser);

  };

  const retrieve = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await userServices.retrieve();

    return res.status(200).json(users);

  }

export default { create, retrieve };