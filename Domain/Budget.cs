namespace Domain;

public class Budget
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Category> Categories { get; set; }
    public List<Account> Accounts { get; set; }
}