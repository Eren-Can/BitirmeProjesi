import { getRequest, postRequest } from '../core/services/request';
import AddLessonRequest from '../models/lesson/request/AddLessonRequest';
import AddStudentToLessonRequest from '../models/lesson/request/AddStudentToLessonRequest';
import LessonInfoResponse from '../models/lesson/response/LessonInfoResponse';

export const addLessonService = (data: AddLessonRequest) =>
    postRequest<AddLessonRequest, null>({
        url: '/lessons/AddLesson',
        data,
    });

export const addStudentToLessonService = (data: AddStudentToLessonRequest) =>
    postRequest<AddStudentToLessonRequest, null>({
        url: '/lessons/AddStudentsToLesson',
        data,
    });

export const listLessonByTeacherService = () =>
    getRequest<Array<LessonInfoResponse>>({
        url: '/lessons',
    });
