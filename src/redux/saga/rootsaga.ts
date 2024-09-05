import { all } from "redux-saga/effects";
import authSaga from './auth.saga'
import productSaga from "./product.saga";
import shopSaga from "./shop.saga";
import productTransactionSaga from "./product.transaction.saga";


function* rootSaga() {
  yield all([
   authSaga(),
   productSaga(),
   shopSaga(),
   productTransactionSaga()
  ]);
}

export default rootSaga;
