interface InfoQuizResponse {
    quizId: string;
    questions: Array<QuestionInfo>;
}

export interface QuestionInfo {
    questionId: string;
    difficulty: string;
    time: number;
    content: string;
}

export default InfoQuizResponse;
