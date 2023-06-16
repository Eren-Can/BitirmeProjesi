namespace CorePackages.Utilities.Results;

public static class Response
{
    public static ResponseModel Success(string message = "")
    {
        return new ResponseModel
        {
            Data = default,
            Message = message,
            Success = true
        };
    }

    public static ResponseModel Error(string message = "")
    {
        return new ResponseModel
        {
            Data = default,
            Message = message,
            Success = false
        };
    }
}