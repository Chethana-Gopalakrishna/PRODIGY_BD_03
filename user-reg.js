const express = require("express");
const bcrypt = require("bcrypt");
const { prisma } = require("./db.js");

const router = express.Router();

// User registration
router.post("/", async (req, res) => {
    try {
        const { name, email, password, age, role } = req.body;

        if (!name || !email || !password || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                age,
                role: role || "user",
            },
        });

        res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
