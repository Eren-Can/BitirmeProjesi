import { getRequest } from '../core/services/request';
import StudentInfoResponse from '../models/student/response/StudentInfoResponse';

export const listStudentsByRegisterLesson = (lessonId: string) =>
    getRequest<Array<StudentInfoResponse>>({
        url: `/students/ListRegister/${lessonId}`,
    });

export const listStudentsByUnregisterLesson = (lessonId: string) =>
    getRequest<Array<StudentInfoResponse>>({
        url: `/students/ListUnregister/${lessonId}`,
    });
