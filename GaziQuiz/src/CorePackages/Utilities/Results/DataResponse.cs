namespace CorePackages.Utilities.Results;

#nullable disable
public class DataResponse<T>
{
    public static ResponseModel<T> Success(T data, string message = "")
    {
        return new ResponseModel<T>
        {
            Data = data,
            Message = message,
            Success =  true
        };
    }

    public static ResponseModel<T> Error(T data = default, string message = "")
    {
        return new ResponseModel<T>
        {
            Data = data,
            Message = message,
            Success = false
        };
    }
}
