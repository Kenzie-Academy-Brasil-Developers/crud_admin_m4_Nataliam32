import sessionService from "../services/session.service";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
    const token = await sessionService.create(res.locals.validatedData);

    return res.status(200).json({ token });
}

export default { create };