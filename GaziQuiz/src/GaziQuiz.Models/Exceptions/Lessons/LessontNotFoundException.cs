using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Lessons;

public class LessontNotFoundException : NotFoundException
{
    public LessontNotFoundException(string id) : base($"The lesson with id : {id} could not found.")
    {

    }
}
