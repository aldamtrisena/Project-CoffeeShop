const sessionCustomerChecker = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.role === 'customer') {
       next();
    } 
    else {
      res.redirect(`/user/login`)  
    }    
}

const sessionAdminChecker = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.role === 'admin') {
       next();
    } 
    else {
      res.redirect(`/user/login`)  
    }    
}

const pageLogin = (req, res, next) => {
    if(req.session.isLoggedIn){
        next()
    }
    else{
        res.redirect(`/user/login`)
    }
}

module.exports = {
    sessionCustomerChecker,
    sessionAdminChecker,
    pageLogin
}