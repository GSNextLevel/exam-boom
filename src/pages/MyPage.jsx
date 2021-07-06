import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import api from '../api';

class MyPage extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let { token } = JSON.parse(localStorage.getItem("userToken"));
        let decoded = jwt_decode(token);
        let email = decoded.email; 
        api.getUser(email)
        .then((result)=> {
            console.log(result)
        });
    }
    render() {
        return (
            <div>
                <p>email: </p>
                <p>별명: </p>
                <p>이메일 인증여부: </p>
            </div>
        );
    }
}

export default MyPage;