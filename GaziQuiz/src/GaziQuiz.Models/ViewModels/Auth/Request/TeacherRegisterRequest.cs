using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Auth.Request;

public class TeacherRegisterRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string FullName { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    [EmailAddress(ErrorMessage = "Email Tipinde Olmalı")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    [MinLength(6, ErrorMessage = "En az 6 karakter içermelidir")]
    public string Password { get; init; } = string.Empty;
}


