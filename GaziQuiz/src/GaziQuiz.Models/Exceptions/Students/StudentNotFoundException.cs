using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Students;

public class StudentNotFoundException : NotFoundException
{
    public StudentNotFoundException(string id) : base($"The student with id : {id} could not found.")
    {

    }
}
