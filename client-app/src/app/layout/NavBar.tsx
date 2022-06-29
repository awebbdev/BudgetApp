import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img className='headerLogo' src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="logo" />
                    Big Budget App
                </Menu.Item>
                <Menu.Item name='Budgets' />
                <Menu.Item>
                    <Button positive content='Create Budget' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}