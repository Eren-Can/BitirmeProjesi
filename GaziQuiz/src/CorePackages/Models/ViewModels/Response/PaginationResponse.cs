namespace CorePackages.Models.ViewModels.Response;

#nullable disable
public class PaginationResponse<T>
{
    public int CurrentPage { get; init; }
    public int TotalPage { get; init; }
    public int PageSize { get; init; }
    public int TotalCount { get; init; }
    public T Value { get; init; }

    public bool HasPrevious => CurrentPage > 1;
    public bool HasPage => CurrentPage < TotalPage;
}

