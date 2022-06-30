using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Budgets.Any()) return;

            var budget = new List<Budget>
            {
                new Budget
                {
                    Name = "Starter Budget",
                    Description = "The budget to learn how to budget",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Owner = "Starter User",
                    Categories = new List<Category>{
                        new Category{
                            Name = "Income",
                            Balance = 0m,
                            CategoryType = CategoryType.Major,
                            SubCategories = new List<Category>{
                                new Category {
                                    Name = "ToBeBudgeted",
                                    Balance = 0m,
                                    CategoryType = CategoryType.Minor
                                },
                                new Category {
                                    Name = "ForDebtPayment",
                                    Balance = 0m,
                                    CategoryType = CategoryType.Minor
                                }
                            }
                        },
                        new Category {
                            Name = "Expense",
                            Balance = 0m,
                            CategoryType = CategoryType.Major,
                            SubCategories = new List<Category>{
                                new Category {
                                    Name = "Groceries",
                                    Balance = 0m,
                                    CategoryType = CategoryType.Minor
                                },
                                new Category {
                                    Name = "Transportation",
                                    Balance = 0m,
                                    CategoryType = CategoryType.Minor
                                }
                            }
                        }
                    },
                    Accounts = new List<Account> {
                        new Account {
                            Name = "Account 1",
                            Number = 10001,
                            Balance = 0m,
                            Transactions = new List<Transaction>()
                        },
                        new Account {
                            Name = "Account 2",
                            Number = 10002,
                            Balance = 0m,
                            Transactions = new List<Transaction>()
                        },
                        new Account {
                            Name = "Account 3",
                            Number = 10003,
                            Balance = 0m,
                            Transactions = new List<Transaction>()
                        },
                        new Account {
                            Name = "Account 4",
                            Number = 10004,
                            Balance = 0m,
                            Transactions = new List<Transaction>()
                        }
                    }
                }
            };
            
            await context.Budgets.AddRangeAsync(budget);
            await context.SaveChangesAsync();
        }
    }
}