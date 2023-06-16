using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.DataAccess.Repositories.Concrete;

namespace GaziQuiz.DataAccess.UnitOfWork;

public class RepositoryManager : IRepositoryManager
{
    private readonly GaziQuizDbContext _context;
    private readonly Lazy<IAnswerRepository> _answerRepository;
    private readonly Lazy<ILessonRepository> _lessonRepository;
    private readonly Lazy<IQuestionRepository> _questionRepository;
    private readonly Lazy<IQuizRepository> _quizRepository;
    private readonly Lazy<IStudentRepository> _studentRepository;
    private readonly Lazy<ITeacherRepository> _teacherRepository;
    private readonly Lazy<IResultRepository> _resultRepository;
    private readonly Lazy<ITopicRepository> _topicRepository;

    public RepositoryManager(GaziQuizDbContext context)
    {
        _context = context;
        _answerRepository = new Lazy<IAnswerRepository>(() => new AnswerRepository(_context));
        _lessonRepository = new Lazy<ILessonRepository>(() => new LessonRepository(_context));
        _questionRepository = new Lazy<IQuestionRepository>(() => new QuestionRepository(_context));
        _quizRepository = new Lazy<IQuizRepository>(() => new QuizRepository(_context));
        _studentRepository = new Lazy<IStudentRepository>(() => new StudentRepository(_context));
        _teacherRepository = new Lazy<ITeacherRepository>(() => new TeacherRepository(_context));
        _resultRepository = new Lazy<IResultRepository>(() => new ResultRepository(_context));
        _topicRepository = new Lazy<ITopicRepository>(() => new TopicRepository(_context));
    }

    public IAnswerRepository Answer => _answerRepository.Value;
    public ILessonRepository Lesson => _lessonRepository.Value;
    public IQuestionRepository Question => _questionRepository.Value;
    public IQuizRepository Quiz => _quizRepository.Value;
    public IStudentRepository Student => _studentRepository.Value;
    public ITeacherRepository Teacher => _teacherRepository.Value;
    public IResultRepository Result => _resultRepository.Value;
    public ITopicRepository Topic => _topicRepository.Value;

    public Task SaveAsync() => _context.SaveChangesAsync(); 
}