using CorePackages.Filters;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.ViewModels.Topics.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GaziQuiz.WebApi.Controllers;

#nullable disable

[Route("api/[controller]")]
[ApiController]
public class TopicsController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicsController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Teacher)]
    [HttpPost("AddTopic")]
    public async Task<IActionResult> AddTopic([FromBody] AddTopicRequest request)
    {
        var result = await _topicService.AddTopic(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet]
    public async Task<IActionResult> ListTopicsByTeacher()
    {
        var result = await _topicService.ListTopicsByTeacher(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Teacher)]
    [HttpGet("{lessonId}")]
    public async Task<IActionResult> ListTopicsByLessonId([FromRoute(Name = "lessonId")] string lessonId)
    {
        var result = await _topicService.ListTopicsByLesson(lessonId);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
