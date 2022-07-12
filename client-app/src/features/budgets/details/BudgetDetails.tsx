import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

export default observer(function BudgetDetails() {

    const {budgetStore} = useStore();
    const{selectedBudget: budget, loadBudget} = budgetStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) {
            loadBudget(id);
        }
    }, [id, loadBudget])

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
                    <Button as={Link} to={`/manage/${budget.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/budgets'} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
});
