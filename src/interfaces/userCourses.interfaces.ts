import { z } from "zod";
import { userCourse, userCourseCostumizedRead, userCourseCreate, userCourseCustumized, userCourseRead } from "../schemas";
import { QueryResult } from "pg";

type UserCourse = z.infer<typeof userCourse>;
type UserCourseCreate = z.infer<typeof userCourseCreate>;
type UserCourseRead = z.infer<typeof userCourseRead>;
type UserCourseResult = QueryResult<UserCourse>;
type UserCourseCostumized = z.infer<typeof userCourseCustumized>;
type UserCourseCostumizedRead = z.infer<typeof userCourseCostumizedRead>;
type UserCourseCostumizedResult = QueryResult<UserCourseCostumized>;

export { UserCourse, UserCourseCreate, UserCourseRead, UserCourseResult, UserCourseCostumized, UserCourseCostumizedRead, UserCourseCostumizedResult };