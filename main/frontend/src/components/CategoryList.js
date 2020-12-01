import React , {Component} from 'react';
import Button from '@material-ui/core/Button';
export default class CategoryList extends Component{
    constructor(props){
        super (props);

        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
         };

        }

        onChangeLink(index) {
            this.state.api_link = ('http://127.0.0.1:8000/api/category/' + String(index));
            //this.state.product_loaded = false;
            this.props.changeLink(this.state.api_link);          
        }
           
        async componentDidMount(){
           fetch("http://127.0.0.1:8000/api/category/").then(response => {
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
            return(
                <div id="categoryList">
                    <ul>
                        {data_.map((value,index) => {                    
                            return(
                                <div>
                                <Button onClick={this.onChangeLink.bind(this,index+1)} color='primary'>{value.name}</Button>
                                </div>)          
                        })}
                    </ul>
                </div>
            )
            }
            else{return(<h1>Data is not working</h1>)}
        }
    }