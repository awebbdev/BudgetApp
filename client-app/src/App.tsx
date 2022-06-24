import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Budget').then(resp => {
      console.log(resp);
      setBudgets(resp.data)
    });
  }, []);


  return (
    <div>
      <Header as='h2' icon='dollar sign' content='Big Budget App' />
        <List>
          {budgets.map((budget: any) => (
            <List.Item key={budget.id}>
              {budget.name}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
