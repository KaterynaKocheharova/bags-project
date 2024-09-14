import clsx from "clsx";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWishlist } from "../../../redux/wishlist/wishlistSlice.ts";
import FlexRow from "../../common/FlexRow/FlexRow.tsx";
import { Typography, IconButton } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import AddToCartButton from "../../AddToCartButton/AddToCartButton.tsx";
import css from "./ProductItem.module.css";
import { selectCartProducts } from "../../../redux/cart/cartSelectors.js";
import { selectWishlistIds } from "../../../redux/wishlist/wishlistSelectors.js";

const ProductItem = ({ product: { id, name, image, new_price } }) => {
  
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const wishlitsIds = useSelector(selectWishlistIds);
  const currentCartProduct = useMemo(
    () => cartProducts.find((item) => item.productId === id),
    [cartProducts, id]
  );

  const quantity = currentCartProduct ? currentCartProduct.quantity + 1 : 1;

  const handleFavButtonClick = (event) => {
    event.preventDefault();
    dispatch(toggleWishlist(id));
  };

  return (
    <li className={css["product-item"]}>
      <Link to={`/${id}`} className={css["item-link"]}>
        <div className={css["image-container"]}>
          <img
            className={css["item-image"]}
            src={image}
            alt={name}
            width="250"
          />
        </div>

        <div className={css["card-group-box"]}>
          <Typography variant="h5" component="h3">
            {name}
          </Typography>
          <p>{new_price} гривень</p>
          <FlexRow>
            <IconButton onClick={handleFavButtonClick}>
              <CiHeart
                className={clsx(
                  css.icon,
                  css["heart-icon"],
                  wishlitsIds.includes(id) && css.favorite
                )}
              />
            </IconButton>
            <AddToCartButton
              productData={{ productId: id, quantity }}
              type="card"
            />
          </FlexRow>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
