import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import {productDetailURL, ProductDetailURL} from "./constants";
import {connect} from 'react-redux'
import { addToCart } from './actions/cartActions'
import { fetchProductsID } from "./actions/cartActions";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import RatingStar from './RatingStar';

class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            data:[]     
        }   
    }
    componentDidMount(){
        this.getProductDetails();
    }

    handleClick = (id) => {    
        this.props.addToCart(id);
    }

    getProductDetails() {
        const { match : {params} } = this.props;
        fetch(productDetailURL(params.productID)).then(response => {
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
        const {data} = this.state;   
        const item = data;
        const {total,products} = this.props;
        const { match : {params} } = this.props;
        let available = String(item.available) ? 'Dostępny' : 'Niedostępny'       
        return(                  
                <Grid container xs={12} style={{height:'40%'}}>
                    <Grid container xs={6}>
                        <Paper elevation={3} style={{width:'100%', height:'50%'}}>         
                        <span>
                        <Typography align='center' variant="h2">{item.name}</Typography>                       
                        <Typography align='center' variant="h5">{item.category_name}</Typography>   
                        <Typography align='justify' variant="h6">{item.description}</Typography>    
                        <Typography align='left' variant="h5">{item.price}$ </Typography>   
                        <Typography align='left' variant="h6">{available}</Typography> 
                        <Typography align='left' variant="h6">Rating: {}</Typography>    
                        </span> 
                        </Paper> 
                        <RatingStar productid = {params.productID}/>
                    </Grid> 
                    <Grid item xs={2}>
                        
                    </Grid>           
                    <Grid item xs={3}>
                        <Paper elevation={3} style={{width:'100%'}}>       
                        <div id="productDetailImg">
                            <img src={String(item.image).split('frontend')[1]} width="300" height="300"/>
                        </div>
                        </Paper>
                    <Link to="/cart">
                        <Button variant="contained" onClick={()=>{this.handleClick(item.id)}} color='primary'>Add to Cart</Button>
                     </Link>
                    </Grid>                        
                </Grid>       
        );
    }

}
const mapStateToProps = state => ({
    products: state.cart.items,
    loading: state.cart.loading,
    error: state.cart.error,
    total : state.cart.total
});

const mapDispatchToProps = (dispatch) => {
    return{
      fetchProductsID: (id) => {
            dispatch(fetchProductsID(id))
         },  
      addToCart: (id) => {
         dispatch(addToCart(id))
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);    