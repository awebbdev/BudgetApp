import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default function BudgetForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Owner' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
};
