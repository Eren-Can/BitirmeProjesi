using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Teachers.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface ITeacherService
{
    Task<ResponseModel<DashboardInfoResponse>> DashboardInfo(string teacherId);
}
