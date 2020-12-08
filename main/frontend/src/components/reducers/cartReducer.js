import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, PRODUCTS_NAMES} from '../actions/action-types/cart-actions'
import {productListURL} from '../constants'

const initState = {
    items: [],
    loading:false,
    error:null,
    addedItems:[],
    total: 0
}

const cartReducer=(state= initState, action)=>{   
    if(action.type == PRODUCTS_NAMES.START_FETCH){
        return{...state,
        loading:true,
        error: null}
    }
    if(action.type == PRODUCTS_NAMES.FAIL_FETCH){
        return{...state,
        loading:false,
        error:action.payload.error,
        items:[]}
    }
    if(action.type == PRODUCTS_NAMES.FINISH_FETCH){
        
        return Object.assign({}, state, {
            items: state.items.concat(action.payload.products),
            loading:false
        });
        /*return{...state,
        loading:false,
        items: action.payload.products}*/
    }
    if(action.type == ADD_TO_CART){
        

        let addedItem = state.items.find(item => item.id == action.id)
        
        let existingItem = state.addedItems.find(item => action.id == item.id)
        if(existingItem){
            addedItem.quantity += 1
            return{
                ...state,
                total: Number(state.total) + Number(addedItem.price)
            }
        }
        else{ 
            addedItem.quantity = 1;    
            let newTotal = Number(state.total) + Number(addedItem.price)
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
            }
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = Number((state.total)) - Number((itemToRemove.price * itemToRemove.quantity ))
        
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    


    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = Number(state.total) + Number(addedItem.price)
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = Number(state.total) - Number(addedItem.price)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = Number(state.total) - Number(addedItem.price)
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    else{
        return state
    }
}

export default cartReducer