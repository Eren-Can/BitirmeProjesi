using GaziQuiz.DataAccess.UnitOfWork;

namespace GaziQuiz.Business.Services;

public abstract class BaseService
{
    protected readonly IRepositoryManager _repositoryManager;

    public BaseService(IRepositoryManager repositoryManager)
    {
        _repositoryManager = repositoryManager;
    }
}
