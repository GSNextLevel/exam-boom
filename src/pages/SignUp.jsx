import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api2 from '../api';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            nickname: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        const { email, password, nickname } = this.state;
        const payload = { email, password, nickname }
        // alert(email);

        console.log(email, password, nickname)
        api2.signup(payload)
        .then((result) => {
            console.log(result)
            alert("회원가입 성공. 인증을 기다려주세요..");
            window.location.href = '/';
        }).catch((err)=> {
            alert("실패!");
            window.location.href = '/signup';
        });
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <p />
                {/* <Form onSubmit={this.handleSubmit}> */}
                <Form >
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email 주소</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="이메일을 입력하세요"
                            name="email" value={this.state.email} onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputNickname">닉네임</label>
                        <input type="nickname" className="form-control" id="inputNickname" aria-describedby="nicknameHelp" placeholder="닉네임을 입력하세요"
                            name="nickname" value={this.state.nickname} onChange={this.handleChange} />
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="비밀번호"
                            name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <Button onClick={this.handleSubmit}  className="btn btn-primary">제출</Button>
                </Form>
            </Container>
        );
    }
}

export default SignUp;