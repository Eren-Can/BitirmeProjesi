import { getRequest, postRequest } from '../core/services/request';
import LoginRequest from '../models/auth/request/LoginRequest';
import StudentRegisterRequest from '../models/auth/request/StudentRegisterRequest';
import TeacherRegisterRequest from '../models/auth/request/TeacherRegisterRequest';
import LoginResponse from '../models/auth/response/LoginResponse';
import UserInfoResponse from '../models/user/response/UserInfoResponse';

export const loginService = (data: LoginRequest) =>
    postRequest<LoginRequest, LoginResponse>({
        url: '/auth/Login',
        data,
        isAuth: false,
    });

export const getUserInfoService = () =>
    getRequest<UserInfoResponse>({
        url: '/auth/userInfo',
    });

export const studentRegisterService = (data: StudentRegisterRequest) =>
    postRequest<StudentRegisterRequest, LoginResponse>({
        url: '/auth/StudentRegister',
        data,
        isAuth: false,
    });

export const teacherRegisterService = (data: TeacherRegisterRequest) =>
    postRequest<TeacherRegisterRequest, LoginResponse>({
        url: '/auth/TeacherRegister',
        data,
        isAuth: false,
    });
