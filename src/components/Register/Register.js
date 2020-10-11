import React, {Component} from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import Login from '../Login/Login';
import LogoBar from '../../containers/LogoBar/LogoBar';
import './Register.css';
class Register extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            pwd: [],
            userName: null,
            password: null,
            confirmPassword: null,
            status: false,
            status1: false
        }

        this.userNameHandler = this.userNameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
    }

    // gets username from input
    userNameHandler = event => {
        this.setState({
            userName: event.target.value
        })
    }

    //gets password from input
    passwordHandler = event => {
        this.setState({
           password: event.target.value
        })
    }

    //gets password-to-confirm from input
    confirmPasswordHandler = event => {
      this.setState({
          confirmPassword: event.target.value
      })
    }

    componentDidMount() {

        let userDt = JSON.parse(localStorage.getItem('user')) || [];
        let pwdDt = JSON.parse(localStorage.getItem('password')) || [];
        this.setState({
            user: [...userDt],
            pwd: [...pwdDt]
        })
        
    }

    // below function is for user- registration
    registrationHandler = () => {
        if(this.state.password != null && this.state.confirmPassword != null && this.state.password == this.state.confirmPassword && this.state.userName != null) {

            this.setState({
                status: true
            })

            let  userArray  = this.state.user;
            userArray.push(this.state.userName);
            localStorage.setItem('user', JSON.stringify(userArray));

            let pwdArray = this.state.pwd;
            pwdArray.push(this.state.password);
            localStorage.setItem('password', JSON.stringify(pwdArray))
    
            alert("Registration successful!");

        }
        else if(this.state.password != null && this.state.confirmPassword != null && this.state.password != this.state.confirmPassword && this.state.userName != null) {
            alert("Passwords don't match. Try again.");
        }
        else if(this.state.password == null || this.state.confirmPassword == null || this.state.userName == null) {
            alert("Missing items!!");
        }
       
      
    }

    // function to set state to "true" to navigate to login page
    loginHandler = () => {
        this.setState({
            status: true
        })
    }
    render() {

        console.log("userInfo -->", this.state.userName);
        let regLink = null;

        if(this.state.password == this.state.confirmPassword && this.state.password != null && this.state.confirmPassword != null && this.state.userName != null) {
            regLink = <Link to="/login">
                        <button type="button" id="regBtn" className="btn" onClick={() => this.registrationHandler()}>Register</button>
                      </Link>;
        }
        else {
            regLink = <Link to="login">
                        <button type="button"  id="regBtn" className="btn" onClick={() => this.registrationHandler()}>Register</button>
                      </Link>;
        }
        
        if(this.state.status) {
            return <Route path="/login" component={Login} />  
        }
        return (
            <div className="Register">
                <header>
                    <LogoBar />
                </header>
                <h3 className="reg">Registration</h3>
                <h5 className="reg">UserName: <input type="text" className="form-control" onChange={(event) => this.userNameHandler(event)} /></h5>
                <h5 className="reg">Password: <input type="password" className="form-control" onChange={(event) => this.passwordHandler(event)} /></h5>
                <h5 className="reg">Confirm Password: <input type="password"  className="form-control" onChange={(event) => this.confirmPasswordHandler(event)} /></h5>
                {regLink}
                <h5 className="reg">If already registered, please <NavLink to="/login"><span style={{color: 'red'}} onClick={() => this.loginHandler()}>Login</span></NavLink></h5>
            </div>
        )
        
    }
}

export default Register