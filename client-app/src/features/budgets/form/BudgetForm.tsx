import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget';

interface Props {
    budget: Budget | undefined;
    closeForm: () => void;
    createOrEdit: (budget: Budget) => void;
    submitting: boolean
}

export default function BudgetForm({ budget: selectedBudget, closeForm, createOrEdit, submitting } : Props) {

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
        createOrEdit(budget);
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
                <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
};
