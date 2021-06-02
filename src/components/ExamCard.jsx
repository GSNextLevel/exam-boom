import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'

import api from '../api'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

// import { ExamCardSelect } from '../components'

import Cookies from 'universal-cookie';

class ExamCard extends Component {
    constructor(props) {
      super(props);
      console.log(props)
      const cookies = new Cookies();
      this.viewAnswer = this.viewAnswer.bind(this);
      const username = cookies.get('username');

      this.state = {
          question: "",
          choices: [],
          answer: [],
          selectedAnswer: [],
          choiceType: "",
          isLoading: false,
          answerState: false,
          submitAnswer: cookies.get('submitAnswer') || [],
          username:  username === undefined ? "익명" : username,

          mySubmitCount: 0,
          myCorrectCount: 0,
          correctRate: 0,
          myStarred: false,

          submitTotalCount: 0,
          correctTotalCount: 0,
          starredTotalCount: 0,

          previousExam: [],
          likeList: [],
          amILiked: false

      }
      // console.log(examNum);
    }

    // 풀었던 문제로 다시 돌아올 시에 라디오, 콤보박스 체크 활성화 기능 추가


    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const examNum = this.props.value.match.params.id;
        const username = this.state.username;
        const type = this.props.value.match.params.type;
        await api.getExamById(type, examNum, username).then(exam => {
          // console.log(exam)
          const examData = exam.data.exam.Item;
          const userData = exam.data.user.Items;
          console.log(exam);
          // console.log(exam.data.Item.userData)
          // console.log(examData, userData)

          let correctCnt = 0;
          let totalCnt = 0;
          userData.forEach(el => {
            console.log("el", el);
            if(el.correct == true) {
              correctCnt++;
            }
            totalCnt++;

          })

          console.log("prev!", examData['previousExam']);

          if(examData['likeList'] != undefined) {
            examData['likeList'].forEach((li) => {
              if(li == username) {
                this.setState({amILiked: true})
              }
            })
          }


          this.setState({
              mySubmitCount: totalCnt,
              myCorrectCount: correctCnt,
              myStarred: 0,
              previousExam: examData['previousExam'] == undefined ? [] : examData['previousExam'],
              likeList: examData['likeList'] == undefined ? [] : examData['likeList']
          })


          // if(userData.userData !== undefined) {
          //   const userDataArray = exam.data.Item.userData;
          //   const foundUserData = userDataArray.find(x => x.name === username);
          //   this.setState({
          //       // mySubmitCount: foundUserData.submitCount,
          //       // myCorrectCount: foundUserData.correctCount,
          //       // myStarred: foundUserData.starred
          //       mySubmitCount: 0,
          //       myCorrectCount: 0,
          //       myStarred: 0
          //   })
          //
          // }
          // else{
          //   console.log("undefined!!")
          // }


            this.setState({
                question: examData.question,
                choices: examData.choice,
                answer: examData.answer,
                choiceType: examData.choiceType,
                isLoading: false,
                correctTotalCount: examData.correctTotalCount === undefined ? 0 : examData.correctTotalCount,
                submitTotalCount: examData.submitTotalCount === undefined ? 1 : examData.submitTotalCount,

                previousExam: examData.previousExam === undefined ? [] : examData.previousExam
            })
        })
    }


    viewAnswer() {
        this.setState({answerState: true});

        // console.log(this.state.answer);
    }

    onChangeChoice(e) {
      // selectedAnswer

      let value = e.target.value;
      if(this.state.choiceType == "single") {
        if(e.target.checked == true) {
            this.setState({selectedAnswer: [value]});
            console.log("SET!")
        }

      }
      else{
        if(e.target.checked){
           this.state.selectedAnswer.push(value);
         }
         else{
           console.log("remove", value)
           const removeIdx = this.state.selectedAnswer.indexOf(value);
            if (removeIdx > -1) {
              this.state.selectedAnswer.splice(removeIdx, 1);
            }

         }
      }
      console.log(e.target.checked)
      console.log(e.target.value);



  // this.setState({values: value});
    }

    saveAndNext(id) {
      const cookies = new Cookies();
      // console.log("page", id);
      console.log(this.state.selectedAnswer);
      if(this.state.selectedAnswer.length === 0) {
        alert("답을 선택해주세요.")
        return;
      }


      this.setState({selectedAnswer: this.state.selectedAnswer.sort()});
      console.log(this.state.selectedAnswer)

      let submitAnswerFormat = {'id': parseInt(id), 'ans': this.state.selectedAnswer};
      let prevSubmitAnswer = this.state.submitAnswer;

      let isFilled = false;
      for(let i=0 ; i<prevSubmitAnswer.length ; i++) {
        if(prevSubmitAnswer[i].id == id) {
          prevSubmitAnswer[i].ans = this.state.selectedAnswer;
          isFilled = true;
          break;
        }
      }

      if(!isFilled) {
          prevSubmitAnswer.push(submitAnswerFormat);
      }

      console.log("Cookie Data", prevSubmitAnswer)
      prevSubmitAnswer.sort((a,b) => a.id - b.id)

      cookies.set('submitAnswer', prevSubmitAnswer, {path: '/'})



      // this.setState({submitAnswer: })
    }

    async pushLike(id) {
      const examNum = this.props.value.match.params.id;
      const username = this.state.username;
      const type = this.props.value.match.params.type;

      let prevLikedList = this.state.likeList;

      if(this.state.amILiked) {
        console.log("cancle")
        this.setState({amILiked: false})
        let foundIdx = prevLikedList.findIndex((e) => e == username);
        const payload = {"name" : username, "liked": false, "idx": foundIdx}

        await api.likeExamById(type, examNum, payload).then(res => {
          // console.log(exam);
          console.log(res)

          prevLikedList.splice(foundIdx, 1);
          this.setState({amILiked: false, likeList: prevLikedList})




        })

        console.log(prevLikedList.findIndex((e) => e == username))
      }
      else{
        console.log("push")
        const payload = {"name" : username, "liked": true}
        await api.likeExamById(type, examNum, payload).then(res => {
          // console.log(exam);
          console.log(res)

          prevLikedList.push(username);
          this.setState({amILiked: true, likeList: prevLikedList})




        })


      }

    }

    checkUserChoice(id, value) {

      // e.preventDefault();
      let prevSubmitAnswer = this.state.submitAnswer;
      for(let i=0 ; i<prevSubmitAnswer.length ; i++) {
        if(prevSubmitAnswer[i].id == id) {
          if(prevSubmitAnswer[i].ans == value) {
            return true;
          }
          // console.log("this num ans is ", prevSubmitAnswer[i].ans)

          break;
        }
      }

      return false;
    }


    render() {
      const { question, choices, answer, choiceType,
        starred, mySubmitCount, myCorrectCount, starredTotalCount,
        submitTotalCount, correctTotalCount,
        isLoading, answerState, previousExam, likeList, amILiked } = this.state;
      let answerToString = answer.join(',');

      let correctRatePrev = parseInt((parseInt(correctTotalCount)/parseInt(submitTotalCount)) * 100);
      // console.log(correctRatePrev)
      let correctRate = isNaN(correctRatePrev) ? "-" : correctRatePrev;

      // console.log("this is from card");
      // console.log(this.props);

      const examNum = this.props.value.match.params.id;
      let examNumKey = "exam-" + examNum;
      const test = 100;
      const examChoiceAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      let examChoiceIdx = 0;


      const answerStyle = {
            color: (answerState) ? 'green' : 'black',
          };
      const thumsUpStyle = {
        marginRight: '6px',
        verticalAlign: 'text-top'

      }

          // console.log("@@@@", correctTotalCount, submitTotalCount);
      return (



        <Card className="mt-4 mb-4" key={examNumKey}>
          <Card.Header as="h5" >

            <ButtonToolbar aria-label="Toolbar with button groups"
              className="justify-content-between"
            >
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button variant="outline-primary"  >문제 {examNum}</Button>
                {
                  previousExam.map((title, index) => {
                    return <Button variant="outline-success" key={index}>{title}</Button>
                  })
                }
              </ButtonGroup>


              <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="outline-secondary"  >내가 푼 횟수: {mySubmitCount}회</Button>
              <Button variant="outline-secondary"  >내가 틀린 횟수: {mySubmitCount-myCorrectCount}회</Button>
              <Button variant="outline-secondary"  >전체 정답률: {correctRate}%</Button>
              <Button variant="outline-primary" onClick={() => this.pushLike(examNum)} >

              {
                amILiked ? <FaThumbsUp style={thumsUpStyle}/>
                :
                <FaRegThumbsUp style={thumsUpStyle}/>

              }



              추천: {likeList.length}회 .</Button>

              </ButtonGroup>
            </ButtonToolbar>

          </Card.Header>
          <Card.Body>

            <Card.Title>카테고리: 추가예정</Card.Title>
            <Card.Text>
            {question}
            </Card.Text>

            <Form
              onChange={this.onChangeChoice.bind(this)}

            >
                {
                  choices.map((choice, index) => {

                    let isCorrectAns = false;
                    for(let i=0 ; i<answer.length ; i++) {
                      if(answer[i].charCodeAt(0)-65 == index) {
                        isCorrectAns = true;
                        // console.log("found ans ", index)
                      }
                    }
                    choice = examChoiceAlpha[index] + ". " + choice;
                    let answerKey = "p-" + examNum + "-" + (index+1);
                    let answerName = "g-" + examNum;
                    let thisChoiceType = (choiceType == "single") ? "radio" : "checkbox";
                    // console.log(answerKey);
                    // checked={this.checkUserChoice(examNum, examChoiceAlpha[index])}
                    return isCorrectAns ?
                      <Row className="mb-1" key={answerKey}>
                        <Form.Check  defaultChecked={this.checkUserChoice(examNum, examChoiceAlpha[index])} style={answerStyle} inline label={choice} value={examChoiceAlpha[index]}  name={answerName} type={thisChoiceType} id={answerKey} key={answerKey} />
                      </Row>
                      :
                      <Row className="mb-1" key={answerKey}>
                        <Form.Check defaultChecked={this.checkUserChoice(examNum, examChoiceAlpha[index])} inline label={choice} value={examChoiceAlpha[index]} name={answerName} type={thisChoiceType} id={answerKey} key={answerKey} />
                      </Row>

                  }
                )
              }
            </Form>

            <ButtonToolbar
              className="justify-content-between mt-4"
              aria-label="Toolbar with Button groups"
            >
              <Button variant="success" onClick={this.viewAnswer}>답 바로보기</Button>
              {answerState && ( <span > 답 : {answerToString} </span> )}
              <Button onClick={() => this.saveAndNext(examNum)} href={(parseInt(examNum)+1).toString()} variant="primary">저장 후 계속</Button>
              {/*<Button onClick={() => this.saveAndNext(examNum)} variant="primary">저장 후 계속</Button>*/}

            </ButtonToolbar>


          </Card.Body>
        </Card>
      );
    }
}




export default ExamCard
