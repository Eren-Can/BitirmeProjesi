using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Quizs;

public class TimeOutException : BadRequestException
{
    public TimeOutException(string id) : base($"The quiz with id : {id} time out.")
    {

    }
}