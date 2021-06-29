import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
        event.preventDefault();
        const { email, password } = this.state;
        // const payload = { email, password }
        // alert(email);
        api.login(email, password)
        .then((result) => {
            // console.log(result)
            // console.log(result.body)

            if(result.data.statusCode === 401) alert("로그인 실패!");

            else {
                localStorage.setItem('userToken',result.data.body);
                alert("로그인 성공 ");
                window.location.href = '/';
            }
        }).catch((err) =>{
            alert("로그인 실패!", err)
        } )
        
    }

    render() {
        return (
            <Container>
                <p />
                <Form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email 주소</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="이메일을 입력하세요"
                            name="email" value={this.state.email} onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="비밀번호"
                            name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <Button type="submit" className="btn btn-primary">로그인</Button>
                </Form>
            </Container>
        );
    }
}

export default Login;