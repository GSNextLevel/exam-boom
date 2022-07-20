import React, { Component, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { ExamCard } from '../components';

import api2 from '../api';

class AddExam extends Component {
    constructor(props) {
      super(props);
      this.state = {
        examType: '',
        examContent: '',
        similarity: 0,
        resultIdx: 0,
        resultContent: '',
        resultNum: 0
      }

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.checkExam = this.checkExam.bind(this);
    }

    async checkExam() {
        const { examType, examContent, resultNum } = this.state;
        console.log(examType)
        console.log(examContent)
        const payload = { 
            "type": examType, 
            "content": examContent 
        }

        await api2.checkWordSimilarity(payload)
        .then((result) => {
            console.log(result)

            this.setState({
                similarity: result.data.similarity,
                resultIdx: result.data.examIdx,
                resultContent: result.data.content,
                resultNum: result.data.examNum
            })
            
        }).catch((err)=> {
            console.log(err);
            alert("실패!");
            // window.location.href = '/signup';
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log(name, value);
        this.setState({
            [name]: value
        })
    }

    render() {
        const { examType, similarity, resultIdx, resultContent, resultNum } = this.state;
        return (
            <Container className="mt-4">
                
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>문제유형 ex) sap, adp, tfa</Form.Label>
                    <Form.Control type="text" placeholder="sap" value={this.state.examType} name="examType" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>문제 본문</Form.Label>
                    <Form.Control as="textarea" rows={6} value={this.state.examContent} name="examContent" onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="primary" onClick={this.checkExam}>
                        유사도 확인
                    </Button>
                </Form>
                
                <div className="mt-4">
                    <p>유사도 : <b>{this.state.similarity || "검사 전"}</b></p>
                    <p>문제번호 : {this.state.resultIdx || "-"}</p>
                    <p >문제링크 : <a href={`/exam/${examType}/${resultNum}`} >{examType}/{resultNum}</a></p>
                    <p>문제 본문 : {this.state.resultContent || "검사 전"}</p>
                </div>
                


            </Container>
        )

    }
}

export default AddExam;
