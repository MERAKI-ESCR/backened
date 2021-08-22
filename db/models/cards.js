const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");

const cardInfo = new mongoose.Schema({
    cardNumber:{type:String, required:true},
    cardHolder: {type:String, required:true},
    expiryDate:{type:String,required:true},
    userId:{type:mongoose.Schema.ObjectId, ref:"User"}
});

cardInfo.pre("save",async function(){
    this.cardNumber = await bcrypt.hash(this.cardNumber,10);
})

module.exports = mongoose.model("Card", cardInfo)