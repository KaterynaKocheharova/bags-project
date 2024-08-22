import { useAppSelector } from "../../../redux/hooks";
import { selectCartProducts } from "../../../redux/cart/cartSelectors";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Section from "../../common/Section/Section";
import Container from "../../common/Container/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CartItems from "../CartItems/CartItems";
import FlexColumn from "../../common/FlexColumn/FlexColumn";
import css from "./CartSidebar.module.css";

type CartSidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (arg: boolean) => void;
  drawerWidth: string;
  drawerVariant: "permanent" | "persistent" | "temporary" | undefined;
  setIsDialogueOpen: (arg: boolean) => void;
  setDialogueType: (arg: "successful-order" | "fill-in-number") => void;
};

const CartSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
  drawerVariant,
  setIsDialogueOpen,
  setDialogueType,
}: CartSidebarProps) => {
  const totalCartProducts = useAppSelector(selectCartProducts).length;

  const handleCartButtonClick = () => {
    setDialogueType("fill-in-number");
    setIsDialogueOpen(true);
  };

  return (
    <Drawer
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      variant={drawerVariant}
      anchor="right"
      PaperProps={{
        sx: {
          width: drawerWidth,
          height: "100%",
          boxShadow: "var(--third-color-shadow)",
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          border: "1px solid var(--second-color)",
        }}
        onClick={() => setIsSidebarOpen(false)}
      >
        <IoMdClose />
      </IconButton>
      <Section type="cart">
        <Container>
          <FlexColumn>
            <Typography className={css.text} component="h2" variant="h6">
              {totalCartProducts ? (
                <>
                  У ВАШІЙ КОРЗИНІ НАРАЗІ{" "}
                  <span className={css.accent}>{totalCartProducts}</span>{" "}
                  ТОВАРІВ
                </>
              ) : (
                "У ВАС ПОКИ НЕМАЄ ТОВАРІВ У КОРЗИНІ"
              )}
            </Typography>
            <CartItems />
            {totalCartProducts ? (
              <Button variant="outlined" onClick={handleCartButtonClick}>ЗАМОВИТИ</Button>
            ) : null}
          </FlexColumn>
        </Container>
      </Section>
    </Drawer>
  );
};

export default CartSidebar;
