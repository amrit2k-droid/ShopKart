import React, {Component} from 'react';
import WelcomePage from '../Welcome/WelcomePage/WelcomePage';
import {Link, Route, Redirect, withRouter} from 'react-router-dom';
import LogoBar from '../../containers/LogoBar/LogoBar'
//import { Redirect } from 'react-router-dom';

import './Login.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            userName: null,
            password: null,
            status: false,
            returnBool: false,
            userArray: [],
            pwdArray: [],
            userValidation: false,
            setStatusForLoggedIn: []
        }

        this.userNameHandler = this.userNameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.returnHomeHandler = this.returnHomeHandler.bind(this);
    }


    componentDidMount() {

        let userDt = [];
        let pwdDt = [];
        userDt = JSON.parse(localStorage.getItem('user'));
        pwdDt = JSON.parse(localStorage.getItem('password'));
        this.setState({
            returnBool: false,
            userArray: userDt,
            pwdArray: pwdDt
        })
    }

    // gets username from input for login
    userNameHandler = event => {
        this.setState({
            userName: event.target.value
        })
    }

    // gets password for login
    passwordHandler = event => {
        this.setState({
            password: event.target.value
        })
    }

    // below function authenticates the user for login
    loginHandler = () => {
  
        let count = 0;
        if(this.state.userArray && this.state.pwdArray && this.state.userName && this.state.password) {
            let userValidation = false;
            let pwdValidation  = false;
            let userIndex = 0;
            let count = 0;
            for(let i = 0; i < this.state.userArray.length; i++) {
                if(this.state.userName.localeCompare(this.state.userArray[i]) === 0) {
                    userValidation = true;
                    userIndex = i;
                    break;
                }
                else {
                    count = Number(count) + 1;
                }
            }

            if(userValidation) {

                if(this.state.password.localeCompare(this.state.pwdArray[userIndex]) == 0) {
                    pwdValidation = true;
                }
            }

            if(pwdValidation ) {
                alert("Login successful, Welcome!!");
                this.setState({
                    status: true
                })
                localStorage.setItem('loggedInUser', JSON.stringify(this.state.userName));
            }

            if(!pwdValidation) {
                alert("Wrong username OR password. Please check the creds and try again.");
            }

        }

        if(!this.state.userName || !this.state.password) {
            alert("Missing items! Please fill all the fields to proceed");
        }

        //check if the present user is mapped with 'user' key in LS and then pop it.
        let loggedInUsers = [];
        let setStatusForLoggedIn = [];   //set default status for each logged in user
        let loggedInBefore = JSON.parse(localStorage.getItem('user')) || [];
        let currLoggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
        for(let i = 0; i < loggedInBefore.length; i++) {
            if(loggedInBefore[i].localeCompare(currLoggedIn) != 0) {
                loggedInUsers.push(loggedInBefore[i]);
           //     setStatusForLoggedIn.push("0");
            }
        }

        localStorage.setItem(currLoggedIn + "_to_add", JSON.stringify(loggedInUsers));
    }

    // returns to registration page on clicking of "ShopKart" logo
    returnHomeHandler = () => {
        this.setState({
            returnBool: true
        })
    }

    render() {

        const { userArray, pwdArray } = this.state;
        console.log("login User -->", userArray);
        console.log("login password -->", pwdArray);
        console.log(this.state.userDt);

        const { returnBool } = this.state;
       if(returnBool) {
           //
           return window.location.href="/"
       }
       console.log(this.state.status1);
        if(this.state.status) {
        return <Route path="/login/welcome"  component={WelcomePage} />
          /*  return <WelcomePage /> */
            /*  return <Route path="/welcome" component={WelcomePage} /> */
        }
        return (
            <div className="Login">
                <header>
                    <LogoBar 
                        clicked={() => this.returnHomeHandler()}
                    />
                </header>
                <h3 className="lgn">Login</h3>
                <h5 className="lgn">UserName: <input type="text" className="form-control" onChange={(event) => this.userNameHandler(event)} /></h5>
                <h5 className="lgn">Password: <input type="password" className="form-control" onChange={(event) => this.passwordHandler(event)} /></h5>
                <Link to="/login/welcome">
                    <button type="button" id="loginBtn" className="btn" onClick={() => this.loginHandler()}>Login</button>
                </Link>
            </div>
        ) 
    }
}

export default Login