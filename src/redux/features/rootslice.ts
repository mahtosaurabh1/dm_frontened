import { combineReducers } from "redux";
import authReducer from './auth.slice';
import productReduer from './product.slice'
import shopReducer from './shop.slice';
import productTransactionReducer from "./product.transaction.slice";


let rootSlice= combineReducers({
   authReducer,
   productReduer,
   shopReducer,
   productTransactionReducer
})

export type rootReducerType=ReturnType<typeof rootSlice>;

export default rootSlice
