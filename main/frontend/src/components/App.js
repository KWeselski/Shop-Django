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
import Footer from './Footer'
import Payment from './Payment'
import * as actions from './actions/authActions';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Crimson Text',
    ].join(','),
  },});


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
     
        return(
          <ThemeProvider theme={theme}>
            <div className="App">
            <Router>
                  <div>
                    <Navbar/>
                    <CategoryList/>
                    <Grid container direction="row" xs={12} >
                      <Grid item xs={2}></Grid>             
                      <Grid container xs={8}>                  
                        <Switch>
                            <Route exact path='/' component={ProductList}/>
                            <Route exact path='/product/:productID' component={ProductDetail}/>
                            <Route exact path='/category/:categoryID' component={ProductListByCategory}/>
                            <Route exact path="/cart" component={Cart}/>
                            <Route exact path='/signup' component={Registration}/>
                            <Route exact path='/login' component={LoginForm}/>
                            <Route exact path='/checkout' component={Checkout}/>
                            <Route exact path='/search/:query' component={ProductListByCategory}/>
                            <Route exact path='/payment' component={Payment}/>
                        </Switch>
                      </Grid>
                      <Grid item xs={2}></Grid>     
                    </Grid>                  
                    </div> 
                    <Footer/>                
            </Router>        
         </div>
         </ThemeProvider>
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




