import express from 'express';
import { protect } from '../middleware/protect.js';
import {  findUser, PostUser, UpdateUser ,findUserById, statusChangintgToOtherState, getUsers, deleteUserForAdmin, noOfTodosLists, deleteTask } from '../controllers/task.js';
import { isAdmin, isAdminOrManager } from '../middleware/adminRecognization.js';

const route = express.Router();
//var upload = multer({dest:'./upload/'});

route.get('/get',findUser);
route.post('/post',protect,PostUser);
route.patch('/patch/:id',protect,UpdateUser);
route.delete('/delete/:id',protect,deleteTask);
route.post('/one',protect,findUserById);

// status changintg to otherState
route.patch('/status-changing-to-other-state',protect,statusChangintgToOtherState);
route.get('/get-all-users-for-admin-manager',protect,isAdminOrManager,getUsers);

route.delete('/admin-delete-user/:id',protect,isAdmin,deleteUserForAdmin);
route.get('/all-posts-by-a-user/:id',protect,isAdminOrManager,noOfTodosLists);

export default route;