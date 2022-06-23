namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public CategoryType CategoryType { get; set; }
        public List<Category> SubCategories { get; set; }
    }
}