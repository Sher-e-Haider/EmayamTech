import { createUser,findAllUser ,signin} from '../controllers/auth.js';
import express from 'express';
const route = express.Router();

route.get('/user',findAllUser)
route.post('/signup',createUser);
route.post('/signin',signin);

export default route;

