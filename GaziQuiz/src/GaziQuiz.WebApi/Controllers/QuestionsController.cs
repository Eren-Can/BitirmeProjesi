using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Lessons.Request;
using GaziQuiz.Models.ViewModels.Questions.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionsController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Teacher)]
    [HttpPost("AddQuestion")]
    public async Task<IActionResult> AddLesson([FromBody] AddQuestionRequest request)
    {
        var result = await _questionService.AddQuestion(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
