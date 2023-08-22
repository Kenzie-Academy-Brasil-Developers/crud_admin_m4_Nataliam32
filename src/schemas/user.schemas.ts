import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    password: z.string().max(120),
    admin: z.boolean().default(false)
});

const userSchemaCreate = userSchema.omit({ id: true }).partial({ admin: true });
const userWithNoPassword = userSchema.omit({ password: true });
const userReadSchema = userWithNoPassword.array();

export { userSchema, userSchemaCreate, userWithNoPassword, userReadSchema };