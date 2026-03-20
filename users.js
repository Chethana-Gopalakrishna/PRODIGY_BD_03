const express = require("express");
const { prisma } = require("./db.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware: verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied: No token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}

// Middleware: check roles
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied: Insufficient role" });
        }
        next();
    };
}

// Example: get all users (admin only)
router.get("/", authenticateToken, authorizeRoles("admin"), async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Example: get own profile (any authenticated user)
router.get("/profile", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);
});

module.exports = router;
