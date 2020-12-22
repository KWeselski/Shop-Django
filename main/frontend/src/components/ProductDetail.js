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
import axios from 'axios'
import OpinionsForm from './OpinionsForm'
import Rating from '@material-ui/lab/Rating';

class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            data:[], 
            opinions_:[],
            opinion_exist:false,  
        }   
    }
    componentDidMount(){
        this.getProductDetails();
        this.getOpinion();
          
    }

    handleClick = (id) => {    
        this.props.addToCart(id);
    }

   getOpinion(){
        const { match : {params} } = this.props;
        this.getOpinions(params.productID);      
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
                 };
             });
         });       
        }  

    getOpinions(productId){
                axios.get(`http://127.0.0.1:8000/api/get_opinions/${productId}`, {
                    headers: {Authorization: `${localStorage.getItem("token")}`}
                }).then(res => {           
                    return res.data          
                }).then(data => {
                    this.setState(()=> {
                        return {
                            opinions_:data
                        }
                    })
                })
                .catch(error => console.log(error));
            }

    componentDidUpdate(prevState){     
        if(prevState.opinions_ !== this.state.opinions_){
            if(this.state.opinion_exist == false){
                this.checkExistingOpinion();
        }
    }
    }
    checkExistingOpinion(){
       const {opinions_ } = this.state;
       const {username} = this.props;
       {opinions_.map((value,index) => {                    
            if(value.user == username){
                this.setState({opinion_exist:true})
            }
        })}  
    }      

    render(){
        const {data,opinions_,opinion_exist} = this.state; 
        const item = data;
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
                        {item.on_discount ? (<span>
                            <Typography align='left' variant="h5">Price: {item.price}$ </Typography>
                            <Typography align='left' variant="h5">Discount price: {item.discount_price}$ </Typography></span> )
                         : <Typography align='left' variant="h5">Price: {item.price}$ </Typography>}    
                        <Typography align='left' variant="h6">{available}</Typography> 
                        <Rating value={Number(item.rating)} readOnly='true'/>   
                        </span> 
                        </Paper> 
                        <RatingStar opinion_status={opinion_exist}  productid = {params.productID}/>
                        <Grid container spacing={2}>        
                        {opinions_.map((value,index) => {                    
                            return(
                            <Grid item xs={12} >
                                <OpinionsForm temp={opinions_[index]}/>
                            </Grid>
                            ) 
                        })}                    
                    </Grid> 
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
    total : state.cart.total,
    username: state.auth.username
});

const mapDispatchToProps = (dispatch) => {
    return{
      fetchProductsID: (id) => {
            dispatch(fetchProductsID(id))
      },  
      addToCart: (id) => {
         dispatch(addToCart(id))
      },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);    