import express, { Application, json } from 'express'
import { userRouter } from './routers/user.router';
import { sessionRouter } from './routers/session.router';
import { courseRouter } from './routers/course.router';
import { handleErrors } from './error';

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(handleErrors);

export default app;
