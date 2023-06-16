using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Questions;

public class QuestionNotFoundException : NotFoundException
{
    public QuestionNotFoundException(string id) : base($"The question with id : {id} could not found.")
    {

    }
}