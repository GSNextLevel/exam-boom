import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="/">
                <img src={logo} width="50" height="50" alt="" />
                <Link to="/" className="navbar-brand">
                    자격증 뿌시기
                </Link>
            </Wrapper>
        )
    }
}

export default Logo
