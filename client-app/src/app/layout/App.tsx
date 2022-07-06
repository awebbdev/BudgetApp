import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Budget } from "../models/budget";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Budgets.list().then(resp => {
      setBudgets(resp);      
      setLoading(false);
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
    setSubmitting(true);
    if(budget.id) {
      agent.Budgets.update(budget).then(() => {
        setBudgets([...budgets.filter(b => b.id !== budget.id), budget]);
        setSelectedBudget(budget);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      budget.id = uuid();
      agent.Budgets.create(budget).then(() => {
        setBudgets([...budgets, budget]);
        setSelectedBudget(budget);
        setEditMode(false);
        setSubmitting(false);
      })
    }   
  }

  function handleDeleteBudget(id: string) {
    setSubmitting(true);
    agent.Budgets.delete(id).then(() => {
      setBudgets([...budgets.filter(b => b.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading App' />

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
          submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default App;
