const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập"
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn"
    });
  }
};

module.exports = auth;