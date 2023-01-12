var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");

const SALT = 10;

var Schema = mongoose.Schema;

var ShedOwnerSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    nic:{
        type:String,
        required:[true,'NIC field is required!'],
        maxlength:20
    },
    address:{
        type:String,
        required:[true,'Address field is required!'],
        maxlength:100
     },
    // gender:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:20
    // },
    // dob:{
    //     type:Date,
    //     required:[true,'Gender field is required!']
    // },
    // age:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:20
    // },
    // weight:{
    //     type:String,
    //     required:[true,'Weight field is required!'],
    //     maxlength:20
    // },
    // blood_group:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:20
    // },
    // deceases:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:100
    // },
    // expected_organ_or_equipment:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:100
    // },
    // hospital:{
    //     type:String,
    //     required:[true,'Gender field is required!'],
    //     maxlength:100
    // },
    // email:{
    //     type:String,
    //     required:[true,'Email field is required!'],
    //     unique:true
    // },
    // phone_number:{
    //     type:String,
    //     required:[true,'Phone number field is required!']
    // },
    // subordinate_contact:{
    //     type:String,
    //     required:[true,'Subordinate contact field is required!']
    // },
    role:{
        type:String,
        enum:UseRole,
        required:[true,'User role field is required!']
    },
    password:{
        type:String,
        required:[true,'Password field is required!'],
        minlength:5
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

//Saving user data
ShedOwnerSchema.pre('save',function(next){
    var shedowner=this;
    if(shedowner.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(shedowner.password,salt,function(err,hash){
                if(err) return next(err)
                shedowner.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
ShedOwnerSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
ShedOwnerSchema.methods.generateToken=function(callBack){
    var shedowner=this;
    var token=jwt.sign(shedowner._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
ShedOwnerSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        ShedOwner.findById(decode,function(err,shedowner){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,shedowner);
        });
    });
};   

const ShedOwner = mongoose.model('ShedOwner',ShedOwnerSchema);
module.exports = {ShedOwner};