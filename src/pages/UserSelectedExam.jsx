import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import Container from 'react-bootstrap/Container';
import {
  ExamCard,
  ExamPagination,
  ExamToolbar,
  ExamReply,
  LoginAlertModal,
} from '../components';

import { NotFound } from '../pages';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import api from '../api';

import styled from 'styled-components';


const style = {
  height: '100%',
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class UserSelectedExam extends Component {
  constructor(props) {
    super(props);

    console.log(props);
    let curBookmarkedList = JSON.parse(localStorage.getItem('bookmark')) || [];
    let initArrayLength = 2
    if(curBookmarkedList.length <= 2) {
      initArrayLength = curBookmarkedList.length
    }
    this.state = {
      // examNum: props.match.params.id,
      examNum: curBookmarkedList[0]['examNum'] || 1,
      question: '',
      choices: [],
      answer: [],
      choiceType: '',
      // type: props.match.params.type,
      type: curBookmarkedList[0]['examType'] || "adp",
      isRandom: props.isRandom || false,

      items: Array.from({ length: initArrayLength }),
      hasMore: true,
      bookmarkedList: curBookmarkedList,
    };

    console.log(this.state.examNum);
  }

  fetchMoreData = () => {
    console.log("length", this.state.bookmarkedList.length)
    if (this.state.items.length > this.state.bookmarkedList.length -1 ) {
      this.setState({ hasMore: false });
      return;
    }
    setTimeout(() => {
      if(this.state.bookmarkedList.length >= 2) {
        this.setState({
          items: this.state.items.concat(Array.from({ length: 1 }))
        });
      }
      else{
        console.log("nothing")
      }

    }, 500);
  };

  render() {
    // const { params } = this.props.match;
    const { examNum, bookmarkedList } = this.state;
    const isValidExamNum = isNaN(examNum) ? false : true;
    console.log('examNum : ', examNum, isValidExamNum);
    console.log("bookmark", bookmarkedList)

    return (

      <React.Fragment>
        <div style={{textAlign: 'center', paddingTop: '10px'}}>
          <h5>저장 후 계속하기 기능은 아직 미완성입니다. </h5>
        </div>


        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h5>로딩중...</h5>}
          pullDownToRefreshThreshold={50}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>마지막 문제입니다. 고생하셨습니다.</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => (
            <Container>
              <ExamCard key={index} value={{
                      match: {
                        params: {
                          // id: 1,
                          // type: "adp"
                          id: bookmarkedList[index]['examNum'] || 1,
                          type: bookmarkedList[index]['examType'] || "adp"
                        }

                  }
              }} />
            </Container>
          ))}
        </InfiniteScroll>

      </React.Fragment>
    );
  }
}

export default UserSelectedExam;
