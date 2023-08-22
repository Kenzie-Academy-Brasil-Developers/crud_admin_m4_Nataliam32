import { Router } from "express";
import { ensureDataIsValid } from "../middleware";
import { sessionSchema } from "../schemas";
import { sessionController } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", ensureDataIsValid(sessionSchema), sessionController.create);

export { sessionRouter };