using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Topics.Request;
using GaziQuiz.Models.ViewModels.Topics.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface ITopicService
{
    Task<ResponseModel> AddTopic(AddTopicRequest request, string teacherId);
    Task<ResponseModel<ICollection<TopicInfoResponse>>> ListTopicsByTeacher(string teacherId);
    Task<ResponseModel<ICollection<TopicInfoResponse>>> ListTopicsByLesson(string lessonId);
}
