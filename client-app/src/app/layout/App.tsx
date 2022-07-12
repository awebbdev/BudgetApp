import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";
import { observer } from 'mobx-react-lite'
import { Route, useLocation } from "react-router-dom";
import BudgetForm from "../../features/budgets/form/BudgetForm";
import HomePage from "../../features/home/homepage";
import BudgetDetails from "../../features/budgets/details/BudgetDetails";

function App() {

  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className="dashboardContainer">
                      <Route exact path='/budgets' component={BudgetDashboard} />
                      <Route path='/budgets/:id' component={BudgetDetails} />
                      <Route key={location.key} path={['/createBudget', '/manage/:id']} component={BudgetForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
