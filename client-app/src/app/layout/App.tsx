import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Budget } from "../models/budget";
import NavBar from "./NavBar";
import BudgetDashboard from "../../features/budgets/dashboard/BudgetDashboard";

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    axios.get<Budget[]>("http://localhost:5000/api/Budget").then((resp) => {
      setBudgets(resp.data);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Container className="dashboardContainer">
        <BudgetDashboard budgets={budgets} />
      </Container>
    </div>
  );
}

export default App;
