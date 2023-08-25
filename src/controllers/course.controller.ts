import { Request, Response } from "express";
import { courseServices } from "../services";
import { CourseRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const newCourse = await courseServices.create(req.body);

    return res.status(201).json(newCourse);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
    const course: CourseRead = await courseServices.retrieve();

    return res.status(200).json(course);
};

const addUsersToCourses = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params;

    await courseServices.addUsersToCourses(courseId, userId);

    return res.status(201).json({ message: "User successfully vinculed to course" });
};

const listUsersInCourses = async (req: Request, res: Response): Promise<Response> => {
    const usersInCourse = await courseServices.listUsersInCourses(+req.params.id);
    return res.status(200).json(usersInCourse);
};

const destroyUserCourses = async (req: Request, res: Response): Promise<Response> => {
    await courseServices.destroyUserCourses(+req.params.courseId, +req.params.userId);
    return res.status(204).json();
};

export default { create, retrieve, addUsersToCourses, listUsersInCourses, destroyUserCourses };