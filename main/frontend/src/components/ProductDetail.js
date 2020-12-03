import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import {productDetailURL, ProductDetailURL} from "./constants";
import {connect} from 'react-redux'
import { addToCart } from './actions/cartActions'
import { fetchProductsID } from "./actions/cartActions";
import { Link } from 'react-router-dom';

class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            data:[]     
        }   
    }
    componentDidMount(){
        /*const { match : {params} } = this.props;
        this.props.fetchProductsID(params.productID);*/
        this.getProductDetails();
    }

    handleClick = (id) => { 
        console.log('Yhm')     
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

        let image = String(item.image).split('frontend')[1]
        let available = String(item.available) ? 'Dostępny' : 'Niedostępny'
        
        return(        
            <Paper elevation={3} style={{ display: "flex"}}>
                 <div id="productDetail">
                    <h1>{item.name}</h1>
                    <p>{item.category_name}</p>
                    <p>{item.description}</p>               
                    <p>{item.price}</p>
                    <p>{available}</p>
                    <p>{item.id}</p>
                </div>
                <div id="productDetailImg">
                <img src={image} width="300" height="300"/>
                </div>
                <Button style={{float:"right"}} variant="contained" onClick={()=>{this.handleClick(item.id)}} color='primary'>
                    Add to Cart
                </Button>
                <div>Total to pay: {total}</div>
                <Link to="/"><Button variant="contained" color='primary' >Home</Button></Link> 
            </Paper>
           
        );
    }

}
const mapStateToProps = state => ({
    products: state.items,
    loading: state.loading,
    error: state.error,
    total : state.total
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