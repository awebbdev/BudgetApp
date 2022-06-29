import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Budget } from '../../../app/models/budget';

interface Props {
    budgets: Budget[];
}

export default function BudgetList({budgets}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {budgets.map(budget => (
                    <Item key={budget.id}>
                        <Item.Content>
                            <Item.Header as='a'>{budget.name}</Item.Header>
                            <Item.Meta></Item.Meta>
                            <Item.Description></Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' />
                                <Label basic content='Default' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}