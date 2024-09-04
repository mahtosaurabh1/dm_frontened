import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { rootReducerType } from '../../../redux/features/rootslice'
import BuySellPopup from './buy.sell.popup'

function Business() {
  const [open, setOpen] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct,setSelectedProduct]=useState<any>({});
  const {selectedShop}:any=useSelector((state:rootReducerType)=>state.shopReducer);


  const dialogClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };
  return (
    <Box p={2}> 
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">{selectedShop?.shopname}(Shop)</Typography>
       <Box sx={{display:'flex',gap:'1rem'}}>
       <Button variant="outlined" onClick={dialogOpen}>
          Add business
        </Button>
       </Box>
      </Box>

      <BuySellPopup
          dialogClose={dialogClose}
          dialogOpen={dialogOpen}
          open={open}
          isedit={isedit}
          selectedProduct={selectedProduct}
        />
    </Box>
  )
}

export default Business