import React, {Component} from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import Register from '../Register/Register';

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <NavLink to="/" exact></NavLink>
                <Route path="/" component={Register} />
                
            </div>
        )
    
        
   //     }
    }
}
export default Home