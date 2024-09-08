import { AxiosResponse } from "axios";
import { debounce, put, takeEvery } from "redux-saga/effects";

import { baseInstance } from "../../service/instance";
import { toastError, toastSuccess } from "../../shared/toast";
import { endpoint } from "../../shared/apiEndpoint";
import {
  addExpensesFailure,
  addExpensesSuccess,
  deleteExpensesFailure,
  deleteExpensesSuccess,
  editExpensesFailure,
  editExpensesSuccess,
  listExpensesFailure,
  listExpensesSuccess,
} from "../features/expenses.slice";

function* addExpensesSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.post(
      endpoint.addExpenses,
      payload
    );
    if (data) {
      yield put(addExpensesSuccess(data));
      successCallback();
      toastSuccess("added");
    }
  } catch (err: any) {
    toastError(err.response.data.result);
    yield put(addExpensesFailure(err));
  }
}

function* listExpensesSaga(action: any) {
  const { shopid, expensesname } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.get(
      endpoint.getExpenses,
      {
        params: {
          expensesname: expensesname || "",
        },
        headers: {
          Authorization: shopid,
        },
      }
    );
    if (data) {
      yield put(listExpensesSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(listExpensesFailure(err));
  }
}

function* deleteExpensesSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.delete(
      endpoint.deleteExpenses,
      { params: payload }
    );
    if (data) {
      yield put(deleteExpensesSuccess(data));
      successCallback();
      toastSuccess("deleted");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(deleteExpensesFailure(err));
  }
}

function* editExpensesSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.patch(
      endpoint.editExpenses,
      payload
    );
    if (data) {
      yield put(editExpensesSuccess(data));
      successCallback();
      toastSuccess("updated");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(editExpensesFailure(err));
  }
}

function* expensesSaga() {
  yield takeEvery("expensesSlice/addExpenses", addExpensesSaga);
  yield debounce(500,"expensesSlice/listExpenses", listExpensesSaga);
  yield takeEvery("expensesSlice/deleteExpenses", deleteExpensesSaga);
  yield takeEvery("expensesSlice/editExpenses", editExpensesSaga);
}

export default expensesSaga;
