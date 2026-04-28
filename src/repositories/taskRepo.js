import prisma from '../config/db.js';

export async function getAllByProject(projectId){
    return await prisma.task.findMany({
        where: { projectId },
        include: { categories: true }
    });
}

export async function getById(id){
    return await prisma.task.findUnique({
        where: {id},
        include: { project: true, categories: true }
    });
}

export async function create(taskData){
    return await prisma.task.create({ data: taskData });

}

export async function update(id, updateData){
    try{
        return await prisma.task.update({
            where: { id },
            data: updateData,
        });
    }catch(error){
        if(error.code === 'P2025')return null;
        throw error;
    }
}

export async function remove(id) {
    try{
        return await prisma.task.delete({
            where: { id },
        });
    }catch (error){
        if(error.code === 'P2025') return null;
        throw error;
    }
}

export async function addCategoryToTask(taskId, categoryId){
    return await prisma.task.update({
        where: {id: parseInt(taskId)},
        data: {
            categories: {
                connect: {id: parseInt(categoryId)}
            }
        },
        include: {categories:true}
    });
}