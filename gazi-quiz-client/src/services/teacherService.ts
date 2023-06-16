import { getRequest } from "../core/services/request";
import DashboardInfoResponse from "../models/teacher/response/DashboardInfoResponse";

export const dashboardInfoService = () =>
    getRequest<DashboardInfoResponse>({
        url: `/teachers/dashboard/`,
    });
