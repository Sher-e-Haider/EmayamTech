import TaskModel from "../model/taskSchema.js";
import UserModel from "../model/userSchema.js";
import { decrypt } from "./helpers/utils.js";

 export const findUser=async(req,res)=>{
    const tasks = await TaskModel.find({}).sort({ createdAt: -1 })
    .populate('assignedUser',"username email" );

    
    // const tasksWithDecryptedEmails = tasks.map(task => {
    //     if (task.assignedUser && task.assignedUser.email) {
    //       // Decrypt the email
    //       task.assignedUser.email = decrypt(task.assignedUser.email);
    //     }
    //     return task;
    //   });
  
    //  res.send(tasksWithDecryptedEmails);
    res.send(tasks);
 
    
 }

 export const getUsers = async(req,res)=>{
    try {
    
    const users = await UserModel.find({});
    const usersWithDecryptedEmails = await Promise.all(users.map(async (user) => {
      try {
        const encryptedEmail = user.email;
        const decryptedEmail = decrypt(encryptedEmail);
        return {
          ...user.toObject(),
          email: decryptedEmail || 'Decryption failed'
        };
      } catch (error) {
        return {
          ...user.toObject(),
          email: 'Decryption error'
        };
      }
    }));

    res.status(200).json({
      Success: true,
      message: 'All users with decrypted emails',
      data: usersWithDecryptedEmails
    });
  console.log(usersWithDecryptedEmails);
        
    } catch (error) {
     
       return res.status(500).send({Success:false,message:error.message,data:null})
    }
 }

 export const PostUser = async(req,res) =>{
    const {title,description} = req.body;
    try {
        const user =  new TaskModel({
            title,
            description,
            assignedUser:req.user._id
         })
         await user.save()
         //res.send(user);
         res.status(201).send(user);
    } catch (error) {
        res.send(error);
      
    }
 }
 export const UpdateUser = async(req,res)=>{
    const {id} = req.params;

    const {title,description} = req.body
    try {
        const user = await TaskModel.findByIdAndUpdate({_id:id},{title,description},{new:true});
        //await user.save()
        res.status(200).send({info:user,message:"success"})
    } catch (error) {
        console.log(error);
    }
 }

 export const deleteTask = async(req,res)=>{
    const {id} =  req.params;
    try {
        const user = await TaskModel.findByIdAndRemove({_id:id});
        //await user.save()
        res.status(200).send({info:user,message:"success"})
    } catch (error) {
        console.log(error);
    }
 }

 export const findUserById = async(req,res)=>{
    const { name , age } =  req.body;
    try {
        const user = await User.find({
            $or:[{name:name},{age:age}]
        });
        //await user.save()
        res.status(200).send({info:user,message:"success"})
    } catch (error) {
        console.log(error);
    }
 }



 //  status changing pending to completed or in-progress

 export const statusChangintgToOtherState = async(req,res)=>{
    const { status,_id } =  req.body;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true } 
          );
          if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
          }
          res.json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error });
    }
 }


 // only admin can delete user ;


 export const deleteUserForAdmin = async(req,res)=>{
  const { id } = req.params;
 
  try {
      await UserModel.findByIdAndRemove({_id:id});
      return res.status(200).send({Success:true,message:'User deleted Successfully'})
     
  } catch (error) {
      return res.status(500).send({Success:false,message:error.message,data:null})
  }
}


// how many todos list user has created;

export const noOfTodosLists = async(req,res)=>{
  const { id } = req.params;

  try {
     const allPostsByaUser = await TaskModel.find({assignedUser:id});
      return res.status(200).send({Success:true,allPosts:allPostsByaUser,user:req.user.username})
     
  } catch (error) {
      return res.status(500).send({Success:false,message:error.message,data:null})
  }
}
