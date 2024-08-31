import { combineReducers } from "redux";
import authReducer from './auth.slice';
import productReduer from './product.slice'


let rootSlice= combineReducers({
   authReducer,
   productReduer
})

export type rootReducerType=ReturnType<typeof rootSlice>;

export default rootSlice
