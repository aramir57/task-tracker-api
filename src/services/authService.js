import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../repositories/userRepo.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function signup(email, password){
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser({email, password: hashedPassword});
}

export async function login(email,password){
    const user = await getUserByEmail(email);
if(!user || !(await bcrypt.compare(password, user.password))){
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
}
const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'});
return token;
}