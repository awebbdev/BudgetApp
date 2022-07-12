import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { Budget } from '../../../app/models/budget';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function BudgetForm() {
    const history = useHistory();
    const {budgetStore} = useStore();
    const{createBudget, updateBudget, loadBudget, loading, loadingInitial} = budgetStore;
    const {id} = useParams<{id:string}>();

    const [budget, setBudget] = useState<Budget>({
        id: '',
        name: '',
        description: '',
        dateCreated: new Date(),
        dateModified: new Date(),
        owner: '',
        categories: [],
        accounts: []
        
    });

    useEffect(() => {
        if(id) loadBudget(id).then(budget => {
            setBudget(budget!);
        });
    }, [id, loadBudget]);
    
    function handleSubmit() {
        if(budget.id.length === 0) {
            let newBudget = {
                ...budget,
                id: uuid()
            };
            createBudget(newBudget).then(() => history.push(`/budgets/${newBudget.id}`));
        } else {
            updateBudget(budget).then(() => history.push(`/budgets/${budget.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBudget({...budget, [name]: value});
    }

    if(loadingInitial) return <LoadingComponent content='Loading budget...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={budget.name} name='name' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={budget.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Owner' value={budget.owner} name='owner' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button as={Link} to='/budgets' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
});
