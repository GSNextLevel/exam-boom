import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import { FcRating, FcOk, FcCheckmark, FcClock, FcLinux } from 'react-icons/fc';

import api2 from '../api';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api2
      .getLeaderBoard()
      .then((list) => {
        console.log(list);
        this.setState({
          userData: list['data'], //test
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { userData } = this.state;

    return (
      <Container className="mt-4">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>점수</th>
              {/* <th>댓글</th> */}
              <th>잔여코인</th>
              <th>마지막 참여 시간</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {index + 1 === 1 && <FcLinux className="mr-1" />}
                    {data.point >= 500 ? (
                      <FcOk className="mr-1" />
                    ) : data.point >= 100 ? (
                      <FcCheckmark className="mr-1" />
                    ) : (
                      <a />
                    )}
                    {
                      data.point >= 1000 ?
                        <a style={{color: 'cornflowerblue', fontWeight: '600'}}>{data.nickname}</a>
                        :
                        <a>{data.nickname}</a>
                    }

                  </td>
                  <td>{data.point}</td>
                  <td>{data.coin !== null ? data.coin : "비공개"}</td>
                  <td>
                    {new Date().getTime() - new Date(data.pointUpdatedAt).getTime() <
                    1000 * 60 * 60 * 24 ? (
                    
                      <FcClock className="mr-1" />
                    ) : (
                      <a />
                    )}
                    {new Date(data.pointUpdatedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default LeaderBoard;
