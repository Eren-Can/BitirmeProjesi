import { postRequest } from '../core/services/request';
import AddQuestionRequest from '../models/question/request/AddQuestionRequest';

export const addQuestionService = (data: AddQuestionRequest) =>
    postRequest<AddQuestionRequest, null>({
        url: '/questions/AddQuestion',
        data,
    });
