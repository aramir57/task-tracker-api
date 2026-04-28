import prisma from '../config/db.js';

export async function getAllProjectsRepo(userId){
    return await prisma.project.findMany({
        where: { userId },

        include: {
            tasks: {
                include: { categories: true }
            }
        }
    });
}

export async function getProjectByIdRepo(id){
    return await prisma.project.findUnique({where: {id},
        include: {
            tasks: {
                include: { categories: true }
            }
        }
    });
}

export async function createProjectRepo(data){
    return await prisma.project.create({ data });
}

export async function updateProjectRepo(id, data){
    try{
        return await prisma.project.update({
            where: { id },
            data,
        });
    } catch (error){
        if(error.code === 'P2025') return null;
        throw error;
    }
}

export async function deleteProjectRepo(id) {
    try{
        return await prisma.project.delete({where: { id }});   
    } catch(error){
        if(error.code === 'P2025') return null;
        throw error;
    }
}
