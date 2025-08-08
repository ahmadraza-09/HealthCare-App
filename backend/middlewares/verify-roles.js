const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
    // Convert single role string to array
    if (typeof roles === "string") {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token." });
            }

            req.user = decoded;

            // Role check
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden: You don't have access to this resource." });
            }

            next();
        });
    };
};
