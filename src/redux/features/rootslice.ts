import { combineReducers } from "redux";
import authReducer from './auth.slice';
import productReduer from './product.slice'
import shopReducer from './shop.slice'


let rootSlice= combineReducers({
   authReducer,
   productReduer,
   shopReducer
})

export type rootReducerType=ReturnType<typeof rootSlice>;

export default rootSlice
