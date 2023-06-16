using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.ViewModels.Auth.Request;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.Login(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpGet("UserInfo")]
    public async Task<IActionResult> GetUserInfoById()
    {
        var result = await _authService.GetUserInfoById(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost("StudentRegister")]
    public async Task<IActionResult> StudentRegister([FromBody] StudentRegisterRequest request)
    {
        var result = await _authService.StudentRegister(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost("TeacherRegister")]
    public async Task<IActionResult> TeacherRegister([FromBody] TeacherRegisterRequest request)
    {
        var result = await _authService.TeachertRegister(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
