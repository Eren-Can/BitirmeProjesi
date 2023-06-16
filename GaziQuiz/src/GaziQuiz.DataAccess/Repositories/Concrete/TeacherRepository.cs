using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class TeacherRepository : RepositoryBase<Teacher, GaziQuizDbContext>, ITeacherRepository
{
    public TeacherRepository(GaziQuizDbContext context) : base(context)
    {

    }
}
