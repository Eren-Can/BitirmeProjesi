using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Lessons.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class LessonsController : ControllerBase
{
    private readonly ILessonService _lessonService;

    public LessonsController(ILessonService lessonService)
    {
        _lessonService = lessonService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Teacher)]
    [HttpPost("AddLesson")]
    public async Task<IActionResult> AddLesson([FromBody] AddLessonRequest request)
    {
        var result = await _lessonService.AddLesson(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Teacher)]
    [HttpPost("AddStudentsToLesson")]
    public async Task<IActionResult> AddStudentsToLesson([FromBody] AddStudentsToLessonRequest request)
    {
        var result = await _lessonService.AddStudentsToLesson(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet]
    public async Task<IActionResult> ListByTeacherId()
    {
        var result = await _lessonService.ListByTeacherId(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
