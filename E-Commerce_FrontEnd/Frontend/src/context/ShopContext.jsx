import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backEndURL = import.meta.env.VITE_BACKEND_URL;
  const [Search, SetSearch] = useState("");
  const [ShowSearch, SetShowSearch] = useState(false);
  const [CartItems, SetCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch (e) {
      console.error("Failed to parse cart data from localStorage:", e.message);
      return {};
    }
  });

  const [Product, setProduct] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  // const { userId, itemId } = req.body;

  // Fetch product data
  const getProductData = async () => {
    try {
      const response = await axios.get(
        backEndURL + "/api/product/list-product",
        { headers: { token } }
      );
      if (response.data.success) {
        setProduct(response.data.products);
        console.log(response.data.products);
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching products: " + error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Save cart data to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(CartItems));
  }, [CartItems]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      GetUserCart(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      FetchCartData(userId);
    }
  }, []);

  // Fetch cart data and merge with localStorage
  const FetchCartData = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        backEndURL + "/api/cart/getcart",
        { userId },
        { headers: { token } }
      );

      if (response.data.success) {
        const backendCartData = response.data.cartItems.reduce((acc, item) => {
          acc[item.itemId] = {
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image,
            userId: item.userId,
          };
          return acc;
        }, {});
        SetCartItems(backendCartData);
        localStorage.setItem("cart", JSON.stringify(backendCartData));
        console.log("Updated Cart Items from Backend:", backendCartData);
      } else {
        console.error("Failed to fetch cart items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };

  // Sync CartItems to localStorage whenever CartItems changes
  useEffect(() => {
    if (CartItems && typeof CartItems === "object") {
      localStorage.setItem("cart", JSON.stringify(CartItems));
    }
  }, [CartItems]);

  // Add item to cart
  const AddtoCart = async (itemId) => {
    if (!itemId) return;

    let cartData = { ...CartItems };
    const product = Product.find((p) => p._id === itemId);

    if (!product) {
      toast.error("Product not found!");
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = {
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
        userId: localStorage.getItem("userId"),
      };
    }

    SetCartItems(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (token) {
      try {
        const response = await axios.post(
          `${backEndURL}/api/cart/add`,
          {
            itemId,
            name: product.name,
            quantity: cartData[itemId].quantity,
            description: product.description,
            price: product.price,
            image: product.image,
          },
          { headers: { token } }
        );
        console.log("Backend Response:", response.data.cartData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add item.");
      }
    }

    toast.success("Product Added Successfully!");
  };

  // Avoid refesh of cart
  const GetUserCart = async (token) => {
    try {
      const response = await axios.post(
        backEndURL + "/api/cart/getcart",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        console.log(response.data.cartData);
        SetCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item.");
    }
  };
  // Remove item from cart (Frontend + Backend)
  const removeFromCart = async (itemId) => {
    let cartData = { ...CartItems };
    delete cartData[itemId];
    SetCartItems(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
    toast.info("Item removed from cart!");

    if (token) {
      try {
        const response = await axios.delete(backEndURL + "/api/cart/remove", {
          headers: { token },
          data: {
            itemId,
            userId: localStorage.getItem("userId"), // Corrected line
          },
        });

        if (response.data.success) {
          toast.success("Item removed from cart successfully!");
        } else {
          toast.error(
            response.data.message || "Failed to remove item from cart."
          );
        }
      } catch (error) {
        console.error(
          "Error in removeFromCart:",
          error.response?.data || error.message
        );
        toast.error("Error while removing item from cart.");
      }
    }
  };

  // Check if an item is in the cart
  const isInCart = (itemId) => {
    return CartItems && Object.keys(CartItems).includes(itemId);
  };

  // Get total cart item
  const GetcartCount = () => {
    if (!CartItems || typeof CartItems !== "object") return 0;
    return Object.values(CartItems).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  };

  const getCartAmount = () => {
    if (!CartItems || typeof CartItems !== "object") return 0;
    return Object.values(CartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      let cartData = { ...CartItems };

      const product = Product.find((p) => p._id === itemId);

      if (!product) {
        toast.error("Product not found!");
        return;
      }

      if (cartData[itemId]) {
        // cartData[itemId].quantity += 1;
        cartData[itemId] = {
          quantity: quantity + 1,
          price: product.price,
          name: product.name,
          image: product.image,
          userId: localStorage.getItem("userId"),
        };
      } else {
        cartData[itemId] = {
          quantity: 1,
          price: product.price,
          name: product.name,
          image: product.image,
          userId: localStorage.getItem("userId"),
        };
      }

      // 🟢 Update Quantity in Local State
      if (quantity <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId].quantity = quantity;
      }

      // 🟢 Update LocalStorage
      SetCartItems(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));

      // 🟢 Sync with Backend
      await axios.post(
        `${backEndURL}/api/cart/update`,
        {
          itemId,
          quantity,
          userId: localStorage.getItem("userId"),
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
        },
        { headers: { token, "Content-Type": "application/json" } }
      );

      toast.success("Cart updated successfully!");
    } catch (error) {
      console.error("Cart update error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to update cart.");
    }
  };

  const value = {
    products: Product,
    currency,
    delivery_fee,
    Search,
    SetSearch,
    ShowSearch,
    SetShowSearch,
    CartItems,
    SetCartItems,
    AddtoCart,
    GetcartCount,
    updateQuantity,
    removeFromCart,
    getCartAmount,
    isInCart,
    navigate,
    backEndURL,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
