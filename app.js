const express = require("express")
const app = express()
const PORT = 3000
const route = require("./routes")
const nodemailer = require("nodemailer");



//staticfile
app.use(express.static("public"))
// app.use("/css", express.static(__dirname + "public/css"))

//ejs
app.set("view engine", "ejs")
//body.pasrher
app.use(express.urlencoded({extended : true}))
//indexhomepage
app.use("/", route)

app.get("/email", (req,res) => {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "gmail",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "aldam3sena@gmail.com", // generated ethereal user
            pass: "#31oktober1991", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <aldam3sena@gmail.com>', // sender address
          to: "aldamrisena@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      res.send("ok")
      main().catch(console.error);
})

app.listen(PORT, ()=>{
    console.log(`masuk ke port ${PORT}`)
})

