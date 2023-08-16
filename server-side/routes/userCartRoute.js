const express = require("express");
const router = express.Router();

const UserCart = require("../model/userCart");

router.get("/:id", (req, res) => {
  return res.status(200).json(UserCart.getCart(req.params.id));
});

router.post("/",async (req, res) => {
   
  const createdCart =  new UserCart(
    req.body.userId,
    req.body.productId,
    req.body.quantity
  )
  console.log(req.body)
  await createdCart.initializeProductAndTotal();
  
  createdCart.addToCart()
  return res.status(201).json(createdCart);
});

router.delete("/:id", (req, res) => {
  return res.status(200).json(UserCart.removeFromCart(req.params.id));
});

router.post("/checkout/:userId", (req, res) => {
  UserCart.confirmOrder(req.params.userId);
  return res.status(200).json();
});

module.exports = router;
