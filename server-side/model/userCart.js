const Product = require("./Product").ProductModel;
const Productclass = require("./Product").ProductClass;

let count = 0;

class UserCart {
  id;
  userId;
  product;
  dateAdded;
  quantity;
  total;

  constructor(userId, productId, quantity) {
    this.productId = productId;
    this.quantity = quantity;
    this.dateAdded = new Date();
    this.userId = userId;
    this.initializeProductAndTotal();
  }
  async initializeProductAndTotal() {
    try {
      this.product = await Product.findOne({ "id": this.productId });
      this.total = this.quantity * this.product.price;
      // console.log("product",this.product)
      //  console.log("total",this.total)          
    } catch (error) {
      console.error("Error initializing product:", error);
    }
  }

  async addToCart() {
    let previousOrder = UserCart.getParticularItemOrder(
      this.userId,
      this.product.id
    );
    if (previousOrder) {
      previousOrder.quantity += this.quantity;
      // previousOrder.product.sellProduct(this.quantity);
      previousOrder.price = previousOrder.quantity * this.product.price;
      // console.log("previousOrder",previousOrder)
      return previousOrder;
    } else {
      this.id = ++count;
      // this.product.sellProduct(this.quantity);
      userCarts.push(this);
      //  console.log(userCarts);
      return this;
    }
  }

  static removeFromCart(id) {
    const index = userCarts.findIndex((i) => i.id == id);
    const removedCart = userCarts[index];
    // removedCart.product.adjustProduct(removedCart.quantity);
    userCarts.splice(index, 1);
    return removedCart;
  }

  static confirmOrder(userId) {
    let items = this.getCart(userId);
    items.forEach((i) => {
      const index = userCarts.findIndex((item) => item.product.id == i.id);
      //  console.log("userCart",i)
      Productclass.sellProduct(i.product.id, i.quantity);
      userCarts.splice(index, 1);
    });
  }

  static getCart(userId) {
    let userCart = userCarts.filter((uc) => uc.userId == userId);
    return userCart;
  }

  static getParticularItemOrder(userId, productId) {
    let userCart = this.getCart(userId);
    if (userCart) {
      const index = userCart.findIndex((i) => i.product.id == productId);
      return userCarts[index];
    }
    return;
  }
}

let userCarts = [];

module.exports = UserCart;
