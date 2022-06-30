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
}

export default function BudgetDashboard({
    budgets,
    selectedBudget,
    selectBudget,
    cancelSelectBudget
}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList budgets={budgets} selectBudget={selectBudget} />
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedBudget &&
                <BudgetDetails budget={selectedBudget} cancelSelectBudget={cancelSelectBudget} />}
                <BudgetForm />
            </Grid.Column>
        </Grid>
    )
}