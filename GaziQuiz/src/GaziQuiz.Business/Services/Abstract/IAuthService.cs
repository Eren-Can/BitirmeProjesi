using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Auth.Request;
using GaziQuiz.Models.ViewModels.Auth.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface IAuthService
{
    Task<ResponseModel<LoginResponse>> StudentRegister(StudentRegisterRequest request);
    Task<ResponseModel<LoginResponse>> TeachertRegister(TeacherRegisterRequest request);
    Task<ResponseModel<LoginResponse>> Login(LoginRequest request);
    Task<ResponseModel<UserInfoResponse>> GetUserInfoById(string userId);
}
