const express = require("express");
require("dotenv").config();

const userReg = require("./user-reg");
const userLogin = require("./user-login");
const users = require("./users");

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use("/register", userReg);
app.use("/login", userLogin);
app.use("/users", users);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});