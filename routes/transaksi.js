const route = require("express").Router()
const express = require("express")
const TransaksiController = require("../controllers/transaksiProductUser")
const {
    sessionCustomerChecker
} = require('../middleware/login.js')


//public akses css
route.use(express.static("public"))
//from index
route.get("/", sessionCustomerChecker, TransaksiController.inputSales)
route.post("/:id", sessionCustomerChecker, TransaksiController.postSalesController)
route.get("/pay/:id/:total", sessionCustomerChecker, TransaksiController.checkoutPay)
route.post("/pay/:id/:total", sessionCustomerChecker, TransaksiController.finish)


module.exports = route