import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {productListURL} from "./constants";
import {connect} from 'react-redux'
import { fetchProducts } from "./actions/cartActions";

class ProductList extends Component{
    constructor(props){
        super (props);
        this.state = {
         };
         
        }   
      
        render(){
        console.log(this.props)
        const {error, loading, products} = this.props;
        
        if (error){
            return<div>Errro! {error.message}</div>
        }
        if (loading){
            return <div>Loading...</div>
        }
        return(   
            <Grid container spacing={24}>
                {products.map((value,index) => {                    
                return(
                    <div>
                    <Grid item xs={6}> <ProductDiv temp={products[index]}/></Grid>
                    </div>)          
                })}
            </Grid>);
        }
        };
const mapStateToProps = state => ({
        products: state.items,
        loading: state.loading,
        error: state.error
});
/*const mapDispatchToProps= (dispatch)=>{    
    return{
        fetchProducts : dispatch(fetchProducts())
    }
}*/
 
export default connect(mapStateToProps)(ProductList);    