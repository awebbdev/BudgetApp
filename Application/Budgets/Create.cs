using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Create
    {
        public class Command : IRequest
        {
            public Budget Budget { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Budgets.Add(request.Budget);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}