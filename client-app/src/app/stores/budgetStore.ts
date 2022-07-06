import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Budget } from "../models/budget";
import { v4 as uuid } from 'uuid';

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
                this.budgetRegistry.set(budget.id, budget);
            });
            this.setLoadingInitial(false);
        }
        catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectBudget = (id: string) => {
        this.selectedBudget = this.budgetRegistry.get(id);
    }

    cancelSelectedBudget = () => {
        this.selectedBudget = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectBudget(id) : this.cancelSelectedBudget();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createBudget = async (budget: Budget) => {
        this.loading = true;
        budget.id = uuid();
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
                if(this.selectedBudget?.id === id ) this.cancelSelectedBudget();
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