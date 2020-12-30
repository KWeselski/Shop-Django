import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {productDetailURL, getOpinionsURL} from "./constants";
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
    
    /*Get product from api */
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
                axios.get(getOpinionsURL(productId), {
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
                this.checkExistingOpinion();}
            }
        }

    checkExistingOpinion(){
       const {opinions_ } = this.state;
       const {username} = this.props;
       {opinions_.map((value,index) => {                    
            if(value.user == username){
                this.setState({opinion_exist:true})
            }}
        )}  
    }      

    render(){
        const {data,opinions_,opinion_exist} = this.state; 
        const {username} = this.props;
        const item = data;
        const { match : {params} } = this.props;
        let numberOpinions = opinions_.length;
        let available = String(item.available) ? 'Avaiable' : 'Unavaiable' 
        return(  
             <Grid container xs={12} style={{height:'40%'}}>
                    <Grid item xs={2}>             
                    </Grid> 
                    <Grid container xs={8}>
                        <Grid item xs={6}>    
                            <div style={{maxWidth: '100%', height:'auto'}}>
                                <img src={String(item.image).split('frontend')[1]} style={{verticalAlign:'middle', width:'100%'}}/>                           
                            </div>
                            <div>
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
                            </div>
                        </Grid>
                        <Grid item xs={6}>   
                            <div style={{display:'flex', flexDirection:'column', paddingLeft:0 , marginBottom:0}}>
                                <div className={'Product-item'}>
                                    <Typography align='center' variant="h6">{item.name}</Typography> 
                                </div>
                                <div className={'Product-item'} >
                                    <Rating value={Number(item.rating)} readOnly='true'></Rating> ({numberOpinions}) Reviews
                                </div>
                                <div className={'Product-item'}>
                                    {item.on_discount ? (<span>
                                    <Typography align='left' variant="h8">Price: {item.price}$ </Typography>
                                    <Typography align='left' variant="h8">Discount price: {item.discount_price}$ </Typography></span> )
                                    : <Typography align='left' variant="h8">Price: {item.price}$ </Typography>}    
                                </div>
                                <div className={'Product-item'}>
                                <Typography align='justify' variant="h8">{item.description}</Typography>
                                </div>
                                <div id="CartButton" >
                                <Link to="/cart">
                                <Button variant="contained" disabled={!this.props.available} onClick={()=>{this.handleClick(item.id)}} color='primary'>Add to Cart</Button>
                             </Link>
                                </div> 
                            </div>
                        </Grid>                             
                    </Grid>                           
                    <Grid item xs={2}></Grid>               
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