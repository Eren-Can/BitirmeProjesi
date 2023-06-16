import { getRequest, postRequest } from '../core/services/request';
import AddTopicRequest from '../models/topic/request/AddTopicRequest';
import TopicInfoResponse from '../models/topic/response/TopicInfoResponse';

export const addTopicService = (data: AddTopicRequest) =>
    postRequest<AddTopicRequest, null>({
        url: '/topics/AddTopic',
        data,
    });

export const listTopicsByTeacher = () =>
    getRequest<Array<TopicInfoResponse>>({
        url: `/topics`,
    });

export const listTopicsByLesson = (lessonId: string) =>
    getRequest<Array<TopicInfoResponse>>({
        url: `/topics/${lessonId}`,
    });
