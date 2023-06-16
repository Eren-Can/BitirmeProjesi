import { getRequest, postRequest } from '../core/services/request';
import AddQuizRequest from '../models/quiz/request/AddQuizRequest';
import AddStudentToQuizRequest from '../models/quiz/request/AddStudentToQuizRequest';
import ActiveQuizResponse from '../models/quiz/response/ActiveQuizResponse';
import InfoQuizResponse from '../models/quiz/response/InfoQuizResponse';
import QuizDetailResponse from '../models/quiz/response/QuizDetailResponse';
import QuizTableInfoResponse from '../models/quiz/response/QuizTableInfoResponse';

export const addQuizService = (data: AddQuizRequest) =>
    postRequest<AddQuizRequest, null>({
        url: '/quizs/AddQuiz',
        data,
    });

export const addStudentToQuizService = (data: AddStudentToQuizRequest) =>
    postRequest<AddStudentToQuizRequest, InfoQuizResponse>({
        url: '/quizs/AddStudentToQuiz',
        data,
    });

export const listActiveQuizsService = () =>
    getRequest<Array<ActiveQuizResponse>>({
        url: '/quizs/ListActiveQuiz',
    });

export const listQuizsByTeacher = () =>
    getRequest<Array<QuizTableInfoResponse>>({
        url: '/quizs/ListByTeacher',
    });

export const quizDetailService = (quizId: string) =>
    getRequest<QuizDetailResponse>({
        url: `/quizs/QuizDetails/${quizId}`,
    });
