import React, { Component} from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Radio from '@material-ui/core/Radio';
import { RadioGroup } from '@material-ui/core';
import { yellow, grey } from '@material-ui/core/colors';

class RatingStar extends Component {
 
    constructor(props){
        super(props);
    }
    state = {
        selectedValue: 1
    }

    handleChange = event => {
        this.setState({ selectedValue: event.target.value});
    };
    
    render(){
        const selectedValue = this.state.selectedValue;
        return (

            <div>
            {[...Array(5)].map((star,i) => { 
                const rateValue = i+1;          
                    return (
                    <label>
                    <Radio color="default" checked={selectedValue==rateValue}  value={rateValue} onChange={this.handleChange}/>
                        <StarIcon color={rateValue <= selectedValue ? "secondary" : "primary"} ></StarIcon>
                    </label>)})}
            </div>
            )
    }
}


export default RatingStar;