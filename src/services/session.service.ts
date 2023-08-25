import { compare } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../error";
import { UserQueryResult } from "../interfaces";
import { SessionRequest } from "../interfaces/session.interfaces";
import { sign } from "jsonwebtoken";

const create = async (payload: SessionRequest): Promise<string> => {
    const queryString: string =  `SELECT * FROM users WHERE email = $1;`;

    const queryResult: UserQueryResult = await client.query(queryString, [payload.email]);

    if(queryResult.rowCount === 0){
        throw new AppError("Wrong email/password", 401);
    };

    const matchPassword: boolean = await compare(payload.password, queryResult.rows[0].password);

    if(!matchPassword){
        throw new AppError("Wrong email/password", 401);
    };

    const token: string = sign(
        {email: queryResult.rows[0].email},
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: queryResult.rows[0].id.toString()
        }
    );

    return token;

};

export default { create };