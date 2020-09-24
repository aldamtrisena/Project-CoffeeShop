const express = require("express")
const app = express()
const PORT = 3000
const route = require("./routes")
// const nodemailer = require("nodemailer");
const session = require('express-session')

//staticfile
app.use(express.static("public"))
// app.use("/css", express.static(__dirname + "public/css"))

//ejs
app.set("view engine", "ejs")
//body.pasrher
app.use(express.urlencoded({
  extended: true
}))

app.use(session({
  secret: 'toko kopi',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 30000
  }
}))



//indexhomepage
app.use("/", route)

app.listen(PORT, () => {
  console.log(`masuk ke port ${PORT}`)
})