const route = require("express").Router()
const routeUSer = require("./user")
const routeProduct = require("./product")
const routeSales = require("./transaksi")


route.get("/", (req,res) => {
    res.render("home")
})

route.use("/user", routeUSer) 
route.use("/product", routeProduct)
route.use("/transaksi", routeSales)

module.exports = route