import { Router } from 'express';
import { getAuth, logout, signin, signup } from '../controllers/auth.js';

const Router_auth = Router();
Router_auth.get('/auth', getAuth)
Router_auth.post('/auth/signin', signin)
Router_auth.post('/auth/signup', signup)
Router_auth.post('/auth/logout', logout)
export default Router_auth;