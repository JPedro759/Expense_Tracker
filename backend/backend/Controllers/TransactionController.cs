using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionController : ControllerBase
{
    public TransactionController(Context context)
    {
        Context = context;
    }

    public Context Context { get; set; }

    [HttpPost("Upsert")]
    public async Task<IActionResult> Upsert(Transaction transaction)
    {
        transaction.CreatedOn = DateTime.Now;

        Context.Transactions.Update(transaction);
        await Context.SaveChangesAsync();

        return Ok(transaction);
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAll()
    {
        var transaction = await Context.Transactions.OrderBy(t => t.Id).ToListAsync();

        return Ok(transaction);
    }
}
