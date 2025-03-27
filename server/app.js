const express = require('express');
const app = express();
const authRouter = require('./router/authRoutes');

app.use(express.json()); // middleware / Parser

app.use("/api/auth", authRouter);
app.use("/", (req, res)=> {
    res.status(200).json({
        data: "JWTauth server."
    })
})

module.exports = app;