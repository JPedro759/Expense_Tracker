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
        var transactions = await Context.Transactions.OrderBy(t => t.Id).ToListAsync();

        return Ok(transactions);
    }

    [HttpPut("Edit/{id}")]
    public async Task<IActionResult> Edit(int id, Transaction updatedTransaction)
    {
        var existingTransaction = await Context.Transactions.FirstOrDefaultAsync(t => t.Id == id);

        if (existingTransaction == null) return NotFound();

        existingTransaction.Date = updatedTransaction.Date;
        existingTransaction.Description = updatedTransaction.Description;
        existingTransaction.Amount = updatedTransaction.Amount;
        existingTransaction.Type = updatedTransaction.Type;
        existingTransaction.CreatedOn = DateTime.Now;

        await Context.SaveChangesAsync();

        return Ok(existingTransaction);
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var transaction = await Context.Transactions.FindAsync(id);

        if (transaction == null) return NotFound();

        Context.Transactions.Remove(transaction);
        await Context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("GetMonthlyTransactions")]
    public async Task<IActionResult> GetMonthlyTransactions()
    {
        var transactions = await Context.Transactions.ToListAsync();

        var monthlyTransactions = transactions.GroupBy(k => new {k.Date.Year, k.Date.Month},)

        return Ok();
    }

}
