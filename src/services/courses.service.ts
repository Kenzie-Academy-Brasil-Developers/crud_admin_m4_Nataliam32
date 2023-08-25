import format from "pg-format";
import { Course, CourseCreate, CourseQueryResult, CourseRead, UserCourseCostumized, UserCourseResult, UserQueryResult } from "../interfaces";
import { client } from "../database";
import { courseSchemaRead } from "../schemas";
import { AppError } from "../error";

const create = async (payload: CourseCreate): Promise<Course> => {
    const queryString: string = format(
        `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: CourseQueryResult = await client.query(queryString);

    return queryResult.rows[0];
};

const retrieve = async (): Promise<CourseRead> => {
    const queryResult: CourseQueryResult = await client.query(`SELECT * FROM courses;`);

    return courseSchemaRead.parse(queryResult.rows);
};

const addUsersToCourses = async (courseId: string, userId: string): Promise<void> => {
    const queryResultUser: UserQueryResult = await client.query(`SELECT id FROM users WHERE id = $1;`, [userId]);

    const queryResultCourse: UserCourseResult = await client.query(`SELECT id FROM courses WHERE id = $1;`, [courseId]);

    if(queryResultUser.rowCount > 0 && queryResultCourse.rowCount > 0){
        await client.query(
            `INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2);`, 
            [courseId, userId]
        )
    } else {
        throw new AppError("User/course not found", 404)
    };
};

const listUsersInCourses = async(payload: number): Promise<UserCourseCostumized[]> => {
    const queryString: string =  `SELECT
        uc."userId" AS "userId",
        u.name AS "userName",
        uc."courseId" AS "courseId",
        c.name AS "courseName", 
        c.description AS "courseDescription", 
        uc.active AS "userActiveInCourse"
    FROM
        "userCourses" AS uc
    LEFT JOIN
        courses AS c ON c.id = uc."courseId"
    INNER JOIN
        users AS u ON u.id = uc."userId"
    WHERE
        "courseId" = $1;`;
    
    const queryResult = await client.query(queryString, [payload]);

    return queryResult.rows;
};

const destroyUserCourses = async (courseId: number, userId: number): Promise<void> => {
    const queryResultUser: UserQueryResult = await client.query(`SELECT id FROM users WHERE id = $1`, [userId]);
    const queryResultCourse: UserCourseResult = await client.query(`SELECT id FROM courses WHERE id = $1`, [courseId]);
    
    if(queryResultUser.rowCount > 0 && queryResultCourse.rowCount > 0){
        await client.query(
            ` UPDATE "userCourses" SET active=false WHERE "courseId" = $1 AND "userId" = $2;`, [courseId, userId]
        )
    } else {
        throw new AppError("User/course not found", 404);
    } 
};

export default { create, retrieve, addUsersToCourses, listUsersInCourses, destroyUserCourses };