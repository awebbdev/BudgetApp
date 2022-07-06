import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default function NavBar() {
    const {budgetStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img className='headerLogo' src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="logo" />
                    Big Budget App
                </Menu.Item>
                <Menu.Item name='Budgets' />
                <Menu.Item>
                    <Button onClick={() => budgetStore.openForm()} positive content='Create Budget' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}