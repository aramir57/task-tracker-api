import{
    getAllByProject,
    getById,
    create,
    update,
    remove,
    addCategoryToTask,
} from '../repositories/taskRepo.js';

export async function getAllTasks(projectId){
    return await getAllByProject(projectId);
}

export async function getTaskById(id){
    const task = await getById(id);
    if (task) return task;

    const error = new Error(`Task ${id} not found`);
    error.status=404;
    throw error;
}

export async function createTask(taskData){
    return await create(taskData);
}

export async function updateTask(id, updatedData){
    const updatedTask = await update(id,updatedData);
    if(updatedTask) return updatedTask;

    const error = new Error(`Task ${id} not found`);
    error.status=404;
    throw error;
}

export async function deleteTask(id){
    const result = await remove(id);
    if(result) return;

    const error = new Error(`Task ${id} not found`);
    error.status=404;
    throw error;
}

export async function linkCategory(taskId, categoryId){
    try{
        return await addCategoryToTask(taskId,categoryId);
    }catch(error){
        const err = new Error('Task or Category does not exist');
        err.status=404;
        throw err;
    }
}