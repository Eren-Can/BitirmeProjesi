const paths = {
    base: '/',
    all: '*',
    login: '/login',
    studentRegister: '/studentRegister',
    teacherRegister: '/teacherRegister',
    unauthorized: '/unauthorized',
    student: {
        all: '/student/*',
        base: '/student',
        activeQuizs: '/activequizs',
        quiz: '/quiz',
        faq: '/faq',
    },
    teacher: {
        all: '/teacher/*',
        base: '/teacher',
        dashboard: '/dashboard',
        lesson: '/lesson',
        topic: '/topic',
        addQuestion: '/addquestion',
        addStudent: '/addstudent',
        studentList: '/studentlist',
        quizList: '/quizlist',
        quizDetail: '/quizdetail',
        addQuiz: '/addquiz',
    },
};

export default paths;
