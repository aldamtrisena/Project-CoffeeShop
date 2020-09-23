const route = require("express").Router()
const express = require("express")
const ProductController = require("../controllers/productController")


//akkses css in public folder
route.use(express.static("public"))
//home stoks to see stock
route.get("/",ProductController.readAllStock)
//to add stok
route.get("/add-stocks",ProductController.inputGetStock)
route.post("/add-stocks/",ProductController.inputPostStock)
route.get("/update/:id",ProductController.updateGetStock)
route.post("/update/:id", ProductController.updatePostStock)
route.get("/delete/:id", ProductController.deleteStock)

module.exports = route
