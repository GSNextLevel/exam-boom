import React, { Component } from 'react'

import api from '../api'
import api2 from '../api'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { FaThumbsUp, FaRegThumbsUp, FaBookmark } from 'react-icons/fa';

import { randomQuestionNum } from '../utils/random';

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
          // submitAnswer: cookies.get('submitAnswer') || [],
          submitAnswer: JSON.parse(localStorage.getItem('submitAnswer')) || [],
          isSolved: false,
          username:  username === undefined ? "익명" : username,

          mySubmitCount: 0,
          myCorrectCount: 0,
          correctRate: 0,
          myStarred: false,

          submitTotalCount: 0,
          correctTotalCount: 0,
          starredTotalCount: 0,
          choicesRatio: [],

          previousExam: [],
          likeList: [],
          amILiked: false,

          examCreatedAt: 0,
          needHelp: false,

          bookmarkedList: JSON.parse(localStorage.getItem('bookmark')) || [],
          amIBookmarked: false,
          leftCoin: localStorage.getItem("coin")

          
      }
      // console.log(examNum);
    }

    toggleCoinModal = (val) => {
      
      this.props.toggleCoinModal(val);
    }

    // 풀었던 문제로 다시 돌아올 시에 라디오, 콤보박스 체크 활성화 기능 추가


    componentDidMount = async () => {
        this.setState({ isLoading: true })
        console.log("CHECK " , this.props);
        const { getProps } = this.props;
        const examNum = this.props.value.match.params.id;
        const username = this.state.username;
        const type = this.props.value.match.params.type;
        let leftCoin = this.state.leftCoin;

        let isSolvedCheck = false;
        for(let i=0 ; i<this.state.submitAnswer.length ; i++) {
          if(this.state.submitAnswer[i].id == examNum) {
            isSolvedCheck = true;
            break;
          }
        }

        await api2.getExamById(type, examNum, username).then(exam => {

          leftCoin--;
          this.setState({leftCoin: leftCoin});
          localStorage.setItem("coin", leftCoin);
          
          // console.log(exam)
          const examData = exam['data'];
          const userData = null;
          console.log(exam);
          // console.log(exam.data.Item.userData)
          // console.log(examData, userData)

          let correctCnt = 0;
          let totalCnt = 0;
          // userData.forEach(el => {
          //   console.log("el", el);
          //   if(el.correct == true) {
          //     correctCnt++;
          //   }
          //   totalCnt++;

          // })

          console.log("prev!", examData['previous_exam']);

          // if(examData['likeList'] != undefined) {
          //   examData['likeList'].forEach((li) => {
          //     if(li == username) {
          //       this.setState({amILiked: true})
          //     }
          //   })
          // }

          let choicesRaw = examData['choices'];
          console.log("######", choicesRaw);
          let choices_state = [];
          choicesRaw.forEach(el => {
            choices_state.push(el['choice_ko']);
          })
          let choices_ratio_state = [];
          choicesRaw.forEach(el => {
            choices_ratio_state.push(el['selected_cnt']);
          })

          let answerRaw = examData['answer'];
          answerRaw = answerRaw.replace(/ /g,'');
          let answer_state = answerRaw.split(',');

          // console.log("@#", answerRaw);

          // is in bookmark?
          let idxCurBookmarkList = this.state.bookmarkedList.findIndex(obj => obj.examType ==  type && obj.examNum == examNum)
          let isInCurBookmarkList = false;
          if(idxCurBookmarkList >= 0){
            isInCurBookmarkList = true
          }
          else{
            isInCurBookmarkList = false
          }

          let parseCorrectTotalCount = 0
          let parseSubmitTotalCount = 1
          choicesRaw.forEach(i => {
            console.log("choice ratio ", i.selected_cnt)
            parseSubmitTotalCount += i.selected_cnt
            answer_state.forEach(j => {
              if(j.charCodeAt(0) - 65 + 1 == i.order) {
                parseCorrectTotalCount += i.selected_cnt
              }
              
            })
          })

          // console.log(choicesRaw) 
          // console.log(answer_state)
          
          // console.log(answerRaw.charCodeAt(0) - 'A')
          // console.log("total count ", parseCorrectTotalCount, parseSubmitTotalCount)

            this.setState({
                question: examData.content_ko,
                choices: choices_state,
                answer: answer_state,
                choiceType: answer_state.length > 1 ? "multiple" : "single",
                isLoading: false,
                // correctTotalCount: examData.correctTotalCount === undefined ? 0 : examData.correctTotalCount,
                // submitTotalCount: examData.submitTotalCount === undefined ? 1 : examData.submitTotalCount,
                previousExam: examData.previous_exam === null ? [] : examData.previous_exam,
                correctTotalCount: parseCorrectTotalCount,
                submitTotalCount: parseSubmitTotalCount,
                // previousExam: [],

                isSolved: isSolvedCheck ? true : false,

                mySubmitCount: totalCnt,
                myCorrectCount: correctCnt,
                myStarred: 0,
                // likeList: examData['likeList'] == undefined ? [] : examData['likeList'],
                likeList: [],
                choicesRatio: choices_ratio_state,

                // examCreatedAt: examData.created_at * 1000,
                examCreatedAt: examData.created_at,
                needHelp: false , //examData.needHelp === undefined ? false : examData.needHelp,
                amIBookmarked: isInCurBookmarkList
            })
        })
        .catch((error) => {
          console.log(error);
          
          
          if(error.response.status == 401) {
            console.log("!!!! 401")
            alert("토큰이 만료되었습니다. 다시 로그인해주세요.")
            localStorage.removeItem("userToken");
            localStorage.removeItem("user_id");
            window.location= "/login";

          }
          if(error.response) {
            const errorMsg = error.response.data;
            console.log(error.response.data);
            console.log(error.response.status);
            if(errorMsg == "coin not enough") {
                // this.props.isOpen = true;
                // console.log("coin toggle 1")
                this.toggleCoinModal(true);
            }
          }
        })


        // await api.getExamById(type, examNum, username).then(exam => {
        //   // console.log(exam)
        //   const examData = exam.data.exam.Item;
        //   const userData = exam.data.user.Items;
        //   console.log(exam);
        //   // console.log(exam.data.Item.userData)
        //   // console.log(examData, userData)

        //   let correctCnt = 0;
        //   let totalCnt = 0;
        //   userData.forEach(el => {
        //     console.log("el", el);
        //     if(el.correct == true) {
        //       correctCnt++;
        //     }
        //     totalCnt++;

        //   })

        //   console.log("prev!", examData['previousExam']);

        //   if(examData['likeList'] != undefined) {
        //     examData['likeList'].forEach((li) => {
        //       if(li == username) {
        //         this.setState({amILiked: true})
        //       }
        //     })
        //   }

        //   // is in bookmark?
        //   let idxCurBookmarkList = this.state.bookmarkedList.findIndex(obj => obj.examType ==  type && obj.examNum == examNum)
        //   let isInCurBookmarkList = false;
        //   if(idxCurBookmarkList >= 0){
        //     isInCurBookmarkList = true
        //   }
        //   else{
        //     isInCurBookmarkList = false
        //   }

        //     this.setState({
        //         question: examData.question,
        //         choices: examData.choice,
        //         answer: examData.answer,
        //         choiceType: examData.choiceType,
        //         isLoading: false,
        //         correctTotalCount: examData.correctTotalCount === undefined ? 0 : examData.correctTotalCount,
        //         submitTotalCount: examData.submitTotalCount === undefined ? 1 : examData.submitTotalCount,

        //         previousExam: examData.previousExam === undefined ? [] : examData.previousExam,

        //         isSolved: isSolvedCheck ? true : false,

        //         mySubmitCount: totalCnt,
        //         myCorrectCount: correctCnt,
        //         myStarred: 0,
        //         likeList: examData['likeList'] == undefined ? [] : examData['likeList'],
        //         choicesRatio: examData.choicesRatio,

        //         examCreatedAt: examData.createAt * 1000,
        //         needHelp: examData.needHelp === undefined ? false : examData.needHelp,
        //         amIBookmarked: isInCurBookmarkList
        //     })
        // })
    }

    // post selected ratio
    async postChoiceRatio() {
      const examNum = parseInt(this.props.value.match.params.id);
      const examType = this.props.value.match.params.type;

      if(!this.state.answerState && this.state.selectedAnswer.length > 0) {
        let selectedAnswer = this.state.selectedAnswer
        let parseSelectedAnser = []
        selectedAnswer.forEach(li => {
          parseSelectedAnser.push(li.charCodeAt(0)-65+1)
        })
        console.log(parseSelectedAnser)

        const payload = {"order" : parseSelectedAnser}
        await api2.addChoiceRatio(examType, examNum, payload).then(res => {

          console.log(res)
        })
      }
    }

    viewAnswer() {
      
      // console.log("click")
      if(this.state.answerState) {
        this.setState({answerState: false});
      }
      else{
        this.setState({answerState: true});
      }
      
      
      this.postChoiceRatio()
      
      
      

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
      const type = this.props.value.match.params.type;
      // console.log("page", id);
      console.log(this.state.selectedAnswer);
      if(this.state.selectedAnswer.length === 0 && this.state.isSolved !== true) {
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

      // cookies.set('submitAnswer', prevSubmitAnswer, {path: '/exam/'+type})
      localStorage.setItem("submitAnswer", JSON.stringify(prevSubmitAnswer))

      this.postChoiceRatio()

      if(localStorage.getItem("random")=="true"){
        window.location.href= randomQuestionNum(type).toString();
        let savedQuestions = []
        let values;
        if (values = cookies.get('previousQuestions')){
          console.log(values);
          cookies.set('previousQuestions',values + ',' + id)
        } else {
          savedQuestions = id
          cookies.set('previousQuestions',savedQuestions)
        }
      } else {
        {
          window.location.href= (parseInt(id)+1).toString();
        }
      }

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

    addBookMark(value) {
      const examNum = parseInt(this.props.value.match.params.id);
      const examType = this.props.value.match.params.type;
      console.log(examNum, examType)
      let curBookmarkedList = this.state.bookmarkedList;
      // let currentExamObject = {'examType': examType, 'examNum': examNum};

      let isInCurBookmarkList = curBookmarkedList.findIndex(obj => obj.examType ==  examType && obj.examNum == examNum)

      if(!value){
        // console.log("yes")
        curBookmarkedList.splice(isInCurBookmarkList, 1)
      }
      else{
        curBookmarkedList.push({'examType': examType, 'examNum': examNum})

      }
      localStorage.setItem("bookmark", JSON.stringify(curBookmarkedList))
      this.setState({amIBookmarked: value})
    }


    render() {
      const { question, choices, answer, choiceType, examCreatedAt,
        starred, mySubmitCount, myCorrectCount, starredTotalCount,
        submitTotalCount, correctTotalCount, needHelp,
        isLoading, answerState, previousExam, likeList, amILiked, choicesRatio,
        bookmarkedList, amIBookmarked
       } = this.state;
      let answerToString = answer.join(',');

      let correctRatePrev = parseInt((parseInt(correctTotalCount)/parseInt(submitTotalCount)) * 100);
      // console.log(correctRatePrev)
      let correctRate = isNaN(correctRatePrev) ? "-" : correctRatePrev;

      console.log("t", examCreatedAt)

      // console.log("ratio", choicesRatio)
      // console.log(this.props);

      const examNum = this.props.value.match.params.id;
      const examType = this.props.value.match.params.type;
      let examNumKey = "exam-" + examNum;
      const examChoiceAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      let examChoiceIdx = 0;


      const answerStyle = {
            color: (answerState) ? 'green' : 'black'
          };
      const thumsUpStyle = {
        marginRight: '6px',
        verticalAlign: 'text-top'

      }

      const infoSmallTextStyle = {
        fontSize: '14px',
        color: '#999999'
      }

          // console.log("@@@@", correctTotalCount, submitTotalCount);
      return (



        <Card className="mt-4 mb-4" key={examNumKey}>
          <Card.Header as="h5" >

            <ButtonToolbar aria-label="Toolbar with button groups"
              className="justify-content-between"
            >
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button variant="outline-primary"  href={`/exam/${examType}/${examNum}`} >문제 {examNum}</Button>
                {
                  needHelp &&
                  <Button variant="danger" >검토필요</Button>
                }
                {
                  previousExam.map((name, index) => {
                    return <Button style={{fontSize: '13px', padding: '0px 8px'}} variant="outline-success" key={index}>{name.name}</Button>
                    // console.log(name, index)
                  })
                }
              </ButtonGroup>


              <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="outline-secondary"  style={{fontSize: '14px'}} >푼 횟수: {mySubmitCount}회</Button>
              <Button variant="outline-secondary"  style={{fontSize: '14px'}} >틀린 횟수: {mySubmitCount-myCorrectCount}회</Button>
              <Button variant="outline-secondary"  >정답률: {correctRate}%</Button>
              <Button variant="outline-primary" onClick={() => this.pushLike(examNum)} >

              {
                amILiked ? <FaThumbsUp style={thumsUpStyle}/>
                :
                <FaRegThumbsUp style={thumsUpStyle}/>

              }



              추천: {likeList.length}회</Button>
              {
                amIBookmarked ?
                <Button variant="outline-primary"
                  onClick={() => this.addBookMark(false)}
                >
                  <FaBookmark style={thumsUpStyle}/>
                  저장취소
                </Button>
                :
                <Button variant="outline-secondary"
                  onClick={() => this.addBookMark(true)}
                >
                  <FaBookmark style={thumsUpStyle}/>
                  저장
                </Button>
              }

              </ButtonGroup>
            </ButtonToolbar>

          </Card.Header>
          <Card.Body>

            <Card.Title>
              <Row>
                <Col md={10}>
                  카테고리: -
                </Col>

                <Col md={2} style={infoSmallTextStyle} className="text-right">
                  문제추가 {new Date(
                    examCreatedAt
                  ).toLocaleDateString()}
                </Col>
              </Row>

            </Card.Title>
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
                        <Form.Check defaultChecked={this.checkUserChoice(examNum, examChoiceAlpha[index])} inline style={{'color': 'black'}} label={choice} value={examChoiceAlpha[index]} name={answerName} type={thisChoiceType} id={answerKey} key={answerKey} />
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
              <Button onClick={() => this.saveAndNext(examNum)} variant="primary">저장 후 계속</Button>
              {/*<Button onClick={() => this.saveAndNext(examNum)} variant="primary">저장 후 계속</Button>*/}

            </ButtonToolbar>

            <Container>
            {
              answerState &&
              <div className="text-center mt-4">
                답안 선택률
              </div>
            }
            {
                choicesRatio.map((li, index) => {
                  const colorMap = ['success', 'info', 'warning', 'danger']
                  const choiceIndexMap = ['A','B','C','D','E','F','G','H','I','J']
                  const colorCode = colorMap[index%4]
                  const choicesRatioCountSum = choicesRatio.reduce((a, b) => a + b, 0)
                  let printRatioVal = 0;
                  if(choicesRatioCountSum === 0) {
                    printRatioVal = 25;
                  }
                  else{
                    printRatioVal = parseInt(li/choicesRatioCountSum * 100 * 10) / 10
                  }
                  return (
                    answerState &&
                    <Row>
                      <Col md={{span: 1, offset:3}} className="text-right">

                      </Col>
                      <Col md={{span: 4}}>
                        <ProgressBar className="mt-1" animated striped variant={colorCode} now={printRatioVal} label={`${choiceIndexMap[index]}  :  ${printRatioVal}%`}/>
                      </Col>
                      <Col md={{span: 4}}>

                      </Col>

                    </Row>

                  )
                })

            }
            </Container>



          </Card.Body>
        </Card>
      );
    }
}




export default ExamCard
