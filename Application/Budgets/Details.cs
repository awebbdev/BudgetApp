using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Details
    {
        public class Query : IRequest<Budget>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Budget>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Budget> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Budgets.FindAsync(request.Id);
            }
        }
    }
}