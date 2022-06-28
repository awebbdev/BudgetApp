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
        public async Task<ActionResult<Budget>> GetBudget(Guid id)
        {
            return await mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateBudget(Budget budget)
        {
            return Ok(await mediator.Send(new Create.Command { Budget = budget }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBudget(Guid id, Budget budget){
            budget.Id = id;
            return Ok(await mediator.Send(new Edit.Command {Budget = budget}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(Guid id){
            return Ok(await mediator.Send(new Delete.Command {Id = id}));
        }
    }
}