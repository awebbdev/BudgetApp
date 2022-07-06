import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Budget } from '../../../app/models/budget';

interface Props {
    budgets: Budget[];
    selectBudget: (id: string) => void;
    deleteBudget: (id: string) => void;
    submitting: boolean;
}

export default function BudgetList({budgets, selectBudget, deleteBudget, submitting}: Props) {
    
    const [target, setTarget] = useState('');

    function handleBudgetDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteBudget(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {budgets.map(budget => (
                    <Item key={budget.id}>
                        <Item.Content>
                            <Item.Header as='a'>{budget.name}</Item.Header>
                            <Item.Meta>{budget.owner}</Item.Meta>
                            <Item.Description>
                                <div>{budget.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectBudget(budget.id)} floated='right' content='View' color='blue' />                                <Button
                                name={budget.id}
                                    onClick={(e) => handleBudgetDelete(e, budget.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                    loading={submitting && target === budget.id} 
                                />
                                <Label basic content='Default' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}