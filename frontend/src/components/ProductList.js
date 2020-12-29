import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {categoryListURL} from "./constants";
import {connect} from 'react-redux'
import { fetchProducts } from "./actions/cartActions";
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
class ProductList extends Component{
    constructor(props){
        super (props);
        this.state = {
        };     
    }   
             
        render(){       
        const {error, loading, products} = this.props;
        if (error){
            return<div>Error! {error.message}</div>
        }
        if (loading){
            return <div>Loading...</div>
        }
        return(   
            <Grid container spacing={1} style={{marginTop:10}}>        
                {products.map((value,index) => {                    
                return(
                        <Grid item>
                            <ProductDiv temp={products[index]}/>
                        </Grid>
                    ) 
                })}          
                
            </Grid>);         
        }
        };
        
const mapStateToProps = state => ({
        products: state.cart.items,
        loading: state.cart.loading,
        error: state.cart.error
});
const mapDispatchToProps= (dispatch)=>{    
    return{
        fetchProducts : dispatch(fetchProducts())
    }
}
 
export default connect(mapStateToProps)(ProductList);    