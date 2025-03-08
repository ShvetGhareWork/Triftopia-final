import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }

    // Split the token from 'Bearer <token>'
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }

    // Verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const expectedPayload =
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    // Check if the token payload matches the expected payload
    if (tokenDecode !== expectedPayload) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
