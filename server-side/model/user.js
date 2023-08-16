const e = require("express");

require("dotenv").config();

class User {
  id;
  email;
  password;
  token;

  constructor(id, fullName, email, password) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

  static validateUser(email, password) {
    const index = users.findIndex((user) => user.email == email);
    const data = users[index];
    if (!data) {
      return false;
    }
    data.token = generateToken(15);
    users.splice(index, 1, data);
    const resp = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      token: data.token,
    };
    if (data.password == password) {
      return resp;
    }
    return false;
  }

  static verifyToken(token, email) {
    const index = users.findIndex((user) => user.email == email);
    const data = users[index];
    if (data.token == token) {
      return true;
    } else {
      return false;
    }
  }
}

function generateToken(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const user1 = new User(1, "John Doe", "john.doe@example.com", "password1");
const user2 = new User(2, "Jane Smith", "jane.smith@example.com", "password2");

let users = [user1, user2];

module.exports = User;
