import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import CloseIcon from "@mui/icons-material/Close";
import {
  addProduct,
  editProduct,
  listProduct,
} from "../../../redux/features/product.slice";
import { BuySellEnum } from "../../../shared/constant";
import { addProductTransaction, editProductTransaction, listProductTransaction } from "../../../redux/features/product.transaction.slice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface propsType {
  dialogClose: () => void;
  dialogOpen: () => void;
  open: boolean;
  isedit: boolean;
  selectedProduct: any;
}

interface productType {
  productname: string;
  productprice: number;
  weight: number;
  transactionstatus:number
}
export default function BuySellPopup(props: propsType) {
  const { dialogClose, isedit, open, selectedProduct } = props;

  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );
  const { selectedShop }: any = useSelector(
    (state: rootReducerType) => state.shopReducer
  );

  const { productList }: any = useSelector(
    (state: rootReducerType) => state.productReduer
  );

  const [productInfo, setProductInfo] = React.useState<productType>({
    productname: "",
    productprice: 0,
    weight: 0,
    transactionstatus:0
  });

  const [chips, setChips] = React.useState<any>(null);

  const handleDelete = () => {
    setChips(null);
  };

  const handleAddChip = (event: any, newValue: any) => {
    setChips(newValue)
  };


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductInfo({ ...productInfo, transactionstatus: Number(event.target.value) });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleShopnameChange = (shopname: string) => {
    setProductInfo({ ...productInfo, [shopname]: shopname });
    if (shopname.trim().length !== 0) {
      const obj = { shopid: selectedShop?._id, productname: shopname };
      dispatch(listProduct(obj));
    }
  };

  const handleButton = () => {
    if (isedit) {
      let obj = {
        productname: chips?.productname,
        productid:chips?._id,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        producttransactionid: selectedProduct?._id,
        transactionstatus:productInfo?.transactionstatus,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listProductTransaction(paramAs));
          dialogClose();
        },
      };
      dispatch(editProductTransaction(obj));
    } else {
      let obj = {
        productname: chips?.productname,
        productid:chips?._id,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        shopid: selectedShop?._id,
        transactionstatus:productInfo?.transactionstatus,
        successCallback: () => {
          const paramAs = { shopid: selectedShop?._id };
          dispatch(listProductTransaction(paramAs));
          dialogClose();
        },
      };

      console.log('aaaaaaaaaaaa',obj);
      

      dispatch(addProductTransaction(obj));
    }
  };

  const handleDialogClose = () => {
    setProductInfo({
      productname: "",
      productprice: 0,
      weight: 0,
      transactionstatus:1
    });
    dialogClose();
  };

  React.useEffect(() => {
    if (isedit) {
      setProductInfo({
        productname: selectedProduct?.productname,
        productprice: selectedProduct?.productprice,
        weight: selectedProduct?.weight,
        transactionstatus:selectedProduct?.transactionstatus
      });
      setChips(selectedProduct)
    }
  }, [selectedProduct, isedit]);


  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {isedit ? "Edit transaction" : "Add transaction"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleDialogClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <Autocomplete
          freeSolo
          options={productList}
          getOptionLabel={(option: any) => option.productname}
          disableClearable
          onInputChange={(event, newInputValue) =>
            handleShopnameChange(newInputValue)
          }
          value={null}
          onChange={(event, newValue) => handleAddChip(event, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add products"
              variant="outlined"
              fullWidth
            //   value={productInfo.productname}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                   {
                    chips &&  <Chip
                    // key={index}
                    label={chips?.productname}
                    size="small"
                    color="primary"
                    onDelete={handleDelete}
                    deleteIcon={<CloseIcon />}
                    style={{ marginRight: 4 }}
                  />
                   }
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Product price"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          type="number"
          name="productprice"
          value={productInfo.productprice}
          onChange={handleChange}
        />
        <TextField
          label="Product weight in kg"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          type="number"
          name="weight"
          value={productInfo.weight}
          onChange={handleChange}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Transaction Type</FormLabel>
          <RadioGroup
            aria-label="transaction"
            name="transaction"
            value={productInfo?.transactionstatus}
            onChange={handleRadioChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value={BuySellEnum.BUY} control={<Radio />} label="Buy" />
            <FormControlLabel value={BuySellEnum.SELL} control={<Radio />} label="Sell" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton}>{isedit ? "Edit" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
}
