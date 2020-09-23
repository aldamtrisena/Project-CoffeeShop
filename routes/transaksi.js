const route = require("express").Router()
const express = require("express")
const TransaksiController = require("../controllers/transaksiProductUser")

//public akses css
route.use(express.static("public"))
//from index
route.get("/", TransaksiController.inputSales)
route.post("/:id",TransaksiController.postSalesController)

module.exports = route