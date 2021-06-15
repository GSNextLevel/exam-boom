import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  className: 'collpase navbar-collapse justify-content-end',
})`
  padding-right: 20px;
`;

const List = styled.div.attrs({
  className: 'navbar-nav',
})``;

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <Collapse>
          <List>
            {/*
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
                      */}
            <Item>
              <Link to="/leaderBoard" className="nav-link">
                랭킹
              </Link>
            </Item>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
