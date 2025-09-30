const Address = require("../models/addressModel");

const addAddress = async(req,res) => {
    try{
        const {fullName,address, phone, city, state, country, pincode} = req.body;
        const userId = req.user;

        const Addaddress = await Address.create({userId,fullName,address,phone,city,state,country,pincode});

        const addressData = await address.save();

        return res.status(200).json({
            success: true,
            message: "Address Created Successfully!"
        })
    } catch (error){
        return res.status(404).josn({
            success: false,
            messgae: eror.message
        })
    }
};


const getAddress = async (req , res) => {
    try {
        const address = await Address.find({});
        
        return res.status(200).json({
            success: true,
            message: "Address Get..",
            addressData : address
        });
        
    } catch (error) {
         return res.status(400).json({
        success: false,
        message: error.message,
        });
    }
}

module.exports = {
    addAddress,
    getAddress
}