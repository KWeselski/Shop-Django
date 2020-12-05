import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom'
import Navbar from './NavBar';
import ProductList from './ProductList';
import {Provider} from 'react-redux';
import cartReducer from './reducers/cartReducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {fetchProducts} from './actions/cartActions';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import ProductListByCategory from './ProductListByCategory'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const store = createStore(cartReducer,applyMiddleware(thunk))
store.dispatch(fetchProducts())

const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>      
        <Component {...props}/>
      </div>
    )}/>
)

export default class App extends Component{
    render(){      
        return(
            <div className="App">
            <Router>
                <div> 
                    <Navbar/>
                    <CategoryList/>                     
                    <Switch>
                        <Route exact path='/' component={ProductList}/>
                        <Route exact path='/product/:productID' component={ProductDetail}/>
                        <Route exact path='/category/:categoryID' component={ProductListByCategory}/>
                        <Route exact path="/cart" component={Cart}/>
                    </Switch>
                </div>
            </Router>        
         </div>          
        );
        }
}
   

const appDiv = document.getElementById("app");
ReactDOM.render(<Provider store={store}><App/></Provider>, appDiv);


