import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import { FcRating, FcOk, FcCheckmark, FcClock, FcLinux, FcDonate, FcCurrencyExchange, FcIdea, FcBullish, FcAssistant } from 'react-icons/fc';

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

    const donated = ["sian", "로우킥", "sshlove", "아무거나", "최성우", "조길상", "jblim", "난몰라"];
    const goldmember = ["로우킥", "sian", "난몰라"]
    const manager = ["한승수", "구로동잼민이"]

    const upInsight = ["ksg"]

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
                    {donated.includes(data.nickname) && <FcCurrencyExchange className="mr-1" />}
                    {goldmember.includes(data.nickname) && <FcIdea className="mr-1" />}
                    {manager.includes(data.nickname) && <FcAssistant className="mr-1" />}
                    {upInsight.includes(data.nickname) && <FcBullish className="mr-1" />}
                    {/* {data.point >= 500 ? (
                      <FcOk className="mr-1" />
                    ) : data.point >= 100 ? (
                      <FcCheckmark className="mr-1" />
                    ) : (
                      <a />
                    )} */}
                    {
                      // data.point >= 1000 ?
                      donated.includes(data.nickname) ?
                        <a style={{color: 'goldenrod', fontWeight: '600'}}>{data.nickname}</a>
                        // <a>{data.nickname}</a>
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
