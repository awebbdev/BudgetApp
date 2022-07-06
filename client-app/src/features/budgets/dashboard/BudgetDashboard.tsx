import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget'
import BudgetDetails from '../details/BudgetDetails'
import BudgetForm from '../form/BudgetForm'
import BudgetList from './BudgetList'

interface Props {
    budgets: Budget[];
    selectedBudget: Budget | undefined;
    selectBudget: (id: string) => void;
    cancelSelectBudget: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (budget: Budget) => void;
    deleteBudget: (id: string) => void;
}

export default function BudgetDashboard({
    budgets,
    selectedBudget,
    selectBudget,
    cancelSelectBudget,
    editMode,
    openForm,
    closeForm,
    createOrEdit,
    deleteBudget
}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList budgets={budgets} selectBudget={selectBudget} deleteBudget={deleteBudget} />
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedBudget && !editMode &&
                <BudgetDetails 
                    budget={selectedBudget} 
                    cancelSelectBudget={cancelSelectBudget}
                    openForm={openForm}
                />}
                {editMode &&
                <BudgetForm closeForm={closeForm} budget={selectedBudget} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}