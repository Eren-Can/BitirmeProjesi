using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Results.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly IResultService _resultService;

    public ResultsController(IResultService resultService)
    {
        _resultService = resultService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Student)]
    [HttpPost("AddResult")]
    public async Task<IActionResult> AddResult([FromBody] AddResultRequest request)
    {
        var result = await _resultService.AddResult(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
