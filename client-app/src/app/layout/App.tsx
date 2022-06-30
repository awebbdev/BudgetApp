import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Budget } from "../models/budget";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);

  useEffect(() => {
    axios.get<Budget[]>("http://localhost:5000/api/Budget").then((resp) => {
      setBudgets(resp.data);
    });
  }, []);

  function handleSelectBudget(id: string) {
    setSelectedBudget(budgets.find(b => b.id === id));
  }

  function handleCancelSelectBudget() {
    setSelectedBudget(undefined);
  }
  return (
    <div>
      <NavBar />
      <Container className="dashboardContainer">
        <BudgetDashboard 
          budgets={budgets}
          selectedBudget={selectedBudget}
          selectBudget={handleSelectBudget}
          cancelSelectBudget={handleCancelSelectBudget}
        />
      </Container>
    </div>
  );
}

export default App;
