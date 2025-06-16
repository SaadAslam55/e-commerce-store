import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../contexts/authContext";

// Utility function to format price as Pakistani Rupee
const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);

const ProductCard = ({ product }) => {
  const { _id, title, price, discount, discountedPrice, image, inStock, id } =
    product;
  const {
    wishlistState,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlist();
  const { cartState, addToCartHandler, loading: cartLoading } = useCart();
  const { isAuth, navigate } = useAuth();

  const itemInWishlist = wishlistState.find((item) => item._id === _id);
  const itemInCart = cartState.find((item) => item._id === _id);

  return (
   <div
  className={`card-wrapper basic-card card-w-dismiss ${
    !inStock ? "card-w-overlay" : ""
  }`}
>
  <div className="overlay-bg">
    {!inStock && <div className="overlay-text">Out of Stock</div>}

    <Link to={`/products/${id}`}>
      <img
        src={image || "https://via.placeholder.com/300"}
        className="card-img"
        alt={title}
      />
    </Link>

    <div className="card-dismiss">
      <button
        onClick={() => toggleWishlist(product)}
        disabled={wishlistLoading || !inStock}
      >
        <i
          className={
            isAuth && itemInWishlist ? "fa fa-heart" : "fa fa-heart-o"
          }
        ></i>
      </button>
    </div>

    <Link to={`/products/${id}`} className="card-heading" title={title}>
      {title}
    </Link>
  </div>

  <div className="card-content">
    <div className="product-price">
      <div className="price">{formatPrice(discountedPrice)}</div>
      <div className="previous-price">{formatPrice(price)}</div>
      <div className="discount">{discount}% off</div>
    </div>
  </div>

  <div className="card-action">
    <button
      className="btn btn-primary cart-button"
      onClick={() =>
        isAuth && itemInCart
          ? navigate("/cart")
          : addToCartHandler(product)
      }
      disabled={cartLoading || !inStock}
    >
      {isAuth && itemInCart ? "Go To Cart" : "Add To Cart"}
    </button>
  </div>
</div>

  );
};

export { ProductCard };
