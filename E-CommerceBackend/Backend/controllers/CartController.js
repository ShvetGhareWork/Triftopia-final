import userModel from "../models/userModel.js";

const AddtoCart = async (req, res) => {
  try {
    const { userId, itemId, name, quantity, description, price, image } =
      req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    console.log(cartData);

    if (cartData[itemId]) {
      // Update existing item with all provided details
      cartData[itemId] = {
        ...cartData[itemId], // Retain existing properties
        name,
        description,
        price,
        image,
        quantity: cartData[itemId].quantity + quantity,
      };
      console.log("Image URL received:", image);
    } else {
      // Add new item with full product data
      cartData[itemId] = {
        name,
        description,
        price,
        image,
        quantity,
      };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

const UpdatetoCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Update only the quantity of the existing item
    if (cartData[itemId]) {
      cartData[itemId] = {
        ...cartData[itemId],
        quantity: quantity,
      };
    } else {
      // Initialize with only quantity if item doesn't exist
      cartData[itemId] = { quantity };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

//     res.json({ success: true, cartData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//     console.log(error);
//   }
// };

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Fetch user data from the database
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Safely access cartData, ensuring it's an object
    const cartData = userData.cartData || {};

    console.log("Fetched cartData:", cartData); // Debugging line

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res.json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Fetch the user data from the database
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Get the cart data from the user document
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      // Remove the item from the cart data
      delete cartData[itemId];

      // Update the user document with the modified cart data
      await userModel.findByIdAndUpdate(userId, { cartData });

      return res.json({ success: true, message: "Item removed from cart" });
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.json({ success: false, message: "Failed to remove item from cart" });
  }
};

export { AddtoCart, UpdatetoCart, getUserCart, removeFromCart };
