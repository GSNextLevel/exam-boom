import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';

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

      }



      // console.log(examNum);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const examNum = this.props.value.match.params.id;

        await api.getExamById("adp", examNum, this.state.username).then(exam => {
          console.log(exam);
            this.setState({
                question: exam.data.Item.question,
                choices: exam.data.Item.choice,
                answer: exam.data.Item.answer,
                choiceType: exam.data.Item.choiceType,
                isLoading: false,
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

    checkIt(id, value) {

      // e.preventDefault();

      let prevSubmitAnswer = this.state.submitAnswer;


      for(let i=0 ; i<prevSubmitAnswer.length ; i++) {
        if(prevSubmitAnswer[i].id == id) {
          // prevSubmitAnswer[i].ans = this.state.selectedAnswer;
          if(prevSubmitAnswer[i].ans == value) {
            return true;
          }
          // console.log("this num ans is ", prevSubmitAnswer[i].ans)

          break;
        }
      }

      return false;
      // if(foundAnswer && value == "B") {
      //     return true;
      // }
      // else{
      //   return false;
      // }

        // if (this.props.name.indexOf(value) >= 0)
        //     return true;
        // return false;
    }


    render() {
      const { question, choices, answer, choiceType, isLoading, answerState } = this.state;
      let answerToString = answer.join(',');


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


      return (



        <Card className="mt-4 mb-4" key={examNumKey}>
          <Card.Header as="h5" >

            <ButtonToolbar aria-label="Toolbar with button groups"
              className="justify-content-between"
            >
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button variant="outline-primary"  >문제 {examNum}</Button>
              </ButtonGroup>

              <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="outline-secondary"  >내가 푼 횟수: -회</Button>
              <Button variant="outline-secondary"  >내가 틀린 횟수: -회</Button>
                <Button variant="outline-secondary"  >정답률: 100%</Button>
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
                    // checked={this.checkIt(examNum, examChoiceAlpha[index])}
                    return isCorrectAns ?
                      <Form.Check  defaultChecked={this.checkIt(examNum, examChoiceAlpha[index])} style={answerStyle} inline label={choice} value={examChoiceAlpha[index]}  name={answerName} type={thisChoiceType} id={answerKey} key={answerKey} />
                      :
                      <Form.Check defaultChecked={this.checkIt(examNum, examChoiceAlpha[index])} inline label={choice} value={examChoiceAlpha[index]} name={answerName} type={thisChoiceType} id={answerKey} key={answerKey} />

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
              {/*href={(parseInt(examNum)+1).toString()}*/}
            </ButtonToolbar>


          </Card.Body>
        </Card>
      );
    }
}




export default ExamCard
