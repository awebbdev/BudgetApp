import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

export default function BudgetDetails() {

    const {budgetStore} = useStore();
    const{selectedBudget: budget} = budgetStore;

    if(!budget) return <LoadingComponent />

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
                    <Button onClick={() => budgetStore.openForm(budget.id)} basic color='blue' content='Edit' />
                    <Button onClick={budgetStore.cancelSelectedBudget} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
};
