const express = require("express")
const app = express()
const PORT = 3000
const route = require("./routes")

//staticfile
app.use(express.static("public"))
// app.use("/css", express.static(__dirname + "public/css"))

//ejs
app.set("view engine", "ejs")
//body.pasrher
app.use(express.urlencoded({extended : true}))
//indexhomepage
app.use("/", route)

app.listen(PORT, ()=>{
    console.log(`masuk ke port ${PORT}`)
})

