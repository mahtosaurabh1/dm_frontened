import { all } from "redux-saga/effects";
import authSaga from './auth.saga'
import productSaga from "./product.saga";


function* rootSaga() {
  yield all([
   authSaga(),
   productSaga()
  ]);
}

export default rootSaga;
