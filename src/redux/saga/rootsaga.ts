import { all } from "redux-saga/effects";
import authSaga from './auth.saga'
import productSaga from "./product.saga";
import shopSaga from "./shop.saga";


function* rootSaga() {
  yield all([
   authSaga(),
   productSaga(),
   shopSaga()
  ]);
}

export default rootSaga;
