import React , {Component} from 'react';
import Button from '@material-ui/core/Button';
import {categoryListURL} from "./constants";
import {Link, BrowserRouter as Router, Switch} from 'react-router-dom';

class CategoryList extends Component{
    constructor(props){
        super (props)

        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
         }; 
        }             
        async componentDidMount(){
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
            const {data} = this.state;
            if (this.state.loaded == true){
                let item = data;     
            return(
                <div id="categoryList">          
                    <ul>
                        <li><Link to={'/'}><Button variant="contained">Wszystkie</Button></Link></li>
                        {item.map((value,index) => {                   
                              return(                           
                                <li><Link to={`/category/${value.slug}`}><Button variant="contained">{value.name}</Button></Link></li>)          
                        })}
                    </ul>
                </div>
            )
            }
            else{return(<h1>Data is not working</h1>)}
        }
}
export default (CategoryList);

//<Link to={`/category/${value.slug}`}
