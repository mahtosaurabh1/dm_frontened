import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../../../redux/features/rootslice";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  listProduct,
} from "../../../redux/features/product.slice";

function ProductGrid() {
  const { productList }: any = useSelector(
    (state: rootReducerType) => state.productReduer
  );
  const { userInfo }: any = useSelector(
    (state: rootReducerType) => state.authReducer
  );

  const dispatch = useDispatch();

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

  const handleEditProduct = (id: string) => {};
  return (
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
  );
}

export default ProductGrid;
