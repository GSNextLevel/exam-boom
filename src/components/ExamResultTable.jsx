import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Table from 'react-bootstrap/Table';





// import { ExamCardSelect } from '../components'

class ExamResultTable extends Component {
    constructor(props) {
      super(props);

      this.state = {
          question: "",
          choices: [],
          answer: [],
          choiceType: "",
          isLoading: false,
          answerState: false
      }



    }

    componentDidMount = async () => {

    }


    render() {

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
      return (

        <Table className="mt-4" bordered  size="sm">

          <tbody>
            <tr>
              <td style={correctAnswer} >1</td>
              <td style={correctAnswer} >2</td>
              <td style={correctAnswer} >3</td>
              <td style={correctAnswer} >4</td>
              <td style={correctAnswer} >5</td>
              <td style={correctAnswer} >6</td>
              <td style={wrongAnswer} >7</td>
              <td style={correctAnswer} >8</td>
              <td style={correctAnswer} >9</td>
              <td style={correctAnswer} >10</td>

              <td style={correctAnswer} >11</td>
              <td style={correctAnswer} >12</td>
              <td style={wrongAnswer} >13</td>
              <td style={correctAnswer} >14</td>
              <td style={correctAnswer} >15</td>
              <td style={wrongAnswer} >16</td>
              <td style={correctAnswer} >17</td>
              <td style={correctAnswer} >18</td>
              <td style={correctAnswer} >19</td>
              <td style={correctAnswer} >20</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </Table>
      );
    }
}




export default ExamResultTable
