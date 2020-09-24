const route = require("express").Router()
const express = require("express")
const ProductController = require("../controllers/productController")
const { sessionAdminChecker } = require('../middleware/login.js')


//akses css in public folder
route.use(express.static("public"))
//home stocks to see stock
route.get("/", sessionAdminChecker, ProductController.readAllStock)
//to add stock
route.get("/add-stocks", sessionAdminChecker, ProductController.inputGetStock)
route.post("/add-stocks/", sessionAdminChecker, ProductController.inputPostStock)
route.get("/update/:id", sessionAdminChecker, ProductController.updateGetStock)
route.post("/update/:id", sessionAdminChecker, ProductController.updatePostStock)
route.get("/delete/:id", sessionAdminChecker, ProductController.deleteStock)

module.exports = route
