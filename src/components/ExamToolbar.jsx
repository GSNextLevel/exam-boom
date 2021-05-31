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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Cookies from 'universal-cookie';


// import { ExamCardSelect } from '../components'

const Wrapper = styled.div`
    padding: 0 40px 10px 40px;
`
/* 다음문제 번호 생성 */
const randomNext = (type) => {
  let questionMax = type ==='adp' ? 400 : 422 
  return Math.floor(Math.random() * (questionMax - 1)) + 1 ; 
}



class ExamToolbar extends Component {
    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {
        pageNum: this.props.value.match.params.id,
        type: this.props.value.match.params.type,
        tableResult: cookies.get('tableResult') || [],
        showTableResult: cookies.get('showTableResult') || false,
        submitAnswer: cookies.get('submitAnswer') || [],
        currentScore: 0,
        scoringButtonDisabled: false,
        previousExamTable: cookies.get('previousExamTable') || [],
        showPreviousExamTable: cookies.get('showPreviousExamTable') || false,
        isRandom: this.props.value.isRandom || false
      }

      this.handleRandomNext = this.handleRandomNext.bind(this);
      this.handleRandomPrevious = this.handleRandomPrevious.bind(this);
      // console.log(pageNum)

    }

    componentDidMount = async () => {

    }

    // arraysEqual(a, b)


    handleRandomNext(event) {
      event.preventDefault();
      const cookies = new Cookies();
      const type =this.state.type;
      let nextQuestion = randomNext(type)
      let savedQuestions = []
      let values;
      if (values = cookies.get('previousQuestions')){
        console.log(values);
        cookies.set('previousQuestions',values + ',' + this.state.pageNum)  
      } else { 
        savedQuestions = this.state.pageNum
        cookies.set('previousQuestions',savedQuestions)  
      }
      window.location.href = nextQuestion.toString();
    }

    handleRandomPrevious(event) {
      const cookies = new Cookies();
      let savedQuestions
      let values
      if (values = cookies.get('previousQuestions')){
        savedQuestions = values.split(',')
        let previousQuestion = savedQuestions.pop();
        window.location.href = previousQuestion.toString();
        if (savedQuestions.length > 0){
          cookies.set('previousQuestions',savedQuestions.join())
        } else {
          cookies.remove('previousQuestions')
        }
        
      } else {
        alert("이전문제가 없습니다.");
      }
    }

    resetProblem() {
      const cookies = new Cookies();
      console.log("reset")


      this.setState({tableResult: []})
      this.setState({showTableResult: false})

      this.setState({showPreviousExamTable: false})
      this.setState({previousExamTable: []})
      this.setState({submitAnswer: []})

      cookies.remove('tableResult', {path: '/'})
      cookies.remove('submitAnswer', {path: '/'})
      cookies.remove('previousExamTable', {path: '/'})
    }

    async scoringExam() {
      const cookies = new Cookies();
      const type = this.props.value.match.params.type;

      let beforeSubmitAnswer = this.state.tableResult;
      const userAnswerFromCookie = cookies.get('submitAnswer');
      console.log(userAnswerFromCookie)

      if(userAnswerFromCookie.length == 0){
        return;
      }
      const frontIdx = userAnswerFromCookie[0]['id'];
      const endIdx = userAnswerFromCookie[userAnswerFromCookie.length - 1]['id'];

      console.log("front!!!", frontIdx, endIdx)
      // const mymy = this.state.tableResult;
      this.setState({tableResult: [], scoringButtonDisabled: true})

      let correctCnt = 0;
      let totalCnt = 0;
      const getAnswerResponse =  await api.getAllExamAnswer(type, frontIdx, endIdx).then(exam => {
        console.log("check", exam);
        // console.log(exam);
        const realAnswer = exam['data']['Items'];
        // console.log(realAnswer);
        let tempResult = this.state.tableResult;

          userAnswerFromCookie.forEach((item, i) => {
            const submitQuestionNum = item['id'];
            const sumbitQuestionAns = item['ans'];

            let sameIdx = 0;
            for(let j=0 ; j<realAnswer.length ; j++) {
              if(submitQuestionNum == realAnswer[j]['examIdx']) {
                sameIdx = j;
                break;
              }
            }
            const realQuestionAns = realAnswer[sameIdx]['answer']
            let isCorrect  = false;
            if(JSON.stringify(sumbitQuestionAns) == JSON.stringify(realQuestionAns)) {
              console.log("correct", item['id'], sumbitQuestionAns, realQuestionAns)
              isCorrect = true;
              correctCnt++;
            }
            else{
              console.log("wrong", item['id'], sumbitQuestionAns, realQuestionAns)
              isCorrect = false;
            }

            totalCnt++;
            let temp = {id: item['id'], correct: isCorrect};


            console.log("tempResult: ", tempResult)

            tempResult.push(temp);

            // tableResult
          });
          // console.log("score!!!", parseInt((correctCnt/totalCnt)*100));

          this.setState({currentScore: parseInt((correctCnt/totalCnt)*100) })

          this.setState({tableResult: tempResult})
          cookies.set('tableResult', tempResult, {path: '/'})

          this.setState({showTableResult: true, scoringButtonDisabled: false})

          return tempResult;
      })

      let foundUnsubmittedAnswer = [];
      console.log("diff", getAnswerResponse , beforeSubmitAnswer)
      getAnswerResponse.forEach((item, i) => {

        let flag = true;
        for(let i=0 ; i<beforeSubmitAnswer.length ; i++) {
            if(item['id'] == beforeSubmitAnswer[i]['id']) {
              console.log("same : ", item['id']);
              flag = false;
              break;
            }
        }
        if(flag) {
          foundUnsubmittedAnswer.push({id: item['id'], correct: item['correct']})
        }

      })

      console.log("my result", foundUnsubmittedAnswer)

      const username = cookies.get("username") || "익명";
      const payload = {"name": username, "type": type, "result": foundUnsubmittedAnswer };

      console.log("toobar payload", payload);
      const scoringResponse = await api.scoringExam(type, payload).then(res => {
        console.log(res);
      })
      console.log(scoringResponse)







      // console.log(this.state.tableResult)
    }

    async viewPreviousExamTable() {
      const cookies = new Cookies();
      const type = this.props.value.match.params.type;
      const getPreviousExam =  await api.getPreviousExamByType(type).then(exam => {
        console.log("prev Exam", exam);
        // console.log(exam);
          console.log(exam['data']['Items'])
          this.setState({previousExamTable: exam['data']['Items'] })

          cookies.set('previousExamTable', exam['data']['Items'], {path: '/'})

      })
    }


    render() {
      const { type, pageNum, submitAnswer, currentScore, showTableResult, scoringButtonDisabled, isRandom } = this.state;

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
      const cellStyle2 = {
        marginRight: '4px',
        marginBottom: '4px',
        width: '6%',
        fontSize: '14px'
      }



      return (

        <Container>
          <ButtonToolbar aria-label="Toolbar with button groups"
            className="justify-content-between pt-3"
          >
            <ButtonGroup className="mr-2" aria-label="First group">
              { isRandom ? 
              <Button variant="secondary" onClick={this.handleRandomPrevious} >이전 문제</Button>
              :
              <Button variant="secondary" href={(parseInt(pageNum)-1).toString()} >이전 문제</Button>
              }
              
            </ButtonGroup>

            <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="warning" onClick={this.resetProblem.bind(this)}>초기화</Button>
              <Button variant="secondary" disabled>
                푼 문제 수 <Badge variant="success">{submitAnswer.length}</Badge>
              </Button>

              <Button onClick={this.scoringExam.bind(this)} disabled={scoringButtonDisabled} variant="success" >채점하기</Button>
              {
                type == "sap" &&
                <OverlayTrigger
                  key='bottom1'
                  placement='bottom'
                  overlay={
                    <Tooltip id="tooltip-bottom1">
                      최근에 새롭게 추가된 덤프 문제들입니다.
                    </Tooltip>
                  }
                >
                  <Button href="290" variant="outline-info" >NEW문제로 바로가기</Button>

                </OverlayTrigger>

              }
              {
                type == "sap" &&
                <OverlayTrigger
                  key='bottom2'
                  placement='bottom'
                  overlay={
                    <Tooltip id="tooltip-bottom2">
                      최근에 시험을 보고왔던 SA들이 선별한 기출문제들만 확인할 수 있습니다.
                    </Tooltip>
                  }
                >
                  <Button onClick={this.viewPreviousExamTable.bind(this)} variant="outline-info" >기출문제 보기</Button>
                </OverlayTrigger>

              }

            </ButtonGroup>



            <ButtonGroup className="mr-2" aria-label="First group">
              { isRandom ?
                <Button variant="secondary" onClick={this.handleRandomNext} >다음 문제(random)</Button> 
                :
                <Button variant="secondary" href={(parseInt(pageNum)+1).toString()} >다음 문제</Button>}
            </ButtonGroup>

          </ButtonToolbar>

          <Wrapper className={this.state.tableResult.length > 0 ? "mt-4" : ""}  >
            {showTableResult && <h5> 점수 : {currentScore} 점 </h5>}
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

          <Wrapper className={this.state.previousExamTable.length > 0 ? "mt-4" : ""}  >
          {
            this.state.previousExamTable.map((data, index) => {
              return <Button href={data['examIdx'].toString()} key={index} style={cellStyle2} variant="light">{data['examIdx']}</Button>
            })
          }
          </Wrapper>


        </Container>
      );
    }
}




export default ExamToolbar
