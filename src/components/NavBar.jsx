import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'
import TempLoginMenu from './TempLoginMenu'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
                <Nav>
                    <Logo />
                    <TempLoginMenu />
                    <Links />
                </Nav>
        )
    }
}

export default NavBar
