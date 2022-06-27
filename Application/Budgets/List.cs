using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Budgets
{
    public class List
    {
        public class Query : IRequest<List<Budget>>{}

        public class Handler : IRequestHandler<Query, List<Budget>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Budget>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Budgets.ToListAsync();
            }
        }
    }
}