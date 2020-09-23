const {Product , User} = require("../models/index")

class TransaksiController {

    static inputSales(req,res){
        Product.findAll()
            .then(data => {
                // res.send(data)
                res.render("Sales", {data})
            })
    }

    static postSalesController(req,res){
        // res.send(req.body)
        let qty = req.body.quantity

        Product.findAll({
            where : {
                id: req.body.idProduck
            }
        })
        .then(data =>{
            res.render("checkout", {data, qty})
            // res.send(data)
        })
    }
}

module.exports = TransaksiController