import React from 'react'
import { Grid, List } from 'semantic-ui-react'
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
}

export default function BudgetDashboard({
    budgets,
    selectedBudget,
    selectBudget,
    cancelSelectBudget,
    editMode,
    openForm,
    closeForm
}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList budgets={budgets} selectBudget={selectBudget} />
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedBudget && !editMode &&
                <BudgetDetails 
                    budget={selectedBudget} 
                    cancelSelectBudget={cancelSelectBudget}
                    openForm={openForm}
                />}
                {editMode &&
                <BudgetForm closeForm={closeForm} budget={selectedBudget} />}
            </Grid.Column>
        </Grid>
    )
}