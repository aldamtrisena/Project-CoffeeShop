const {
    Product,
    User,
    TransaksiProductUser
} = require("../models/index")
const nodemailer = require("nodemailer")
const formatting = require('../helpers/function.js')


class TransaksiController {

    static inputSales(req, res) {
        let alert = null
        if(req.query.alert){
            alert = req.query.alert
        }
        let id = req.session.username
        // console.log(id)
        let newid = null
        User.findOne({
                where: {
                    username: id
                }
            })
            .then(result => {
                newid = result.id
                // console.log(result)
                return Product.findAll()
            })
            .then(data => {
                // res.send(data)
                res.render("Sales", {
                    data,
                    id: newid,
                    formatting,
                    alert
                })
            })
            .catch(err => {
                res.send(err)
            })
    }


    static postSalesController(req, res) {
        let qty = req.body.qty
        let userId = req.params.id
        console.log(userId)
        Product.findByPk(req.body.item)
            .then(data => {
                if(data.quantity < qty){
                    let alert = `Stok tidak cukup!`
                    res.redirect(`/transaksi?alert=${alert}`)
                }
                else{
                    // res.send(data)
                    let bigTotal = data.price * qty
                    let value = {
                        id: data.id,
                        item: data.item,
                        quantity: qty,
                        price: data.price
                    }
                    // data. = qty
                    // console.log(bigTotal)
                    let newdata = JSON.stringify(value)
                    res.redirect(`/transaksi/pay/${userId}/${bigTotal}?input=${newdata}`)

                }
            })
    }

    static checkoutPay(req, res) {
        let totals = req.params.total
        let userId = req.params.id
        let data = JSON.parse(req.query.input)

        res.render("checkout", {
            data,
            total: totals,
            id: userId,
            formatting
        })

    }


    static finish(req, res) {
        // console.log(req.query)
        let userId = req.params.id
        let totals = req.params.total
        
        let value = {
            ProductId: +req.body.id,
            UserId: +userId,
            quantity: +req.body.qty,
            total: +totals

        }
        // console.log(value)

       
        TransaksiProductUser.create(value)
            .then(datas => {
                console.log(datas)
                return Product.findByPk(+req.body.id, {
                    include: [User]
                })
            })
            .then(dataProduct => {
                let obj = {
                    quantity: dataProduct.quantity - +req.body.qty
                }
                return Product.update(obj, {
                    where: {
                        id: +req.body.id
                    }
                })
            })
            .then(() => {
                return User.findByPk(+userId)                  
            })
            .then(dataUser => {
                
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "coffeshophjsodik@gmail.com",
                        pass: "kopihaji3456"
                    }
                })

                let mailOption = {
                    from: "coffeshophjsodik@gmail.com",
                    to: dataUser.email,
                    subject: "Resi Pembelian ",
                    text: `Halo, ${dataUser.username}! Pembelian anda sudah berhasil dengan total ${totals}.
                    Akan segera dikirim ke alamat anda!`
                }

                transporter.sendMail(mailOption, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }
                })
                res.render(`sukses-belanja`)
            })
            .catch(err => {
                res.send(err)
            })

    }

}

module.exports = TransaksiController