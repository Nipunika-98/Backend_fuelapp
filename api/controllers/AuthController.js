const { ShedOwner } = require("../models/ShedOwnerModel");
//const {Hospital}=require("../models/HospitalModel");

exports.registerShedOwner = (req,res)=>{
    const Owner = new Owner(req.body);

    Owner.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

// exports.loginShedOwner=(req,res)=>{
//     ShedOwner.findOne({email:req.body.email},(err,ShedOwner)=>{
//         if(!shedowner){
//             return res.status(404).json({
//                 success:false,
//                 message:"User email not found!"
//             });
//         }
//         shedowner.comparePassword(req.body.password,(err,isMatch)=>{
//             if(!isMatch){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Password is incorrect!"
//                 });
//             }
//             shedowner.generateToken((err,token)=>{
//                 if(err){
//                     return res.status(400).json({
//                         success:false,
//                         message:"Unable to generate jwt key!",
//                         data:err
//                     });
//                 }
//                 return res.status(200).json({
//                     success:true,
//                     message:"Successfully Logged In!",
//                     data:{
//                         "token":token
//                     }
//                 });
//             });
            
//         });
//     });
// }

// exports.getPatientDetails= (req, res) => {
//     res.json({status: true, message: "User Received!", data: req.patient});
// };

// //hospital
// exports.registerHospital = (req,res)=>{
//     const hospital = new ShedOwner(req.body);

//     hospital.save((err,doc)=>{
//         if(err){
//             return res.status(422).json({
//                 success:false,
//                 message:"Registration failed, Check the validation errors!",
//                 data:err
//             });
//         }else{
//             return res.status(200).json({
//                 success:true,
//                 message:"Successfully Registered!"
//             });
//         }
//     });
// }

// exports.loginShedOwner=(req,res)=>{
//     ShedOwner.findOne({email:req.body.email},(err,shedowner)=>{
//         if(!shedowner){
//             return res.status(404).json({
//                 success:false,
//                 message:"User email not found!"
//             });
//         }
//         shedowner.comparePassword(req.body.password,(err,isMatch)=>{
//             if(!isMatch){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Password is incorrect!"
//                 });
//             }
//             shedowner.generateToken((err,token)=>{
//                 if(err){
//                     return res.status(400).json({
//                         success:false,
//                         message:"Unable to generate jwt key!",
//                         data:err
//                     });
//                 }
//                 return res.status(200).json({
//                     success:true,
//                     message:"Successfully Logged In!",
//                     data:{
//                         "token":token
//                     }
//                 });
//             });
            
//         });
//     });
// }

// exports.getShedOwnerDetails= (req, res) => {
//     res.json({status: true, message: "User Received!", data: req.shedowner});
// };