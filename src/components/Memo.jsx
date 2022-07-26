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
import Spinner from 'react-bootstrap/Spinner';

import { FaThumbsUp, FaRegThumbsUp, FaBookmark } from 'react-icons/fa';

import { randomQuestionNum } from '../utils/random';

import Cookies from 'universal-cookie';

class ExamCard extends Component {
    constructor(props) {
      super(props);
      console.log(props)
      const cookies = new Cookies();
      const username = cookies.get('username');

      this.state = {
          memoContent: '',
          isFirst: true,
          memoId: 0,
          spinnerState: 'none',
          typeTimestamp: 0
          
      }
      // console.log(examNum);
    }



    componentDidMount = async () => {
        const examNum = this.props.value.match.params.id;
        const type = this.props.value.match.params.type;

        const { username, memoContent} = this.state;

        await api2.getMemo(type, examNum, username).then(memo => {
            console.log(memo)
            memo = memo['data']
            console.log(memo['own'])

            if(memo["own"]['memo_id'] != 0) {
                this.setState({ memoContent: memo['own']['content'], 
                isFirst: false,
                memoId: memo['own']['memo_id']
             });
                
            }
        })
    }

    async updateMemo() {
        const { username, memoContent, isFirst, memoId, spinnerState} = this.state;
        const examNum = this.props.value.match.params.id;
        const type = this.props.value.match.params.type;
        this.setState({ spinnerState: 'inline-block' }) 

        if(isFirst) {
            const payload = {
                "content": memoContent
            }
            await api2.createMemo(type, examNum, payload).then(res => {
                console.log(res)
                setTimeout(() => {
                    this.setState({ spinnerState: 'none' }) 
                }, 1000);
                
            })
        }
        else{
            // alert(memoId)
            const payload = {
                "content": memoContent,
                "memo_id": memoId
            }
            await api2.updateMemo(type, examNum, payload).then(res => {
                console.log(res)
                setTimeout(() => {
                    this.setState({ spinnerState: 'none' }) 
                }, 1000);
            })
        }

        console.log(spinnerState)
    }

    onChangeText(e) {
        // console.log(e.target.value)
        this.setState({ memoContent: e.target.value });
    }


    render() {
      const { memoContent, spinnerState} = this.state;
      
    //   let spinnerStateStyle = {
    //     display: spinnerState ? 'inline' : 'none'
    //   }

      return (

        <div style={{marginTop: '140px', marginRight: '12px'}}>
            {/* <span>나만의 메모</span> */}
            <Form>
                <Form.Label> <span style={{display: 'inline-block', verticalAlign: 'super'}}>나만의 메모</span> <Spinner style={{display: `${this.state.spinnerState}`}} animation="grow" variant="success" /> </Form.Label>
                <Form.Control as="textarea" rows={15} value={memoContent} onChange={this.onChangeText.bind(this)} />
                <Button variant="primary" style={{width: '100%', marginTop:'8px'}} onClick={this.updateMemo.bind(this)} >메모저장</Button>
            </Form>
        </div>
      );
    }
}




export default ExamCard
