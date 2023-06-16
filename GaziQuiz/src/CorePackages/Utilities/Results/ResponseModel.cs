namespace CorePackages.Utilities.Results;

#nullable disable
public class ResponseModel<T> : BaseResponseModel
{
    public T Data { get; set; }
}

public class ResponseModel : BaseResponseModel
{
    public Object Data { get; set; }
}
