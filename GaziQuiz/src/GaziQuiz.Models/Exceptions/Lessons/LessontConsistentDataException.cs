using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Lessons;

public class LessontConsistentDataException : BadRequestException
{
    public LessontConsistentDataException() : base($"Data is inconsistent!")
    {

    }
}
