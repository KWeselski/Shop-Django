import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Typography, Button, TextField,Input} from '@material-ui/core/';
import {removeItem, addQuantity, subtractQuantity, orderAdd} from './actions/cartActions'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

class Cart extends Component{

    handleRemove = (id) =>{
        this.props.removeItem(id);
    }

    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    handleMakeOrder = (addedItems)=>{
        this.props.addOrder(addedItems);
    }

    getTotal = (price,quantity)=>{
        return price*quantity
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });      
      };

    render(){         
        const {total} = this.props;

        let addedItems = this.props.items.length ?
            (         
                <TableContainer>
                <TableHead>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total price</TableCell>
                        </TableRow>
                     </TableHead>
                    <TableBody>
                        {this.props.items.map(item=> {
                            if(item.on_discount==true){
                                item.price = item.discount_price
                            }
                            return(
                                <TableRow key={item.id}>
                                    <TableCell style={{width:60, height:60}}><img src={String(item.image).split('frontend')[1]} width="60" height="60"/></TableCell>
                                    <TableCell component="th" scope="row"><b>{item.name}</b></TableCell>
                                    <TableCell style={{ width: 160 }} align="right">{item.price}$</TableCell>
                                    <TableCell style={{ width: 160 }} align="right">{item.quantity}</TableCell>
                                    <TableCell style={{ width: 160 }} align="right">{ this.getTotal(item.price,item.quantity).toFixed(2)}$</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}><ArrowDropUpIcon/></i></Link>
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}><ArrowDropDownIcon/></i></Link>
                                        <DeleteIcon onClick={()=>{this.handleRemove(item.id)}}> </DeleteIcon>
                                    </TableCell>
                                </TableRow> )                 
                        })}
                    </TableBody>
                </TableContainer>             
            ):(
                <p>Nothing.</p>
            )
            return(
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>You have ordered:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <div className="cart">      
                        <ul className="collection">
                            {addedItems}
                        </ul>
                         </div>
                    </Grid>  
                    <Grid item xs={2}>
                    <Paper style={{height:350}}>
                        <Grid containter style={{height:'100%', position:'relative'}}xs={12}>
                            <Grid item xs={12} style={{width:'100%', position:'absolute', marginTop: '15%'}}>
                            <Typography variant='h5'>Total to pay: {this.props.total}<b>$</b></Typography>
                            </Grid>
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12}>                    
                            <Link to='/checkout'><Button style={{width:'100%' ,position:'absolute', bottom:0}} variant="contained" color='primary' onClick={()=>{this.handleMakeOrder(this.props.items)}}>Make Order</Button></Link>
                            </Grid>
                        </Grid>                                        
                    </Paper>
                    </Grid> 
                </Grid>             
            )
    }
}

const mapStateToProps = (state) => {
    return{
        items: state.cart.addedItems,
        total :state.cart.total,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addQuantity: (id)=> {dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
        removeItem: (id) => {dispatch(removeItem(id))},
        addOrder: (addedItems) => {dispatch(orderAdd(addedItems))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)