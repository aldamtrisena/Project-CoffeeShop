const route = require("express").Router()
const express = require("express")
const TransaksiController = require("../controllers/transaksiProductUser")
const { sessionCustomerChecker } = require('../middleware/login.js')


//public akses css
route.use(express.static("public"))
//from index
route.get("/", sessionCustomerChecker, TransaksiController.inputSales)
route.post("/:id",sessionCustomerChecker, TransaksiController.postSalesController)

module.exports = route