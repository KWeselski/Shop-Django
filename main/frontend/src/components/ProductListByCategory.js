import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {productListByCategoryURL} from "./constants";

export default class ProductListByCategory extends Component{
    constructor(props){
        super (props);
        this.state = {
            data: [],
            placeholder: "Loading",
            loaded : false
         };
        }   

        getData(){
            const { match : {params} } = this.props;
            fetch(productListByCategoryURL(params.categoryID)).then(response => {
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
        componentDidUpdate(){
            if(this.state.loaded==true){
            }
            else{this.getData();}         
        }
        componentDidMount(){
           this.getData();
        }    
    render(){
        const {data, loaded} = this.state;
        if (loaded == true){
        return(   
            <Grid container spacing={24}>
                {data.map((value,index) => {                    
                return(
                    <div>
                    <Grid item xs={6}> <ProductDiv temp={data[index]}/></Grid>
                    </div>)          
                })}
            </Grid>);
        }
        else{
            return(
                <div></div>
            )
        };
        }
}


