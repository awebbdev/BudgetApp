import { observer } from 'mobx-react-lite';
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import BudgetDetails from '../details/BudgetDetails'
import BudgetForm from '../form/BudgetForm'
import BudgetList from './BudgetList'

export default observer(function BudgetDashboard() {
    const {budgetStore} = useStore();
    const{selectedBudget, editMode} = budgetStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList />
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedBudget && !editMode &&
                <BudgetDetails />}
                {editMode &&
                <BudgetForm />}
            </Grid.Column>
        </Grid>
    )
});