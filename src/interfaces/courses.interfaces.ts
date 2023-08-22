import { z } from "zod";
import { courseSchema, courseSchemaCreate, courseSchemaRead } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseSchemaCreate>;
type CourseRead = z.infer<typeof courseSchemaRead>;
type CourseQueryResult = QueryResult<Course>;

export { Course, CourseCreate, CourseRead, CourseQueryResult };