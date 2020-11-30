import React , {Component} from 'react';
import Button from '@material-ui/core/Button';
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
           fetch("api/category/").then(response => {
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
            if (this.state.loaded == true){
                let data_ = this.state.data;
                console.log(data_)
            return(
                <div>
                    <ul>
                        {data_.map((value,index) => {                    
                            return(
                                <div>
                                <Button href="" color='primary'>{value.name}</Button>
                                </div>)          
                        })}
                    </ul>
                </div>
            )
            }
            else{return(<h1>Data is not working</h1>)}
        }
    }