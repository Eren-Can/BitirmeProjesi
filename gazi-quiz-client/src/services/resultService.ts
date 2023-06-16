import { postRequest } from '../core/services/request';
import AddResultRequest from '../models/result/request/AddResultRequest';

export const addResultService = (data: AddResultRequest) =>
    postRequest<AddResultRequest, null>({
        url: `/results/AddResult`,
        data,
    });
