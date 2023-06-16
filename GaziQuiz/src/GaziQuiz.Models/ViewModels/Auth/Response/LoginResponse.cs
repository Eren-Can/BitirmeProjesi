namespace GaziQuiz.Models.ViewModels.Auth.Response;

public class LoginResponse
{
    public string Email { get; init; } = string.Empty;
    public string FullName { get; init; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;

}
