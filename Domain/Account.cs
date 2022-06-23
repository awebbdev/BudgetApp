namespace Domain
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long Number { get; set; }
        public decimal Balance { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}