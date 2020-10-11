import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {

    constructor(props) {
        super(props);
    }

    /* componentDidUpdate() {
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let getCount = JSON.parse(localStorage.getItem(currentUser + "_notlength")) || 0;
        if(getCount != this.props.count) {
            this.setState({
                count: this.props.count
            })
        }
    } */
    
    render() {
       
        return (
            <div className="cart">
                 <span class="glyphicon glyphicon-shopping-cart"></span>
                 <p>{this.props.count}</p>
            </div>
        )
    }
}

export default Cart