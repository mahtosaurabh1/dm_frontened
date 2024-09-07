import { AppBar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../../redux/features/rootslice";

export const DashboardHeader = () => {
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );
  return (
    <Box ml={'.8rem'}>
      <Typography fontWeight={"bold"}>
        {selectedShop?.shopname}(Shop)
      </Typography>
    </Box>
  );
};
