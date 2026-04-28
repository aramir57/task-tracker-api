import { signup, login } from '../services/authService.js';

export async function signupHandler(req,res,next){
    try{
        const{ email, password,username } = req.body;
        const newUser = await signup(email, password, username);
        res.status(201).json({id: newUser.id, email: newUser.email});
    } catch(err){
        next(err);
    }
}

export async function loginHandler(req,res,next){
    try{
        const { email, password } = req.body;
        const token = await login(email, password);
        res.status(200).json({ token });
    } catch(err){
        next(err);
    }
}