import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';


import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'




// import { ExamCardSelect } from '../components'

class ExamToolbar extends Component {
    constructor(props) {
      super(props);

      // const pageNum = this.props.value.match.params.id;

      this.state = {
        pageNum: this.props.value.match.params.id
      }
      // console.log(pageNum)



    }

    componentDidMount = async () => {

    }


    render() {
      const { pageNum } = this.state;

      return (

        <ButtonToolbar aria-label="Toolbar with button groups"
          className="justify-content-between pt-3"
        >
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="secondary" href={(parseInt(pageNum)-1).toString()} >이전 문제</Button>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="secondary" disabled>
              푼 문제 수 <Badge variant="success">-</Badge>
            </Button>

            <Button variant="success" >채점하기</Button>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="secondary" href={(parseInt(pageNum)+1).toString()} >다음 문제</Button>
          </ButtonGroup>

        </ButtonToolbar>
      );
    }
}




export default ExamToolbar
