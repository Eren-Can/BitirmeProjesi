interface QuizDetailResponse {
    correctCount: number;
    wrongCount: number;
    totalStudentCount: number;
    entryStudentCount: number;
    studentsDetail: Array<QuizStudentDetailDto>;
}

interface QuizStudentDetailDto {
    id: string;
    fullName: string;
    correctCount: number;
    wrongCount: number;
}

export default QuizDetailResponse;