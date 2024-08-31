import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import { addProduct, editProduct, listProduct } from "../../../redux/features/product.slice";

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
  selectedProduct:any
}

interface productType {
  productname: string;
  productprice: number;
  weight: number;
}
export default function Addproduct(props: propsType) {
  const { dialogClose, isedit, open,selectedProduct } = props;

  const {userInfo}:any=useSelector((state:rootReducerType)=>state.authReducer);
  

  const [productInfo, setProductInfo] = React.useState<productType>({
    productname: "",
    productprice: 0,
    weight: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };


  const handleButton=()=>{
    if(isedit){
      let obj={
        productname: productInfo?.productname,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        productid:selectedProduct?._id,
        successCallback:()=>{
          const paramAs = { userid: userInfo?._id }
          dispatch(listProduct(paramAs));
          dialogClose();
        }
    }
    dispatch(editProduct(obj))
    }else{
      let obj={
        productname: productInfo?.productname,
        productprice: productInfo?.productprice,
        weight: productInfo?.weight,
        userid:userInfo?._id,
        successCallback:()=>{
          const paramAs = { userid: userInfo?._id }
          dispatch(listProduct(paramAs));
          dialogClose();
        }
    }
    dispatch(addProduct(obj))
    }
  }

  React.useEffect(()=>{
    console.log('efect',selectedProduct);

    if(isedit){     
    console.log('efect1',selectedProduct);

      setProductInfo({
        productname: selectedProduct?.productname,
        productprice: selectedProduct?.productprice,
        weight: selectedProduct?.weight,
      })
    } 
  },[selectedProduct])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={dialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isedit?"Edit product":"Add product"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={dialogClose}
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
        <TextField
          label="Product name"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          fullWidth
          name="productname"
          value={productInfo.productname}
          onChange={handleChange}
          
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleButton}>{isedit?"Edit product":"Add product"}</Button>
      </DialogActions>
    </Dialog>
  );
}
