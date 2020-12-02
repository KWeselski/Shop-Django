import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import {productDetailURL, ProductDetailURL} from "./constants";
import { withRouter } from "react-router-dom";

export default class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            data:[],
            loading: false,
        }       
    }

    componentDidMount(){
        this.getProductDetails();
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
        const{data, loading} = this.state;
        console.log('Product detail data: ', data)
        const item = data;
        let image = String(item.image).split('frontend')[1]
        console.log(image)
        return(
            <div>
                <h3>{item.name}</h3>
                <p>{item.category_name}</p>
                <p>{item.description}</p>
                <div><img src={image} width="200" height="200"/></div>
                <p>{item.price}</p>
                <p>{item.available}</p>
            </div>
        );
    }

}

