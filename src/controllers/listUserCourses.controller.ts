import { Request, Response } from "express";
import listUserCoursesService from "../services/listUserCourses.service";

const list = async (req: Request, res: Response): Promise<Response> => {
    const userCourses = await listUserCoursesService.list(req.params.id);
    return res.status(200).json(userCourses);
};

export default { list }