const UserController = require("../controllers/user")
const route = require("express").Router()
const express = require("express")

//css using
route.use(express.static("public"))

route.get("/add", UserController.addData)
route.post("/add",UserController.addDataPost)

module.exports = route