interface AddQuizRequest {
    topicId: string;
    name: string;
    latitude: number;
    longitude: number;
    time: number;
    easyQuestionCount: number;
    midQuestionCount: number;
    hardQuestionCount: number;
}

export default AddQuizRequest;
