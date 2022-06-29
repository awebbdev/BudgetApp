import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget'
import BudgetList from './BudgetList'

interface Props {
    budgets: Budget[]
}

export default function BudgetDashboard({budgets}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList budgets={budgets} />
            </Grid.Column>
        </Grid>
    )
}