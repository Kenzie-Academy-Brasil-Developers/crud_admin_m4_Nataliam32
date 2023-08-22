import { hash } from "bcryptjs";
import { UserCreate, UserQueryResult, UserReturn } from "../interfaces";
import format from "pg-format";
import { client } from "../database";
import { userWithNoPassword } from "../schemas";

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

export default { create };