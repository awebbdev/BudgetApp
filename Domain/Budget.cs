namespace Domain;

public class Budget
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateModified { get; set; }
    public string Owner { get; set; }
    public List<Category> Categories { get; set; }
    public List<Account> Accounts { get; set; }
}