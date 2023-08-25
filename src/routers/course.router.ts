import { Router } from "express";
import { courseController } from "../controllers";
import { ensureDataIsValid, ensureIsAdminToken, ensureTokenIsValid } from "../middleware";
import { courseSchemaCreate } from "../schemas";

const courseRouter: Router = Router();

courseRouter.post("", ensureTokenIsValid, ensureIsAdminToken, ensureDataIsValid(courseSchemaCreate), courseController.create);
courseRouter.post("/:courseId/users/:userId", ensureTokenIsValid, ensureIsAdminToken, courseController.addUsersToCourses);
courseRouter.get("", courseController.retrieve);
courseRouter.get("/:id/users", ensureTokenIsValid, ensureIsAdminToken, courseController.listUsersInCourses);
courseRouter.delete("/:courseId/users/:userId", ensureTokenIsValid, ensureIsAdminToken, courseController.destroyUserCourses)

export { courseRouter };