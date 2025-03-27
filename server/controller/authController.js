const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");

const signup = async(req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password, confirmPassword);

    if(!email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "every field is required"
        })
    }
    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password doesn't match"
        })
    }

    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success:true,
            message: "please enter a valid email"
        })
    }

    try{
        const userInfo = userModel(req.body); // Schema instances
        const result = await userInfo.save(); // store on the database / Save

        return res.status(200).json({
            success: true,
            data: result,
        })
    }
    catch(err){
        if(err.code === 11000){
            return res.status(400).json({
                success:false,
                message: "Account already exists with provided email id."
            })
        }
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

const signin = async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "every field is mandatory."
        })
    }

   try{
    const user = await userModel.findOne({email}).select('+password');

    if(!user || user.password == password){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
    res.cookie("token", token, cookieOption);
    res.status(200).json({
        success: true,
        data: user
    })
   }
   catch(err){
    return res.status(400).json({
        success: false,
        message: err.message
    })
   }
}

module.exports = {signup, signin};