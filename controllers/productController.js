const {Product} = require("../models/index")

class ProductController {
    // /prodcut endpoint
    static readAllStock(req,res){
        Product.findAll()
            .then(data => {
                // console.log(data)
                res.render("tablestocks", {data})
            })
            .catch(err =>{
                res.send("failed")
                // console.log(err)
            })
    }
    // add-stocks
    static inputGetStock(req,res){
        res.render("addStock",)
    }
    // add-stocks
    static inputPostStock(req,res){
        const {item,quantity,price}=req.body
        let value = {
            item,
            quantity,
            price
        }
        Product.create(value)
            .then(data =>{
                res.redirect("/product")
            })
            .catch(err => {
                res.redirect("failed")
            })

    }
    // update/:id
    static updateGetStock(req,res){
        // res.send("ok")
        Product.findByPk(req.params.id)
            .then(data =>{
                // console.log(data)
                res.render("updateStock", {data})
            })
            .catch(err => {
                res.send(err)
            })

    }
    //update/:id
    static updatePostStock(req,res){
        const {item,quantity,price}=req.body
        let value = {
            item,
            quantity,
            price
        }
        Product.update(value, {
            where : {
                id : +req.params.id
            }
        })
        .then(res.redirect("/product"))
        .catch(err => {
            res.send(err)
        })
    }
    // delete/:id
    static deleteStock(req,res){
        
        Product.destroy({
            where:{
                id : req.params.id
            }
        })
        .then(res.redirect("/product"))
        .catch(err => {
          res.send(err)

        })
    }
}

module.exports = ProductController