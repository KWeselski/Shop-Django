import React, { Component} from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import { FormControlLabel, RadioGroup } from '@material-ui/core';
import { yellow, grey } from '@material-ui/core/colors';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {postOpinion} from './actions/cartActions'

class RatingStar extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            selectedValue: 1,
            opinion: "",
            productId: 0,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const {selectedValue,opinion,productId} = this.state;
        let sel = Number(selectedValue)
        this.props.postOpinion(sel,opinion,productId)
    }


    handleChange = event => {
        this.setState({ selectedValue: event.target.value});
    };

    handleChangeName = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      componentDidMount(){
            this.setState({ productId : this.props.productid})
      }

    render(){
        const {selectedValue,opinion,productId} = this.state;
        
        return (
        <div>
            <Typography style={{padding:30}} variant="h4">User Rating</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} textAlign="center"
                style={{ height: "50vh" }}
                verticalAlign="middle">
                    <Grid item xs={8}>
                        <TextField
                            autoComplete='opinion'
                            name="opinion"
                            variant="outlined"
                            required
                            fullWidth
                            id="opinion"
                            label="Opinion"
                            autoFocus
                            value={opinion}
                            onChange={this.handleChangeName}
                            />
                    </Grid>
                    <Grid item xs={8}>
                    <RadioGroup>
                        {[...Array(5)].map((star,i) => {
                            const rateValue = i+ 1;
                            return(
                                <div>
                                <FormControlLabel value={rateValue} checked={selectedValue==rateValue} control={<Radio onChange={this.handleChange}/>}/>
                                <StarIcon color={rateValue <= selectedValue ? "secondary" : "primary"} ></StarIcon></div>
                                )
                        })}
                    </RadioGroup>
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">                  
                        Send opinion
                    </Button>
                    </Grid>
                    </Grid>
                </form>             
            </div>
            )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        postOpinion : (rating,opinion,productid) => {dispatch(postOpinion(rating,opinion,productid))}
    }
}
export default connect(null,mapDispatchToProps)(RatingStar)