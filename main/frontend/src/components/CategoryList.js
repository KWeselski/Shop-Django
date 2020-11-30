import React , {Component} from 'react';

export default class CategoryList extends Component{
    constructor(props){
        super (props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
         };
        }   
        
        componentDidMount(){
           fetch("api/products/<slug:category_slug>").then(response => {
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
    


}