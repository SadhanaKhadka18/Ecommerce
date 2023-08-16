const express = require("express");
const router = express.Router();
const fs = require("fs");
// const Product = require("../model/product");
const Product= require("../model/Product").ProductModel;


router.get("/", async(req, res) => {
  // res.status(200).json(Product.findAll());
  const products =  await Product.find();
    // console.log(products);
    res.status(200).json(products);
});

router.get("/:id",async (req, res) => {
  // res.status(200).json(Product.findById(req.params.id));
  const product=await Product.findOne({"id":req.params.id});
  // console.log(product);
  res.status(200).json(product);
  // console.log('hereee')
  
});

router.get("/image/:fileName", (req, res) => {
  const imagePath = __dirname + "/../uploads/" + req.params.fileName;
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": data.length,
    });
    res.end(data);
  });
});

module.exports = router;
