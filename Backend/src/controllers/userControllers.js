const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { escape } = require("querystring");

const Ragister = async(req,res) => {
    try{
        const {name, email, password} = req.body;

        const isExist = await User.findOne({ email: email });
        if(isExist){
            return res.status(404).json({
                success: false,
                message: "Invalid Emial or Password"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        const userData = await user.save();

        const token = jwt.sign({_id: user._id,},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        )

        return res.status(200).json({
            success: true,
            message: "user Create Successfully",
            userData: userData,
            token: token
        })
    } catch (error){
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
////////////    login 

const Login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "User Login successfully",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      userData: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async(req,res) => {
    try {
        const user = await User.find({})

        return res.status(200).json({
            success: true,
            message: "User Fatced Successfully",
            user: user,
        })
    } catch (error) {
     return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    Ragister,
    Login,
    getUserProfile,
    getAllUser
};

