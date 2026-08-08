const authorize = (...allowedRoles) => {
  const normalizedRoles = allowedRoles.map((role) =>
    role.toLowerCase()
  );

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập"
      });
    }

    const userRole = String(req.user.role || "").toLowerCase();

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền thực hiện chức năng này"
      });
    }

    next();
  };
};

module.exports = authorize;