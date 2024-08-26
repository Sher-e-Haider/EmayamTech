import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
      },
      assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel' 
      },
},
{
    timestamps:true
}
)

const TaskModel =new mongoose.model("TaskModel",TaskSchema);
export default TaskModel