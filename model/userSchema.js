import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({ 
    username : { 
        type:String,
        required:[true,'Please enter username'],
        trim: true,
        minLength: [5, 'Please enter atlaest 5 characters'],
        maxLength: [30, 'Please enter below 30 characters'],
    },
    email :{ 
        type :String ,
        required:[true,'please enter email address'],
        unique: true,
        trim: true,
        minLength: [13, 'Please enter atlaest 13 characters'],
        minLength: [30, 'Please enter below 30 characters'],
        
        },
    password:{ 
              type:String,
              required:true,
              minLength: [3, 'Please enter atlaest 13 characters'],
              minLength: [30, 'Please enter below 30 characters'],
            }, 
    role: {
            type: String,
            enum: ['admin', 'manager', 'user'],
            default: 'user'
        },
    
},{
    timestamps:true
}
)

const UserModel = new mongoose.model('UserModel',UserSchema);
export default UserModel














