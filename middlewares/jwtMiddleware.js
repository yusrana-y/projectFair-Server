const jwt = require('jsonwebtoken')

//middleware for verifying token, to check if logged in or not.

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwt middleware")
    //get token from req Header's Authorization key
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);
    //steps to verify token
   if(token!="")
   {
    try {
        const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD)
        console.log(jwtResponse);
        req.userId = jwtResponse.userId
        next()
    }
    catch{
        res.status(401).json("please login to proceed")
    }
   }
   else
   {
    res.status(406).json("authentication failed, token missing")
   }


   
}

module.exports = jwtMiddleware