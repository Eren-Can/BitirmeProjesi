interface AddResultRequest {
    quizId: string;
    totalTime: number;
    answers: Array<AddAnswer>;
}

export interface AddAnswer {
    questionId: string;
    time: number;
    reply: string;
}

export default AddResultRequest;
