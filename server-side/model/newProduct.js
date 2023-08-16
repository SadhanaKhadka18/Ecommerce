const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WAP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  stock: Number,
  description: String,
  imageName: String,
});

const ProductModel = mongoose.model('Product', productSchema);
 
class ProductClass {
    static async save(productData) {
      const product = new ProductModel(productData);
      await product.save();
      return product;
    }
  
    static async sellProduct(productId, quantity) {
      // console.log("productID sent ",productId)
      const product = await ProductModel.findOne({ "id": productId });
      // console.log("product matching",product)
      if (product) {
        // console.log(product.stock)

        product.stock -= quantity;
        await product.save();
        // console.log(product.stock)
        return product;
      }
      return null;
    }
  
    static async adjustProduct(productId, quantity) {
      const product = await ProductModel.findOne({ id: productId });
      if (product) {
        product.stock += quantity;
        await product.save();
        return product;
      }
      return null;
    }
  
    static async findById(productId) {
      return ProductModel.findOne({ id: productId });
    }
  
    static async findAll() {
      return ProductModel.find();
    }
  }
  
  
  (async () => {
    try {
      // Fetch products from MongoDB and log them
      const items = await ProductModel.find();
      // console.log(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })();
  
  module.exports = {ProductModel,ProductClass};