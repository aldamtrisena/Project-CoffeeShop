const {
    Product,
    User,
    TransaksiProductUser
} = require("../models/index")
const nodemailer = require("nodemailer")


class TransaksiController {

    static inputSales(req, res) {
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
                    id: newid
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
            })
    }

    static checkoutPay(req, res) {
        let totals = req.params.total
        let userId = req.params.id
        let data = JSON.parse(req.query.input)

        res.render("checkout", {
            data,
            total: totals,
            id: userId
        })

    }


    static finist(req, res) {
        console.log(req.query)
        let userId = req.params.id
        let totals = req.params.total
        // res.send(req.body)
        // console(req.params)
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
                // res.send(datas)
                // // res.send(datas)
                return User.findByPk(+userId, {
                    include: [TransaksiProductUser, Product],
                })
            })
            .then(all => {

                // console.log(all)
                // res.send(all)
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "coffeshophjsodik@gmail.com",
                        pass: "kopihaji3456"
                    }
                })

                let mailOption = {
                    from: "aldam3sena@gmail.com",
                    to: all.email,
                    subject: "testing send email 22",
                    text: `Selamat Malam`
                }

                transporter.sendMail(mailOption, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }
                })

                res.send("BERHASIL")

            })
            .catch(err => {
                res.send(err)
            })


        //nodemailler

    }

}

module.exports = TransaksiController