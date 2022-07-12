import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store'
import BudgetList from './BudgetList'

export default observer(function BudgetDashboard() {
    const {budgetStore} = useStore();
    const {loadBudgets, budgetRegistry} = budgetStore;
  
    useEffect(() => {
        if(budgetRegistry.size <= 1)
            loadBudgets();
    }, [budgetRegistry.size, loadBudgets])
  
    if (budgetStore.loadingInitial) return <LoadingComponent content='Loading App' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <BudgetList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Budget Filters</h2>
            </Grid.Column>
        </Grid>
    )
});