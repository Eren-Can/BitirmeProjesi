using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class StudentRepository : RepositoryBase<Student, GaziQuizDbContext>, IStudentRepository
{
    public StudentRepository(GaziQuizDbContext context) : base(context)
    {

    }
}
