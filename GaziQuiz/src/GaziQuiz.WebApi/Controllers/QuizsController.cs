using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Quizs.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class QuizsController : ControllerBase
{
    private readonly IQuizService _quizService;

    public QuizsController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Teacher)]
    [HttpPost("AddQuiz")]
    public async Task<IActionResult> AddQuiz([FromBody] AddQuizRequest request)
    {
        var result = await _quizService.AddQuiz(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Student)]
    [HttpPost("AddStudentToQuiz")]
    public async Task<IActionResult> AddStudentToQuiz([FromBody] AddStudentToQuizRequest request)
    {
        var result = await _quizService.AddStudentToQuiz(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Student)]
    [HttpGet("ListActiveQuiz")]
    public async Task<IActionResult> ListActiveQuizs()
    {
        var result = await _quizService.ListActiveQuizs(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("ListByTeacher")]
    public async Task<IActionResult> ListByTeacher()
    {
        var result = await _quizService.ListByTeacher(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("QuizDetails/{quizId}")]
    public async Task<IActionResult> QuizDetail([FromRoute(Name = "quizId")] string quizId)
    {
        var result = await _quizService.QuizDetail(quizId);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
