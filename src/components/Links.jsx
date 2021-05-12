import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse justify-content-end',

})`
  padding-right: 20px;
`

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    자격증 뿌시기
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/exam" className="nav-link">
                                시험시작
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movies/list" className="nav-link">
                                시험 종류
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movies/create" className="nav-link">
                                맞춤형 문제
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
