import express from 'express';
import UserController from '../controllers/user.controller';
import multer from 'multer';
const route = express.Router();

export default () => {
	route.use(multer().none());
	route.post('/signup', UserController.newUser);
	return route;
};
