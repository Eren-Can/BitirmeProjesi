using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class QuestionRepository : RepositoryBase<Question, GaziQuizDbContext>, IQuestionRepository
{
    public QuestionRepository(GaziQuizDbContext context) : base(context)
    {

    }
}
