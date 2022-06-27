using Application.Budgets;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Budget>>> GetBudgets()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudget(Guid id){
            return await mediator.Send(new Details.Query{Id = id});
        }
    }
}