import React from 'react'
import shop from '../../images/shop.png';
import './LogoBar.css';

const LogoBar = props => {
    return(
        <div className="LogoBar" onClick={props.clicked}>
            <img src={shop} className="shopLogo"/>
            <p className="shopText"> SHOP<span style={{color: 'red'}}>-</span>KART</p>
        </div>
    )
}

export default LogoBar