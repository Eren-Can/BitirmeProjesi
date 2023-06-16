﻿using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class TopicRepository : RepositoryBase<Topic, GaziQuizDbContext>, ITopicRepository
{
    public TopicRepository(GaziQuizDbContext context) : base(context)
    {

    }
}
