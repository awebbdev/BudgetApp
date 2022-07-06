import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";
import LoadingComponent from "./LoadingComponents";
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite'

function App() {
  const {budgetStore} = useStore();

  useEffect(() => {
    budgetStore.loadBudgets();
  }, [budgetStore])

  if (budgetStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <div>
      <NavBar />
      <Container className="dashboardContainer">
        <BudgetDashboard />
      </Container>
    </div>
  );
}

export default observer(App);
