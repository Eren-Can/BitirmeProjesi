using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Auth.Request;

namespace GaziQuiz.Business.Mapper;

public static class StudentMapper
{
    public static Student StudentRegisterRequestToStudent(StudentRegisterRequest source)
    {
        return new Student
        {
            Id = Guid.NewGuid().ToString(),
            CreatedDate = DateTime.Now,
            IsActive = true,
            UserName = source.Email.Split("@").First(),
            FullName = source.FullName,
            Email = source.Email,
            SchoolNumber = source.SchoolNumber,
        };
    }
}
