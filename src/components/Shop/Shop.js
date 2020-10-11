import React, { Component } from 'react';
import './Shop.css';

class Shop extends Component {
    render() {
        return (
                 <div className="shop">
                     <span className="glyphicon glyphicon-home"></span>
                     <p className="userName"><b>{JSON.parse(localStorage.getItem('loggedInUser')).toUpperCase()}</b></p>
                </div>
           
        )
    }
}

export default Shop