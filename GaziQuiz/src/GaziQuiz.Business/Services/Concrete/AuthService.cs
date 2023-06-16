using CorePackages.Utilities.Results;
using GaziQuiz.Business.Mapper;
using GaziQuiz.Business.Security;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Models.Constants;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Exceptions.Users;
using GaziQuiz.Models.ViewModels.Auth.Request;
using GaziQuiz.Models.ViewModels.Auth.Response;
using Microsoft.AspNetCore.Identity;

namespace GaziQuiz.Business.Services.Concrete;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenHandler _tokenHandler;

    public AuthService(UserManager<User> userManager, ITokenHandler tokenHandler)
    {
        _userManager = userManager;
        _tokenHandler = tokenHandler;
    }

    public async Task<ResponseModel<LoginResponse>> StudentRegister(StudentRegisterRequest request)
    {
        var student = StudentMapper.StudentRegisterRequestToStudent(request);

        var createUserResult = await _userManager.CreateAsync(student, request.Password);

        if (!createUserResult.Succeeded)
            return DataResponse<LoginResponse>.Error(message: createUserResult.Errors.First().Description);

        var addRoleResult = await _userManager.AddToRolesAsync(student, new List<string> { Roles.Student });

        if (!addRoleResult.Succeeded)
            return DataResponse<LoginResponse>.Error(message: addRoleResult.Errors.First().Description);

        var loginResponse = await Login(new() { Email = request.Email, Password = request.Password, });

        return loginResponse;
    }

    public async Task<ResponseModel<LoginResponse>> TeachertRegister(TeacherRegisterRequest request)
    {
        var teacher = TeacherMapper.TeacherRegisterRequestToTeacher(request);

        var createUserResult = await _userManager.CreateAsync(teacher, request.Password);

        if (!createUserResult.Succeeded)
            return DataResponse<LoginResponse>.Error(message: createUserResult.Errors.First().Description);

        var addRoleResult = await _userManager.AddToRolesAsync(teacher, new List<string> { Roles.Teacher });

        if (!addRoleResult.Succeeded)
            return DataResponse<LoginResponse>.Error(message: addRoleResult.Errors.First().Description);

        var loginResponse = await Login(new() { Email = request.Email, Password = request.Password, });

        return loginResponse;
    }

    public async Task<ResponseModel<LoginResponse>> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        var result = (user != null && await _userManager.CheckPasswordAsync(user, request.Password));

        if (!result || user is null)
            throw new UserNotFoundException(request.Email);

        var roles = await _userManager.GetRolesAsync(user);

        var response = new LoginResponse
        {
            AccessToken = await _tokenHandler.CreateToken(user, true),
            Role = roles.First(),
            Email = user.Email,
            FullName = user.FullName,
        };

        return DataResponse<LoginResponse>.Success(response, "Successfully Login!");
    }

    public async Task<ResponseModel<UserInfoResponse>> GetUserInfoById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            throw new UserNotFoundException(userId);

        var roles = await _userManager.GetRolesAsync(user);

        var response = new UserInfoResponse
        {
            Role = roles.First(),
            Email = user.Email,
            FullName = user.FullName,
        };

        return DataResponse<UserInfoResponse>.Success(response, "User information has been retrieved.");
    }

}
