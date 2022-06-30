import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Budget } from '../../../app/models/budget';

interface Props {
    budget: Budget | undefined;
    closeForm: () => void;
}

export default function BudgetForm({ budget, closeForm } : Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Owner' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
};
