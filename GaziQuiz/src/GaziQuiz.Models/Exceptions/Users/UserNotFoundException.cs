using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Users;

public class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string email) : base($"The user with email : {email} could not found.")
    {

    }
}
