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
            .catch(err => {
                res.send(err)
            })
    }


    static postSalesController(req, res) {
        let qty = req.body.qty
        Product.findByPk(req.body.item)
            .then(data => {
                // res.send(data)
                let bigTotal = data.price * qty
                console.log(bigTotal)
                let newdata = JSON.stringify(data)
                res.redirect(`/pay/${3}/${bigTotal}?input=${newdata}`)
            })
    }

    static checkoutPay(req, res) {
        let total = req.params.total
        let data = JSON.parse(req.query.input)
        res.render("checkout", {
            data,
            total
        })


    }


    static finist() {

    }

}

module.exports = TransaksiController