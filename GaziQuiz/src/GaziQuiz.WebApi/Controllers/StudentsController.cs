using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Business.Services.Concrete;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Topics.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("ListRegister/{lessonId}")]
    public async Task<IActionResult> ListRegister([FromRoute(Name = "lessonId")] string lessonId)
    {
        var result = await _studentService.ListStudentsByLesson(lessonId, true);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("ListUnregister/{lessonId}")]
    public async Task<IActionResult> ListUnregister([FromRoute(Name = "lessonId")] string lessonId)
    {
        var result = await _studentService.ListStudentsByLesson(lessonId, false);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
