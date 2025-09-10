const jwt = require("jsonwebtoken")

//  verify token function

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // checks the token and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // attach to req employee id
    req.empId = decoded.empId;

    // next call the next function
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
