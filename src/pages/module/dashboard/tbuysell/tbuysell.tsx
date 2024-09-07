import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";
import {
  deleteProductTransaction,
  listProductTransaction,
} from "../../../../redux/features/product.transaction.slice";
import { useDispatch } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Total() {
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  const { productTransaction } = useSelector(
    (state: rootReducerType) => state.productTransactionReducer
  );
  const dispatch = useDispatch();

  const columns: GridColDef[] = [
    { field: "productname", headerName: "Product Name", flex: 1 },
    //   { field: "productprice", headerName: "Product Price", flex: 1 },
    { field: "totalWeight", headerName: "Weight", flex: 1 },
    {
      field: "transactionstatus",
      headerName: "Transaction Status",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.transactionstatus === 1 ? "Sell" : "Buy"}</span>
      ),
    },
    { field: "transactionprice", headerName: "Total price", flex: 1 },
  ];


  const handleBuyClic=()=>{
    const obj = { shopid: selectedShop?._id ,transactionstatus:0,deal:'deal'};
    dispatch(listProductTransaction(obj));
  }

  const handleSellClick=()=>{
    const obj = { shopid: selectedShop?._id ,transactionstatus:1,deal:'deal'};
    dispatch(listProductTransaction(obj));
  }
  useEffect(() => {
    const obj = { shopid: selectedShop?._id ,transactionstatus:0,deal:'deal'};
    dispatch(listProductTransaction(obj));
  }, []);
  return (
    <Box p={2} sx={{ width: "80rem" }}>
        <Box>
            <Button onClick={handleBuyClic}>Buy</Button>
            <Button onClick={handleSellClick}>Sell</Button>
        </Box>
      <DataGrid
        rows={productTransaction}
        columns={columns}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        hideFooter
      />
    </Box>
  );
}

export default Total;