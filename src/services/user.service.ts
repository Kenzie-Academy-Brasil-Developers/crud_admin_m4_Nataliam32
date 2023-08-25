import { hash } from "bcryptjs";
import { UserCreate, UserQueryResult, UserRead, UserReturn } from "../interfaces";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userWithNoPassword } from "../schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    
    payload.password = await hash(payload.password, 10);

    const queryString: string = format(
        `INSERT INTO users (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: UserQueryResult = await client.query(queryString);

    return userWithNoPassword.parse(queryResult.rows[0]);
};

const retrieve = async (): Promise<UserRead> => {
    const queryResult: UserQueryResult = await client.query(`SELECT * FROM users;`);

    return userReadSchema.parse(queryResult.rows);
}
export default { create, retrieve };