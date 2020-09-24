const route = require("express").Router()
const express = require("express")
const UserController = require("../controllers/user.js")

const { pageLogin } = require('../middleware/login.js')

//css using
route.use(express.static("public"))

route.get("/add", UserController.addData)
route.post("/add", UserController.addDataPost)

route.get("/login", UserController.loginForm)
route.post("/login", UserController.login)

route.get("/admin", pageLogin, UserController.adminPage)
route.get("/customer", pageLogin, UserController.customerPage)

route.get("/logout", UserController.logout)

module.exports = route