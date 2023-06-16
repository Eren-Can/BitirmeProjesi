using CorePackages.Utilities.Results;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Exceptions.Students;
using GaziQuiz.Models.ViewModels.Students.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace GaziQuiz.Business.Services.Concrete;

public class StudentService : BaseService, IStudentService
{
    public StudentService(IRepositoryManager repositoryManager) : base(repositoryManager)
    {
    }

    public async Task<Student> GetStudentById(string userId)
    {
        var student = await _repositoryManager.Student.SingleAsync(x => x.Id == userId);

        if (student is null)
            throw new StudentNotFoundException(userId);

        return student;
    }

    public async Task<ResponseModel<ICollection<StudentInfoResponse>>> ListStudentsByLesson(string lessonId, bool isRegister)
    {
        var studunts = isRegister 
            ? await _repositoryManager.Student
            .ListAll()
            .Include(x => x.Lessons)
            .Where(x => x.Lessons.Select(y => y.LessonId).Any(z => lessonId.Contains(z)))
            .Select(x => new StudentInfoResponse
            {
                Id = x.Id,
                Email = x.Email,
                FullName = x.FullName,
                SchoolNumber = x.SchoolNumber
            })
            .ToListAsync()
            : await _repositoryManager.Student
            .ListAll()
            .Include(x => x.Lessons)
            .Where(x => !x.Lessons.Select(y => y.LessonId).Any(z => lessonId.Contains(z)))
            .Select(x => new StudentInfoResponse
            {
                Id = x.Id,
                Email = x.Email,
                FullName = x.FullName,
                SchoolNumber = x.SchoolNumber
            })
            .ToListAsync();

        return DataResponse<ICollection<StudentInfoResponse>>.Success(studunts, "İlgili öğrenciler listelenmiştir.");
    }
}
