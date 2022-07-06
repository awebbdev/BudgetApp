import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function BudgetList() {

    const {budgetStore} = useStore();
    const{deleteBudget, budgetsByCreatedDate, loading} = budgetStore;
    
    const [target, setTarget] = useState('');

    function handleBudgetDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteBudget(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {budgetsByCreatedDate.map(budget => (
                    <Item key={budget.id}>
                        <Item.Content>
                            <Item.Header as='a'>{budget.name}</Item.Header>
                            <Item.Meta>{budget.owner}</Item.Meta>
                            <Item.Description>
                                <div>{budget.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => budgetStore.selectBudget(budget.id)} floated='right' content='View' color='blue' />                                <Button
                                name={budget.id}
                                    onClick={(e) => handleBudgetDelete(e, budget.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                    loading={loading && target === budget.id} 
                                />
                                <Label basic content='Default' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});