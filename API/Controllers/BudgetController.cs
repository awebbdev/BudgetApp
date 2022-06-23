using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {
        private readonly DataContext _context;

        public BudgetController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Budget>>> GetBudgets()
        {
            return await _context.Budget.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudget(Guid id){
            return await _context.Budget.FindAsync(id);
        }
    }
}