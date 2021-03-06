import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api2 from '../api';

import "../style/login.css"

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

        // console.log(name, value);
        this.setState({
            [name]: value
        })
    }
    emailValidation(email) {
        
        // let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        let emailValid = email.match(/^([\w.%+-]+)@(gsneotek.com)$/i);
        

        if(email == '') return false;
        if(!emailValid) return false;
        return true;
    }
    passwordValidation(password) {
        if(password == '') return false;
        if(password.length < 6) return false;
        return true;
    }
    nicknameValidation(nickname) {
        if(nickname == '') return false;
        return true;
    }

    handleSubmit(event) {
        const { email, password, nickname } = this.state;
        const payload = { email, password, nickname }

        

        if(!this.emailValidation(email)){
            console.log("email error");

            event.preventDefault();
            return;
        }
        
        if(!this.passwordValidation(password)){
            console.log("password error");

            event.preventDefault();
            return;
        }

        if(!this.nicknameValidation(nickname)){
            console.log("nickname error");

            event.preventDefault();
            return;
        }


        console.log(email, password, nickname)
        api2.signup(payload)
        .then((result) => {
            console.log(result)
            alert("???????????? ??????. ????????? ??????????????????..");
            window.location.href = '/';
        }).catch((err)=> {
            console.log(err);
            alert("??????!");
            // window.location.href = '/signup';
        });
        event.preventDefault();
    }

    render() {
        return (
            <Container id="login-container" >
                <div className="login-div">
                    <h4 className="login-header">????????????</h4>
                    <form className ="login-form">
                        <div className="login-text-area">
                            <input 
                                type="email" 
                                className="login-text-input"
                                id="inputEmail" aria-describedby="emailHelp" placeholder="gsneotek.com ???????????? ???????????????"
                                name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>

                        <div className="login-text-area">
                            <input 
                                type="text" 
                                className="login-text-input"
                                id="inputNickname" aria-describedby="nicknameHelp" placeholder="???????????? ???????????????"
                                name="nickname" value={this.state.nickname} onChange={this.handleChange} />
                            
                        </div>

                        <div className="login-text-area">
                            <input 
                                type="password" 
                                className="login-text-input"
                                id="inputPassword1" placeholder="???????????? 6?????????"
                                name="password" 
                                value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <input type="submit" value="??????" onClick={this.handleSubmit}  className="login-btn" />
                    </form>
                 </div>   
                
            </Container>
        );
    }
}

export default SignUp;