import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import api from '../api'

class LeaderBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: []
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getLeaderBoard().then(list => {

          console.log(list)
            this.setState({
                userData: list['data'] //test
            })
        }).catch(err => {
          console.log(err)
        })
    }

    render() {
        const { userData } = this.state;

        return (
          <Container className="mt-4">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>순위</th>
                <th >이름</th>
                <th>점수</th>
                <th>마지막 참여 시간</th>
              </tr>
            </thead>
            <tbody>
            {
              userData.map((data, index) => {
                return <tr>
                  <td>{index+1}</td>
                  <td>{data.username}</td>
                  <td>{data.point}</td>
                  <td>{new Date(parseInt(data.updateAt*1000)).toLocaleString()}</td>
                </tr>
              })
            }

            </tbody>
            </Table>
          </Container>

        )
    }
}

export default LeaderBoard
