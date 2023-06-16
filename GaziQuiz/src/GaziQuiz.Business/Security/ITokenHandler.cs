using GaziQuiz.Models.Entities;
using System.Security.Claims;

namespace GaziQuiz.Business.Security;

public interface ITokenHandler
{
    Task<string> CreateToken(User user, bool populateExp);

    ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken);
}

