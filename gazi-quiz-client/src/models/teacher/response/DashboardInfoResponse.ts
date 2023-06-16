interface DashboardInfoResponse {
    lessonCount: number;
    questionCount: number;
    topicCount: number;
    quizCount: number;
    lessonDetails: Array<LessonInfo>;
}

interface LessonInfo {
    lessonId: string;
    lessonName: string;
    questionCount: number;
    topicCount: number;
    quizCount: number;
}

export default DashboardInfoResponse;