const express = require('express');
const { connection } = require('./db');
const { UserRouter } = require('./router/user.router');
const BookRouter = require('./router/book.router');
const { authentication } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use("/user",UserRouter);
app.use(authentication)
app.use("/books",BookRouter);

app.listen(4300, async () => {
    try {
        console.log("Server running on 4300")
        await connection;
    }
    catch (err) {
        console.log(err.message);
    }
})