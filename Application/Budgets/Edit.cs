using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Budget Budget { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var budget = await _context.Budgets.FindAsync(request.Budget.Id);

                _mapper.Map(request.Budget, budget);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}