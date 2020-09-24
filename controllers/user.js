const {
    User,
    Product
} = require("../models/index")
// const session = require('express-session')
const bcrypt = require('bcryptjs')


class UserController {

    static addData(req, res) {
        let error
        if (req.query.mes) {
            error = JSON.parse(req.query.mes)
        }

        res.render("addUser", {
            error
        })
    }

    static addDataPost(req, res) {
        let {
            username,
            email,
            password,
            password2,
            address
        } = req.body
        let error = []
        // validasi tidak boleh kosong
        if (!username || !email || !password || !password2) {
            error.push({
                mes: "field can't be empty"
            })

        }
        //validasi pass
        if (password !== password2) {
            error.push({
                mes: "Password does not macth!"
            })
        }
        //rubahinput email jadi huruf kecil semua
        if (email) {
            email = email.toLowerCase()
        }

        if (password.length < 2) {
            error.push({
                mes: "password must be at least 6 character"
            })
        }
        if (error.length > 0) {
            res.redirect(`/user/add?mes=${JSON.stringify(error)}`)
        } else {
            //cek email sudah terigester?
            User.findOne({
                    where: {
                        email: email
                    }
                })
                .then(result => {
                    if (result) {
                        error.push({
                            mes: 'Email already used !,\n please provide another email'
                        })
                        res.redirect(`/user/add?mes=${JSON.stringify(error)}`)
                    } else {
                        
                        let value = {
                            username,
                            email,
                            password,
                            address,
                            role: "customer"
                        }
                        return User.create(value)
                    }
                })
                .then(result => {
                    let data = []
                    data.push(result)
                    res.render("success", {
                        data
                    })
                })
                .catch(err => {
                    res.send(err)
                })

        }

    }

    static loginForm(req, res) {
        if (req.query.err) {
            res.render('login', {
                errorLogin: true
            })

        } else {
            res.render('login', {
                errorLogin: false
            })
        }
        // res.render('login')
    }

    static login(req, res) {

        User.findOne({
                where: {
                    username: req.body.username
                    // password: req.body.password
                }
            })
            .then(result => {
                //redirect ke halaman user login
                // untuk admin ke halaman admin login
                if (result === null) {
                    res.redirect('/user/login?err=true')
                    
                } 
                else{
                    if(User.checkRole(result.role)){
                        req.session.isLoggedIn = true
                        req.session.username = result.username
                        req.session.role = result.role
                        res.redirect('/user/admin')

                    }
                    else{
                        let temp = result.comparePassword(req.body.password)
                        if(temp){
                            req.session.isLoggedIn = true
                            req.session.username = result.username
                            req.session.role = result.role
                            // req.session.id = result.id
                            res.redirect('/user/customer')

                        }
                    }
                }
                
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        res.redirect('/')
    }

    static adminPage(req, res) {
        res.render('home-admin')
    }

    static customerPage(req, res) {
        res.render('home-customer')
    }
}

module.exports = UserController