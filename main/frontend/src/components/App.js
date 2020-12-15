import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';
import Registration from './RegistrationForm';
import LoginForm from './LoginForm';
import Cart from './Cart'
import ProductListByCategory from './ProductListByCategory'
import Checkout from './Checkout'
import * as actions from './actions/authActions';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


class App extends Component{
    componentDidMount() {
      this.props.onTryAutoSignup();
    }

    render(){ 
        const {isAuthenticated} = this.props;
        console.log(isAuthenticated)     
        return(
            <div className="App">
            <Router>   
                    <Navbar/>
                    <Grid container direction="row" xs={12} >
                      <Grid item xs={1}></Grid>  
                      <Grid item xs={2}><CategoryList/></Grid>  
                                
                      <Grid container xs={6}>                  
                        <Switch>
                            <Route exact path='/' component={ProductList}/>
                            <Route exact path='/product/:productID' component={ProductDetail}/>
                            <Route exact path='/category/:categoryID' component={ProductListByCategory}/>
                            <Route exact path="/cart" component={Cart}/>
                            <Route exact path='/signup' component={Registration}/>
                            <Route exact path='/login' component={LoginForm}/>
                            <Route exact path='/checkout' component={Checkout}/>
                        </Switch>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid> 
            </Router>        
         </div>          
        );
        }
}
   
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);




