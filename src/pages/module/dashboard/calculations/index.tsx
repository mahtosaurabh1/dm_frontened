import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getTotalExpenses } from "../../../../redux/features/expenses.slice";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";

export const Calculations =()=>{
    const { selectedShop }: any = useSelector(
        (state: rootReducerType) => state.shopReducer
      );
      const {totalExpense}:any=useSelector((state:rootReducerType)=>state.expensesReducer);
    const dispatch=useDispatch();
    useEffect(()=>{
        const paramAs = { shopid: selectedShop?._id };
        dispatch(getTotalExpenses(paramAs));
    },[])
    return(
        <Box>
            <Box>
            <Typography>Shop Expenses {totalExpense?.totalExpenses}</Typography>
            </Box>
            <Box>
                
            </Box>
        </Box>
    )
}