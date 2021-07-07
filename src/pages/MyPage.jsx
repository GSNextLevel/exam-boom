import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import api from '../api';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class MyPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isValidToken: false,
            email: '',
            nickname: '',
            emailValidation: false
        };
    }
    componentDidMount() {
        let { token } = JSON.parse(localStorage.getItem("userToken"));
        let decoded = jwt_decode(token);
        let email = decoded.email; 
        api.getUser(email)
        .then((result)=> {
            this.setState({isValidToken: true});
            let { email,nickname,emailValidation } = result.data;
            this.setState({ email, nickname, emailValidation });
        }).catch((err) => {
            localStorage.removeItem("userToken");
            window.href = "/";
        });
    }
    render() {
        let { email,nickname,emailValidation } = this.state;
        return (
            <div>
                <p>email: {email}</p>
                <p>현재 닉네임: {nickname} </p>
                <p>이메일 인증여부: {emailValidation? 'yes': 'no'} </p>
            </div>
        );
    }
}

export default MyPage;