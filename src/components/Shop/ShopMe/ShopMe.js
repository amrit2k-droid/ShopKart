import React, {Component} from 'react';
import './ShopMe.css';

class ShopMe extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            productQuantity: [],
            quantityInCart: 0
        }
        this.decQuantityHandler = this.decQuantityHandler.bind(this);
        this.incQuantityHandler = this.incQuantityHandler.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    componentDidMount() {
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                console.log("products -->", data);
                localStorage.setItem(currentUser + "_productlist", JSON.stringify(data));
            })

        let productArray = []
        if(localStorage.getItem(currentUser + "_productarray")) {
            productArray = JSON.parse(localStorage.getItem(currentUser + "_productarray"));
        }
        else {
            let productList = JSON.parse(localStorage.getItem(currentUser + "_productlist")) || []
            for(let i = 0; i < productList.length; i++) {
                productArray[i] = "0"
            }
        }

        this.setState({
            products: JSON.parse(localStorage.getItem(currentUser + "_productlist")),
            productQuantity: productArray,
            status: false
        })
    }

    // function increases the quantity of product
    incQuantityHandler = id => {
        console.log("rowid -->", id);
       let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
       let productQuantity = [];
       if(localStorage.getItem(currentUser + "_productarray")) {
           productQuantity = JSON.parse(localStorage.getItem(currentUser + "_productarray"));
       }

       else {
            for(let i = 0; i < this.state.products.length; i++) {
                productQuantity[i] = "0";
            }
       }

       for(let i = 0; i < productQuantity.length; i++) {
           if(id === i) {
               productQuantity[i]  = Number(productQuantity[i]) + 1;
           }
       }
       localStorage.setItem(currentUser + "_productarray", JSON.stringify(productQuantity));
       this.setState({
           productQuantity: productQuantity
       })
    }

    // function increses the quantity of product
    decQuantityHandler = id => {
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let productQuantity = [];
        if(localStorage.getItem(currentUser + "_productarray")) {
            productQuantity = JSON.parse(localStorage.getItem(currentUser + "_productarray"));
        }
        else {
            for(let i = 0; i < this.state.products.length; i++) {
               productQuantity[i] = "0";
            }
        }
        for(let i = 0; i < productQuantity.length; i++) {
            if((id === i) && Number(productQuantity[i]) >= 1) {
                productQuantity[i]  = Number(productQuantity[i]) - 1;
            }
        }
        localStorage.setItem(currentUser + "_productarray", JSON.stringify(productQuantity));
        this.setState({
            productQuantity: productQuantity
        })
    }

    // function add the selected products to cart
    addToCartHandler = () => {
        alert("Products added to the cart. Please go to cart to place order.");
        let quantityInCart = 0;
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
        let quantity = JSON.parse(localStorage.getItem(currentUser + "_quantity"));
        quantityInCart = quantity.length;

        localStorage.setItem(currentUser + "_notlength", JSON.stringify(quantityInCart));
       
    }

    render() {

        let products = [];
        if(this.state.products) {
            products = this.state.products
        }
        let addToCart = [];
        let quantity = [];
        let price = [];
        for(let i = 0; i < this.state.productQuantity.length; i++) {
            if(Number(this.state.productQuantity[i]) >= 1) {
                addToCart.push(this.state.products[i]);
                quantity.push(this.state.productQuantity[i]);
                price.push(Number(this.state.products[i].product_price) * Number(this.state.productQuantity[i]))
            }
        }
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(addToCart.length > 0) {
            localStorage.setItem(currentUser + "_addtocart", JSON.stringify(addToCart));
            localStorage.setItem(currentUser + "_quantity", JSON.stringify(quantity));
            localStorage.setItem(currentUser + "_price", JSON.stringify(price));
        }
        console.log(this.state.quantityInCart);
        return (
            <div className="ShopMe">

                <div className="shopping">
                    <h5 className="pdtHeader">PRODUCT LIST</h5>
                    <table className="pdtTable">
                        {products.map((product, rowId) => (
                            <tr key={product.product_id} style={{border: "1px solid black", textAlign: "left"}}>
                                <td><img src={product.product_image} style={{height: "100px", width: "100px", marginTop: "10px"}} /></td>
                                    <td>
                                        <p><b>PRODUCT: </b>{product.product_name}</p>
                                        <p><b>DESC: </b>{product.product_desc}</p>
                                        <p><b>QUANTITY: </b>{product.product_quantity}</p>
                                        <p><b>PRICE: </b>Rs.{product.product_price}</p>
                                    </td>
                                    <td onClick={() => this.decQuantityHandler(rowId)}><span class="glyphicon glyphicon-minus"></span></td>
                                    <td>{this.state.productQuantity[rowId]}</td>
                                    <td onClick={() => this.incQuantityHandler(rowId)}><span class="glyphicon glyphicon-plus"></span></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="addtocart">
                    <table className="cartTable">
                        {addToCart.map((pdtToAdd, rowId) => (
                            <tr key={pdtToAdd.product_id} style={{border: "1px solid black", textAlign: "left"}}>
                                <td><img src={pdtToAdd.product_image} style={{height: "100px", width: "100px", marginTop: "10px"}} /></td>
                                <td>
                                        <p><b>PRODUCT: </b>{pdtToAdd.product_name}</p>
                                        <p><b>DESC: </b>{pdtToAdd.product_desc}</p>
                                        <p><b>QTY SELECTED: </b>{quantity[rowId]}</p>
                                        <p><b>TOTAL PRICE: </b>Rs.{price[rowId]}</p>
                                    </td>
                            </tr>
                        ))}
                    </table>
                    {addToCart.length > 0 ?
                         <button type="button" className="btn" id="addToCartBtn" onClick={() => this.addToCartHandler()}>ADD TO CART</button> :
                         <div></div>
                    } 
                   
                </div>
            </div>
        )
       
    }
}

export default ShopMe