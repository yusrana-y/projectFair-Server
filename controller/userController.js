const users = require("../models/userModel");
const jwt = require('jsonwebtoken')

// register logic
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body
    console.log(username, email, password);

    // check email is present in mongodb
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            //already user
            res.status(406).json("Account alreay exist !!! Please Sign in")
        } else {
            //register user
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profilePic: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//login login
exports.loginController = async (req, res) => {
    //get data from req body
    const { email, password } = req.body
    console.log(email, password);

    //check if present in user model
    try {
        const existingUser = await users.findOne({ email, password })
        if(existingUser) 
        {   //allow login
            //generate token
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }
        else
        {
            res.status(404).json("invalid email id/password")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}


// profile updation logic
exports.profileUpdationController = async (req,res)=>{
    console.log("inside profile Updation Controller");
    const {username,email,password,github,linkedin,profilePic} = req.body
    const updatedImg = req.file?req.file.filename:profilePic
    const userId = req.userId
    try
    {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profilePic:updatedImg},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }
    catch(err)
    {
        res.status(401).json(err)
    }

    
}