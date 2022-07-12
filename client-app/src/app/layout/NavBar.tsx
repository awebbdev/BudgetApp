import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img className='headerLogo' src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="logo" />
                    Big Budget App
                </Menu.Item>
                <Menu.Item as={NavLink} to='/budgets' name='Budgets' />
                <Menu.Item>
                    <Button as={NavLink} to='/createBudget' positive content='Create Budget' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}