using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Quizs;

public class QuizNotFoundException : NotFoundException
{
    public QuizNotFoundException(string id) : base($"The quiz with id : {id} could not found.")
    {

    }
}
