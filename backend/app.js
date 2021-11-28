const express = require("express");
const app = express();
const port = 3000;
const categories = require("./routes/category/all.json");
const carrito = require("./routes/cart/654.json");
const categoryInfo = require("./routes/category/1234.json");
const comments = require("./routes/product/5678-comments.json");
const productInfo = require("./routes/product/5678.json");
const products = require("./routes/product/all.json");
const publishProduct = require("./routes/product/publish.json");
const carritoBuy = require("./routes/cart/buy.json");

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/categories", (req, res) => {
  res.send(JSON.stringify(categories));
});

app.get("/carrito", (req, res) => {
  res.send(JSON.stringify(carrito));
});

app.get("/categoryInfo", (req, res) => {
  res.send(JSON.stringify(categoryInfo));
});

app.get("/comments", (req, res) => {
  res.send(JSON.stringify(comments));
});

app.get("/productInfo", (req, res) => {
  res.send(JSON.stringify(productInfo));
});

app.get("/products", (req, res) => {
  res.send(
    req.query.name && req.query.name !== ""
      ? JSON.stringify(
          products.filter((value) =>
            value.name.toLowerCase().includes(req.query.name.toLowerCase())
          )
        )
      : products
  );
});

app.get("/publishProduct", (req, res) => {
  res.send(JSON.stringify(publishProduct));
});

app.get("/carritoBuy", (req, res) => {
  res.send(JSON.stringify(carritoBuy));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
