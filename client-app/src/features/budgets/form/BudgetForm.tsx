import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget';
import { useStore } from '../../../app/stores/store';

export default observer(function BudgetForm() {
    const {budgetStore} = useStore();
    const{selectedBudget, closeForm, createBudget, updateBudget, loading} = budgetStore;

    const initialState : Budget = selectedBudget ?? {
        id: '',
        name: '',
        description: '',
        dateCreated: new Date(),
        dateModified: new Date(),
        owner: '',
        categories: [],
        accounts: []
    };

    const [budget, setBudget] = useState(initialState);

    function handleSubmit() {
        budget.id ? updateBudget(budget) : createBudget(budget);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBudget({...budget, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={budget.name} name='name' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={budget.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Owner' value={budget.owner} name='owner' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
});
