import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.get("jwt_secret"),
      {
        expiresIn: "24h",
      }
    );

    return token;
  } catch (e) {
    throw e;
  }
};

export default generateToken;
