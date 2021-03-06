namespace Domain;
public class Transaction
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public Category Category { get; set; }
    public DateTime Date { get; set; }
}
