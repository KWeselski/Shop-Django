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
         data:[]
        };     
        }
        componentDidMount(){
            fetch(categoryListURL).then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        console.log('error')
                        return { placeholder: "Something went wrong"};
                    });
                }
                return response.json();
            })
          .then(data => {
              this.setState(() => {
                  return { 
                      data,
                      loaded:true
                  };
              });
          });       
         }     
      
        render(){
        console.log(this.props)
        const {error, loading, products} = this.props;
        let item = this.state.data;
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
                    </div>
                    ) 
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