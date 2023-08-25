import { Router } from "express";
import { userController } from "../controllers";
import { userSchemaCreate } from "../schemas";
import { ensureDataIsValid, ensureEmailExists, ensureIsAdminToken, ensureTokenIsValid } from "../middleware";
import listUserCoursesController from "../controllers/listUserCourses.controller";

const userRouter: Router = Router();

userRouter.post("", ensureDataIsValid(userSchemaCreate), ensureEmailExists, userController.create);
userRouter.get("", ensureTokenIsValid, ensureIsAdminToken, userController.retrieve)
userRouter.get("/:id/courses", ensureTokenIsValid, ensureIsAdminToken, listUserCoursesController.list);

export { userRouter };



