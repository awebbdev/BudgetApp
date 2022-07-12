import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Budget } from "../models/budget";

export default class BudgetStore {
    budgetRegistry = new Map<string, Budget>();
    selectedBudget: Budget | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);        
    }

    get budgetsByCreatedDate() {
        return Array.from(this.budgetRegistry.values())
                    .sort((a,b) => Date.parse(a.dateCreated.toString()) - Date.parse(b.dateCreated.toString()))
    }

    loadBudgets = async () => {
        this.setLoadingInitial(true);
        try {
            const budgets = await agent.Budgets.list();
            budgets.forEach(budget => {
                this.setBudget(budget);
            });
            this.setLoadingInitial(false);
        }
        catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBudget = async (id:string) => {
        let budget = this.getBudget(id);
        if(budget) {
            this.selectedBudget = budget;
            return budget;
        } else {
            this.setLoadingInitial(true);
            try {
                budget = await agent.Budgets.details(id);
                this.setBudget(budget);
                runInAction(() => {
                    this.selectedBudget = budget;
                });
                this.setLoadingInitial(false);
                return budget;
            } catch (error) {
                this.setLoadingInitial(false);
                console.log(error);
            }
        }
    }

    private setBudget(budget: Budget) {
        this.budgetRegistry.set(budget.id, budget);
    }

    private getBudget = (id: string) => {
        return this.budgetRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBudget = async (budget: Budget) => {
        this.loading = true;
        try{
            await agent.Budgets.create(budget);
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget);
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction( () => {
                this.loading = false;
            })
        }
    }

    updateBudget = async (budget: Budget) => {
        this.loading = true;
        try{
            await agent.Budgets.update(budget);
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget);
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction( () => {
                this.loading = false;
            })
        }
    }

    deleteBudget = async (id: string) => {
        this.loading = true;
        try{
            await agent.Budgets.delete(id);
            runInAction(() => {
                this.budgetRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction( () => {
                this.loading = false;
            })
        }
    }
}