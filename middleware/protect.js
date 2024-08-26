import UserModel from '../model/userSchema.js'
import jwt from 'jsonwebtoken';

export const protect=async(req,res,next)=>{
    //res.send(req.headers.authorization);
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        //console.log(token);

    }
    if(!token){
       return res.status(401).send({message:"no authorised users"})
    }
    try {
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
       // console.log(decode._id);
        const user  = await UserModel.findById(decode._id);
        if(!user){
            return res.status(404).send({message:"no user found"})
        }
       
        req.user = user;
        //console.log(req.user);
        next()
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
   
}