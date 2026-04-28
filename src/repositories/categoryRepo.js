import prisma from '../config/db.js';

export async function getAll(){
    return await prisma.category.findMany();
}

export async function getById(id){
    return await prisma.category.findUnique({
        where: { id:parseInt(id)}
    });
}

export async function create(data){
    return await prisma.category.create({
        data: data
    });
}

export async function update(id, data){
    return await prisma.category.update({
        where: { id: parseInt(id)},
        data: data
    });
}

export async function remove(id){
    return await prisma.category.delete({
        where: { id: parseInt(id)}
    });
}