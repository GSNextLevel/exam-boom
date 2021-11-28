import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import api2 from '../api';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "../style/login.css"

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
        console.log(email, password);

        api2.login(email, password)
        .then((result) => {
            console.log(result)
            // console.log(result.body)

            if(result.status !== 200) {
                console.log("login error")
                // alert("로그인 실패!");
            } 

            else {
                localStorage.setItem('userToken',result.data.token);
                localStorage.setItem('user_id',result.data.user_id);
                console.log("login ok");
                // alert("로그인 성공 ");
                // window.location.href = '/';
            }
        }).catch((err) =>{
            console.log("login catch error")
            // alert("로그인 실패!", err)
        } )
        
    }

    render() {
        return (
            <Container id="login-container" >
                <div className="login-div">
                    <h4 className="login-header">로그인</h4>
                    <form className ="login-form" onSubmit={this.handleSubmit}>
                    <div className="login-text-area">
                        <input
                        type="text"
                        id="inputEmail"
                        name="email"
                        className="login-text-input"
                        placeholder="이메일"

                        value={this.state.email} onChange={this.handleChange}
                        />
                    </div>
                    <div className="login-text-area">
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-text-input"
                        placeholder="비밀번호"
                        value={this.state.password} onChange={this.handleChange}

                        />
                    </div>
                    <input
                        type="submit"
                        value="로그인"
                        className="login-btn"

                    />
                    </form>
                    <a className="login-link" href="/signup">회원가입</a>
                </div>
                
                {/* <p />
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
                <Link to='/signup'>
                    <p></p>
                    <Button className="btn-dark">회원가입</Button>
                </Link> */}
            </Container>
        );
    }
}

export default Login;