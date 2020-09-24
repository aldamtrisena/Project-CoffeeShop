const {
    Product,
    User
} = require("../models/index")

class TransaksiController {

    static inputSales(req, res) {
        Product.findAll()
            .then(data => {
                // res.send(data)
                res.render("Sales", {
                    data
                })
            })
    }

    static postSalesController(req, res) {
        let qty = req.body.quantity
        Product.findAll({
                where: {
                    id: req.body.idProduck
                }
            })
            .then(data => {

                // res.send(req.body)
                console.log(req.body.quantity)
                let totalqty = 0
                let taotalprice = 0
                for (let i = 0; i < data.length; i++) {
                    taotalprice += data[i].price
                    for (let j = 0; j < qty.length; j++) {
                        totalqty += Number(qty[j])
                    }
                }

                // console.log(totalqty, taotalprice)
                let bigTotal = taotalprice * totalqty
                //    console.log(bigTotal)
                // res.send(data)
                let newdata = JSON.stringify(data)
                // let newqty = JSON.stringify(qty)
                res.redirect(`/pay/${3}/${bigTotal}?input=${newdata}`)
            })
    }

    static checkoutPay(req, res) {
        // res.send(req.query)
        // res.send(req.query)
        let total = req.params.total
        console.log()
        let data = JSON.parse(req.query.input)
        console.log(data)
        res.render("checkout", {
            data,
            total
        })
    }
}

module.exports = TransaksiController