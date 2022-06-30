import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget'

interface Props {
    budget: Budget;
    cancelSelectBudget: () => void;
    openForm: (id: string) => void;
}

export default function BudgetDetails({ budget, cancelSelectBudget, openForm }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/music.jpg`} />
            <Card.Content>
                <Card.Header>{budget.name}</Card.Header>
                <Card.Meta>
                    <span>{budget.owner}</span>
                </Card.Meta>
                <Card.Description>
                    {budget.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(budget.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectBudget} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
};
