using System.ComponentModel.DataAnnotations;

namespace CorePackages.Models.ViewModels.Request;

public class PaginationRequest
{
    [Range(0, int.MaxValue)]
    public int PageSize { get; init; } = 10;

    [Range(0, int.MaxValue)]
    public int PageNumber { get; init; } = 1;
}