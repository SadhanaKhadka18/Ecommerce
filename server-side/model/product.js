class Product {
  id;
  name;
  price;
  stock;
  description;
  imageName;

  constructor(id, name, price, stock, description, imageName) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.imageName = imageName;
  }

  save() {
    items.push(this);
    return this;
  }

  sellProduct(quantity) {
    const index = items.findIndex((i) => i.id == this.id);
    this.stock -= quantity;
    return this;
  }

  adjustProduct(quantity) {
    const index = items.findIndex((i) => i.id == this.id);
    this.stock += quantity;
    return this;
  }

  static findById(proId) {
    const index = items.findIndex((i) => i.id == proId);
    return items[index];
  }

  static findAll() {
    return items;
  }
}

const product1 = new Product(
  1,
  "Shirt",
  20.99,
  10,
  "A classic, comfortable shirt that is perfect for any occasion. Made from high-quality materials and designed with both style and comfort in mind, this shirt is sure to become a staple in your wardrobe.",
  "shirt.jpg"
);
const product2 = new Product(
  2,
  "Pants",
  34.99,
  5,
  "These stylish pants are a must-have for any fashion-forward individual. Designed with a modern fit and made from durable materials, these pants are perfect for both work and play.",
  "pants.jpg"
);
const product3 = new Product(
  3,
  "Hat",
  12.99,
  20,
  "Protect your face from the sun and stay cool with this stylish hat. Made from breathable materials and designed with a classic look, this hat is perfect for any outdoor activity.",
  "hat.jpg"
);
const product4 = new Product(
  4,
  "Shoes",
  49.99,
  8,
  "These comfortable shoes are perfect for everyday wear. Designed with both style and comfort in mind, these shoes are made from high-quality materials and are sure to keep your feet happy all day long.",
  "shoes.jpg"
);
const product5 = new Product(
  5,
  "Socks",
  5.99,
  30,
  "These soft and breathable socks are the perfect addition to any outfit. Made from high-quality materials and designed to fit comfortably, these socks are sure to keep your feet happy all day long.",
  "socks.jpg"
);
const product6 = new Product(
  6,
  "Jacket",
  89.99,
  3,
  "Stay warm and dry in any weather with this waterproof jacket. Designed with both style and functionality in mind, this jacket is perfect for any outdoor adventure.",
  "jacket.jpg"
);
const product7 = new Product(
  7,
  "Gloves",
  14.99,
  15,
  "Keep your hands warm and protected in cold weather with these stylish gloves. Made from high-quality materials and designed to fit comfortably, these gloves are the perfect accessory for any winter outfit.",
  "gloves.jpg"
);
const product8 = new Product(
  8,
  "Scarf",
  9.99,
  25,
  "Add a touch of style to any outfit with this versatile scarf. Made from soft, high-quality materials and designed with a classic look, this scarf is perfect for any occasion.",
  "scarf.jpg"
);
const product9 = new Product(
  9,
  "Belt",
  7.99,
  12,
  "Hold up your pants in style with this sturdy belt. Made from durable materials and designed with a classic look, this belt is the perfect accessory for any outfit.",
  "belt.jpg"
);
const product10 = new Product(
  10,
  "Watch",
  99.99,
  0,
  "Stay on time and on trend with this stylish watch. Made from high-quality materials and designed with a classic look, this watch is the perfect accessory for any outfit.",
  "watch.jpg"
);

let items = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
];

module.exports = Product;
