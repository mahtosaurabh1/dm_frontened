import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Addproduct from "./add-product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  listProduct,
} from "../../../redux/features/product.slice";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import ProductGrid from "./product-grid";

function Product() {
  const [open, setOpen] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct,setSelectedProduct]=useState<any>({});
  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );
  const { productList }: any = useSelector(
    (state: rootReducerType) => state.productReduer
  );

  const handleDeleteProduct = (val: any) => {
    const paramAs = { userid: userInfo?._id };

    const data = {
      productid: val?._id,
      successCallback: () => {
        dispatch(listProduct(paramAs));
      },
    };
    dispatch(deleteProduct(data));
  };

  const handleEditProduct = (val:any) => {
    setSelectedProduct(val)
    setOpen(true);
    setIsEdit(true);
  };
  const dialogClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const paramAs = { userid: userInfo?._id };
    dispatch(listProduct(paramAs));
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} pr={"1rem"}>
        <Button variant="outlined" onClick={dialogOpen}>
          Add Product
        </Button>
        <Addproduct
          dialogClose={dialogClose}
          dialogOpen={dialogOpen}
          open={open}
          isedit={isedit}
          selectedProduct={selectedProduct}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        {productList?.map((val: any) => {
          return (
            <Card sx={{ maxWidth: 200, height: "12rem" }}>
              <CardMedia
                sx={{ height: 50 }}
                image="https://img.freepik.com/free-photo/pink-flower-white-background_1203-2127.jpg?size=626&ext=jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {val?.productname}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Weight {val?.weight}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Price {val?.productprice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEditProduct(val)}>
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDeleteProduct(val)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default Product;
