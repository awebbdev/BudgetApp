import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Budget } from '../../../app/models/budget';

interface Props {
    budgets: Budget[];
    selectBudget: (id: string) => void;
    deleteBudget: (id: string) => void;
}

export default function BudgetList({budgets, selectBudget, deleteBudget}: Props) {
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
                                <div>Date Created: {budget.dateCreated}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectBudget(budget.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteBudget(budget.id)} floated='right' content='Delete' color='red' />
                                <Label basic content='Default' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}