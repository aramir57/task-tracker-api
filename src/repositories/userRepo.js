import prisma from '../config/db.js';

export async function createUser(userData){
    return await prisma.user.create({
        data:{
            email: userData.email,
            password: userData.password,
            username: userData.username
        }
    });
}

export async function getUserByEmail(email){
    return await prisma.user.findUnique({
        where: { email },
    });
}

export async function getUserById(id){
    return await prisma.user.findUnique({
        where: { id },
    });
}
