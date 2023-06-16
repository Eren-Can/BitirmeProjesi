using CorePackages.Exceptions;

namespace GaziQuiz.Models.Exceptions.Users;

public class RefreshTokenBadRequestException : BadRequestException
{
    public RefreshTokenBadRequestException() : base("Invalid client request. The request data has some invalid values.")
    {

    }
}
