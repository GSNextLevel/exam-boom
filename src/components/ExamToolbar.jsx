import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';

import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'
import Table from 'react-bootstrap/Table';

import Cookies from 'universal-cookie';


// import { ExamCardSelect } from '../components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class ExamToolbar extends Component {
    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {
        pageNum: this.props.value.match.params.id,
        tableResult: cookies.get('tableResult') || [],
        showTableResult: cookies.get('showTableResult') || false,
        submitAnswer: cookies.get('submitAnswer') || []
      }
      // console.log(pageNum)



    }

    componentDidMount = async () => {

    }

    // arraysEqual(a, b)

    resetProblem() {
      const cookies = new Cookies();
      console.log("reset")


      this.setState({tableResult: []})
      this.setState({showTableResult: false})
      this.setState({submitAnswer: []})

      cookies.remove('tableResult', {path: '/'})
      cookies.remove('submitAnswer', {path: '/'})

    }

    async scoringExam() {
      const cookies = new Cookies();

      const userAnswerFromCookie = cookies.get('submitAnswer');
      console.log(userAnswerFromCookie)

      // const mymy = this.state.tableResult;
      this.setState({tableResult: []})

      const getAnswerResponse =  await api.getAllExamAnswer("adp").then(exam => {
        // console.log(exam);
        const realAnswer = exam['data']['Items'];
        // console.log(realAnswer);
        let tempResult = this.state.tableResult;

          userAnswerFromCookie.forEach((item, i) => {
            const submitQuestionNum = item['id'];
            const sumbitQuestionAns = item['ans'];

            const realQuestionAns = realAnswer[submitQuestionNum-1]['answer']
            let isCorrect  = false;
            if(JSON.stringify(sumbitQuestionAns) == JSON.stringify(realQuestionAns)) {
              console.log("correct", item['id'], sumbitQuestionAns, realQuestionAns)
              isCorrect = true;
            }
            else{
              console.log("wrong", item['id'], sumbitQuestionAns, realQuestionAns)
              isCorrect = false;
            }

            let temp = {id: item['id'], correct: isCorrect};



            tempResult.push(temp);

            // tableResult
          });
          return tempResult;
          this.setState({tableResult: tempResult})
          cookies.set('tableResult', tempResult, {path: '/'})


      })

      const username = cookies.get("username") || "익명";
      const payload = {"name": username, "type": "adp", "result": getAnswerResponse };

      const scoringResponse = await api.scoringExam("adp", payload).then(res => {
        console.log(res);
      })
      // console.log(tempResult)







      // console.log(this.state.tableResult)
    }


    render() {
      const { pageNum, submitAnswer } = this.state;

      const correctAnswer = {
        backgroundColor: 'forestgreen',
        width: '5%',
        textAlign: 'center'

      }
      const wrongAnswer = {
        backgroundColor: 'lightcoral',
        width: '5%',
        textAlign: 'center'
      }

      const cellStyle = {
        marginRight: '4px',
        marginBottom: '4px',
        width: '8%'
      }

      return (

        <Container>
          <ButtonToolbar aria-label="Toolbar with button groups"
            className="justify-content-between pt-3"
          >
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="secondary" href={(parseInt(pageNum)-1).toString()} >이전 문제</Button>
            </ButtonGroup>

            <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="warning" onClick={this.resetProblem.bind(this)}>초기화</Button>
              <Button variant="secondary" disabled>
                푼 문제 수 <Badge variant="success">{submitAnswer.length}</Badge>
              </Button>

              <Button onClick={this.scoringExam.bind(this)} variant="success" >채점하기</Button>
            </ButtonGroup>



            <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="secondary" href={(parseInt(pageNum)+1).toString()} >다음 문제</Button>
            </ButtonGroup>

          </ButtonToolbar>

          <Wrapper className="mt-4">

          {

            this.state.tableResult.map((data, index) => {
              // console.log(data['id'])
              if(data['correct']) {
                return <Button href={data['id'].toString()} key={index} style={cellStyle} variant="success">{data['id']}</Button>
              }
              else{
                return <Button href={data['id'].toString()} key={index} style={cellStyle} variant="danger">{data['id']}</Button>
              }

            })
          }

          </Wrapper>


        </Container>
      );
    }
}




export default ExamToolbar
