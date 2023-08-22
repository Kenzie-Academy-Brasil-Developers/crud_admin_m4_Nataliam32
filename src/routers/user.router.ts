import { Router } from "express";
import { userController } from "../controllers";
import { userSchemaCreate } from "../schemas";
import { ensureDataIsValid } from "../middleware";

const userRouter: Router = Router();

userRouter.post("", ensureDataIsValid(userSchemaCreate), userController.create);

export { userRouter };



