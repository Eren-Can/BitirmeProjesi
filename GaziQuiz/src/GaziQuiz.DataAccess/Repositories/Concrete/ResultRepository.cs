using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class ResultRepository : RepositoryBase<Result, GaziQuizDbContext>, IResultRepository
{
    public ResultRepository(GaziQuizDbContext context) : base(context)
    {

    }
}
