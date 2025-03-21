import jwt from "jsonwebtoken";

const AuthUser = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode);
    req.body.userId = token_decode.id;
    console.log(req.body.userId);

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default AuthUser;
