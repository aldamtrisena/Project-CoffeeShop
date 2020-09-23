const {User, Product} = require("../models/index")

class UserController {

    static addData(req,res){
        let error
        if(req.query.mes){
            error = JSON.parse(req.query.mes)
        }

        res.render("addUser", {error})
    }

    static addDataPost(req,res){
        let  {username, email, password, password2, date, gender} = req.body
        let error = []
        // validasi tidak boleh kosong
        if(!username || !email || !password || !password2 || !date || !date || !gender){
            error.push({mes : "field can't be empty"}) 
            
        }
        //validasi pass
        if(password !== password2){
            error.push({mes : "password can't macth"})
        }
        //rubahinput email jadi huruf kecil semua
        if(email){
           email = email.toLowerCase()
        }
        
        if(password.length < 2){
            error.push({mes : "password must be 6 character"})
        } 
        if(error.length > 0){
            res.redirect(`/user/add?mes=${JSON.stringify(error)}`)
        } else {
            //cek email sudah terigester?
            User.findOne({
                where : {
                    email : email
                }
            })
                .then(result => {
                    if(result){
                        error.push({mes:'email already used !,\n please used another email'})
                        res.redirect(`/user/add?mes=${JSON.stringify(error)}`)
                    } else {
                        let value = {
                                    username,
                                    email,
                                    password,
                                    date,
                                    gender,
                                }
                        User.create(value)
                            .then(result => {
                                let data = []
                                data.push(result)
                                res.render("sucsses", {data})
                            })
                    }
                })    

        }

    }
}

module.exports = UserController