const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/userCartRoute");
const loginRouter = require("./routes/loginRoute");

app.use(express.json());

app.use(cors());

// app.use((req, res, next) => {
//   if (!req.url != "/login/") {
//     console.log(req.headers.authorization);
//   }
//   next();
// });

app.use(process.env.PRODUCTS, productRouter);
app.use(process.env.CART, cartRouter);
app.use(process.env.LOGIN, loginRouter);

app.listen(process.env.PORT, () =>
  console.log(`Shopping cart listening on port ${process.env.PORT}`)
);
