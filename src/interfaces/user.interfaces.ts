import { z } from "zod";
import { userReadSchema, userSchema, userSchemaCreate, userWithNoPassword } from "../schemas";
import { QueryResult } from "pg";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userSchemaCreate>;
type UserReturn = z.infer<typeof userWithNoPassword>;
type UserRead = z.infer<typeof userReadSchema>;
type UserQueryResult = QueryResult<User>;

export { User, UserCreate, UserReturn, UserRead, UserQueryResult };