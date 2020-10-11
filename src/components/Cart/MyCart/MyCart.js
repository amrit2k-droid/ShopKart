import React, { Component } from 'react';
import './MyCart.css';

class MyCart extends Component {

    constructor() {
        super();
        this.state  = {
            cartProducts: [],
            quantity: [],
            price: [],
            totalPrice: 0,
            cartStatus: false
        }

        this.clearCartHandler = this.clearCartHandler.bind(this);
        this.placeOrderHandler = this.placeOrderHandler.bind(this);
    }

    componentDidMount() {
       let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
       let productArray = [];
       let cartProducts = [];
       let quantity = [];
       let price = [];
       let cartStatus = false
        productArray = JSON.parse(localStorage.getItem(currentUser + "_productarray"));
        let count = 0;
       for(let i = 0; i < productArray.length; i++) {
            if(productArray[i] == "0") {
                count = Number(count) + 1;
            }
       }
       if(count !== productArray.length) {
        cartProducts =  JSON.parse(localStorage.getItem(currentUser + "_addtocart"));
        quantity = JSON.parse(localStorage.getItem(currentUser + "_quantity"));
        price = JSON.parse(localStorage.getItem(currentUser + "_price")); 
       }
       else {
           cartStatus = true
       }
       
       let totalPrice = 0;
       for(let i = 0; i < price.length; i++) {
         totalPrice = Number(totalPrice) + Number(price[i]);
       }


       this.setState({
           cartProducts: cartProducts,
           quantity: quantity,
           price: price,
           totalPrice: totalPrice,
         /*   status: false */
           cartStatus: cartStatus
       })
    }

    // the below function clears cart on button click.
    clearCartHandler = () => {
        this.setState({
            cartProducts: [],
            quantity: [],
            price: [],
            cartStatus: true
        })

        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let products = localStorage.getItem(currentUser + "_productlist") || [];
        let productArray = [];
        for(let i = 0; i < products.length; i++) {
            productArray[i] = "0"
        }
        localStorage.setItem(currentUser + "_productarray", JSON.stringify(productArray));
    }

    // below function places order on button click
    placeOrderHandler() {
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let todaysDate = new Date().toLocaleDateString();
        let dateOfDelivery = todaysDate + 7;
        let price = this.state.totalPrice.toString();
        alert("Hi " + currentUser + " .Your order amounting to Rs." + price + " has"
            + " been placed on " + todaysDate + " .Estimated date of delivery is " + dateOfDelivery +
            " .Thank you for shopping!!");
    }

    render() {
        return (
            <div className="shopme">
                {!this.state.cartStatus ?
                    <h5 className="cartPdtHeader">CART PRODUCTS</h5> :
                    <h5></h5>
                }
                
                <table className="orderTable">
                    {this.state.cartProducts.map((product, rowId) => (
                        <tr key={product.product_id} style={{border: "1px solid black", textAlign: "left"}}>
                            <td><img src={product.product_image} style={{height: "100px", width: "100px", marginTop: "10px"}} /></td>
                                <td>
                                        <p><b>PRODUCT: </b>{product.product_name}</p>
                                        <p><b>DESC: </b>{product.product_desc}</p>
                                        <p><b>QTY SELECTED: </b>{this.state.quantity[rowId]}</p>
                                        <p><b>TOTAL PRICE:</b>Rs.{this.state.price[rowId]}</p>
                                </td>
                        </tr>
                    ))}
                </table>
                {!this.state.cartStatus ?
                    <div className="placeOrder">
                    <p className="totalPrice"><b>TOTAL PRICE OF CART: </b>Rs. {this.state.totalPrice}</p>
                    <button type="button"  className="btn" id="clearCartBtn" onClick={() => this.clearCartHandler()} style={{display:'inline-block'}}>CLEAR CART</button>
                    <button type="button" className="btn" id="payBtn" onClick={() => this.placeOrderHandler()}>PLACE ORDER</button>
                </div> :
                <div className="defaultMessage">
                     <img src="https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"  className="defaultImg"/>
                     <div className="sampleText"><b>Please add some products!</b></div>
                </div>  
                }
                
            </div>
        )
    }
}

export default MyCart