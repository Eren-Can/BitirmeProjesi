using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class TeachersController : ControllerBase
{
    private readonly ITeacherService _teacherService;

    public TeachersController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("dashboard")]
    public async Task<IActionResult> DashboardInfo()
    {
        var result = await _teacherService.DashboardInfo(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

}
