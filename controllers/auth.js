import UserModel from '../model/userSchema.js';
//import bcrypt from 'bcrypt'
import { decrypt, encrypt,generateCryptoHash } from './helpers/utils.js';
import jwt from 'jsonwebtoken';

export const findAllUser = async(req,res)=>{
    try {
        const users = await UserModel.find({})
        res.send({message:"Success",data:users})
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req,res)=>{
    const {username, email,password } = req.body;
    try {
        const encryptEmail = await encrypt(email);
      
        const isExistuser = await UserModel.findOne({email:encryptEmail});
        if(isExistuser) return res.status(403).send({message:`user already exist with this ${email}`});
        const encryptPassword = await generateCryptoHash(password,"sha256");
    
        const user = await UserModel.create({
            username:username,
            password:encryptPassword,
            email:encryptEmail,
            role:password ==="1234"&& email==="sahil@gmail.com"?'admin':password ==="4321"&& email==="raza@gmail.com"?'manager':'user'
        })
        console.log(user._id);
        const token = await jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'15d'})
        res.status(201).send({message:`An account with Email ${email} created Successfully`,user,token,id:user._id,email,username:user.username})

    } catch (error) {
        console.log(error.message);
        res.send({message:error.message})
    }
}

export const signin = async(req,res) =>{
    const {email,password} = req.body;
    
    try {
       
        const encryptEmail = await encrypt(email);
        const isUser = await UserModel.findOne({email:encryptEmail});
        
        if(!isUser) return res.status(404).send({message:`User not found with this Email ${email}`});
                             
        const encryptPassword = await generateCryptoHash(password,"sha256");
       
       // const isCorrectPassword = await bcrypt.compare(isUser.password,encryptPassword);
       if(encryptPassword !=isUser.password) return res.status(401).send({message:`this Password ${password} is incorrect`});
       // if(!isCorrectPassword) return res.status(401).send({message:`this Password ${password} is incorrect`});
         const token = await jwt.sign({email:isUser.email,password:isUser.password,_id:isUser._id},process.env.JWT_SECRET,{expiresIn:'15d'})
         res.send({message:'Login successfully',token,id:isUser._id,email,username:isUser.username})
    } catch (error) {
        console.log(error);
    }
}