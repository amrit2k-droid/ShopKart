import React, {Component} from 'react';
import LogoBar from '../../../containers/LogoBar/LogoBar';
import Cart from '../../Cart/Cart';
import MyCart from '../../Cart/MyCart/MyCart';
import Shop from '../../Shop/Shop';
import ShopMe from '../../Shop/ShopMe/ShopMe';
import './WelcomePage.css';
import { Link, NavLink, Route, Switch } from 'react-router-dom';

class WelcomePage extends Component {

    constructor() {
        super();
        this.state = {
            notLength: 0,
            status: false
        }
        this.navigateToRegister = this.navigateToRegister.bind(this);
        this.signoutHandler = this.signoutHandler.bind(this);
    }

    // navigates to register page on click of "ShopKart" logo
    navigateToRegister = () => {
        window.location.href = '/';
    }

    // function to signout - navigates to the register page
    signoutHandler = () => {
        window.location.href= "/";
    }

    render() {
        console.log(this.state.notLength);
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let getNotLength = 0;
        let productArray = JSON.parse(localStorage.getItem(currentUser + "_productarray")) || [];
        let count = 0;
        for(let i = 0; i < productArray.length; i++) {
            if(productArray[i] == "0") {
                count = Number(count) + 1;
            }
        }
        
        if(count  === productArray.length) {
            getNotLength = 0;
        }
        else {
            getNotLength = JSON.parse(localStorage.getItem(currentUser + "_notlength"))
        }
        return (
            <div className="WelcomePage">
                <div className="topbar">
                    <LogoBar  clicked={() => this.navigateToRegister()} />
                    <NavLink to="/login/welcome">
                        <Shop />
                    </NavLink>
                    <NavLink to="/login/welcome/mycart">
                        <Cart count={getNotLength} />
                    </NavLink>
                    <div className="signout" onClick={() => this.signoutHandler()}>
                        <span class="glyphicon glyphicon-log-out"></span>   
                    </div>
                    
                </div>
                <Switch>
                    <Route path="/login/welcome/mycart" component={MyCart} />
                    <Route path="/login/welcome" component={ShopMe} />
                </Switch>

                {this.state.notlength}
            </div>
        )
       
    }
}

export default WelcomePage