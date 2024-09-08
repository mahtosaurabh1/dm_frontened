import { createSlice } from "@reduxjs/toolkit";

export interface expensesType {
    loading: boolean,
    expensesList:[],
    error: Error | null;
}

const initialState : expensesType = {
    loading : false,
    expensesList:[],
    error: null
}


export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addExpenses: (state,action)=>{
            state.loading = true;
        },
        addExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        addExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        editExpenses: (state,action)=>{
            state.loading = true;
        },
        editExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        editExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        listExpenses: (state,action)=>{
            state.loading = true;
        },
        listExpensesSuccess: (state,action) =>{
            state.expensesList=action.payload
            state.loading = false;
        },
        listExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        deleteExpenses: (state,action)=>{
            state.loading = true;
        },
        deleteExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        deleteExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    }
}) 

export const { addExpenses,addExpensesFailure,addExpensesSuccess,listExpenses,listExpensesSuccess,listExpensesFailure,deleteExpenses,deleteExpensesSuccess,deleteExpensesFailure,editExpenses,editExpensesSuccess,editExpensesFailure} =expensesSlice.actions;

export default expensesSlice.reducer;