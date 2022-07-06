import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Budget } from "../models/budget";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

  function handleFormOpen(id?: string) {
    id ? handleSelectBudget(id) : handleCancelSelectBudget();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditBudget(budget: Budget) {
    budget.id ? setBudgets([...budgets.filter(b => b.id !== budget.id), budget]) : setBudgets([...budgets, {...budget, id: uuid()}]);
    setEditMode(false);
    setSelectedBudget(budget);
  }

  function handleDeleteBudget(id: string) {
    setBudgets([...budgets.filter(b => b.id !== id)]);
  }

  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      <Container className="dashboardContainer">
        <BudgetDashboard 
          budgets={budgets}
          selectedBudget={selectedBudget}
          selectBudget={handleSelectBudget}
          cancelSelectBudget={handleCancelSelectBudget}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditBudget}
          deleteBudget={handleDeleteBudget}
        />
      </Container>
    </div>
  );
}

export default App;
