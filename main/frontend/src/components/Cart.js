import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeItem, addQuantity, subtractQuantity} from './actions/cartActions'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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

    render(){
        console.log(this.props)
        const {total} = this.props;
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return(
                        <li key={item.id}>
                            <div>
                                <span>{item.name}</span>
                                <p>{item.description}</p>
                                <p><b>Price {item.price}$</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b> 
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}><ArrowDropUpIcon/></i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}><ArrowDropDownIcon/></i></Link>
                                </div>
                                
                            </div>
                            <button onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                        </li>
                    )
                })
            ):(
                <p>Nothing.</p>
            )
            return(
                <div className="container">
                    <div className="cart">
                        <h5>You have ordered: </h5>
                        <ul className="collection">
                            {addedItems}
                        </ul>
                    </div>
                    <div><b>Total to pay:</b> {this.props.total}</div>
                </div>              
            )
    }
}

const mapStateToProps = (state) => {
    return{
        items: state.addedItems,
        total :state.total,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addQuantity: (id)=> {dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
        removeItem: (id) => {dispatch(removeItem(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)