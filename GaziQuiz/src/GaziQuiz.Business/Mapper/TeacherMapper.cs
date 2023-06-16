using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Auth.Request;

namespace GaziQuiz.Business.Mapper;

public static class TeacherMapper
{
    public static Teacher TeacherRegisterRequestToTeacher(TeacherRegisterRequest source)
    {
        return new Teacher
        {
            Id = Guid.NewGuid().ToString(),
            CreatedDate = DateTime.Now,
            IsActive = true,
            UserName = source.Email.Split("@").First(),
            FullName = source.FullName,
            Email = source.Email,
        };
    }
}
