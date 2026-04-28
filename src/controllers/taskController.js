import{
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    linkCategory,
} from '../services/taskService.js';

export async function getAllTasksHandler(req,res,next){
    try{
        const projectIds = req.query.projectId;
        if(!projectIds) {
            const err = new Error('projectId query parameter is required');
            err.status=400;
            throw err;
        }
        const projectId = parseInt(projectIds);
        if(isNaN(projectId)){
            const err = new Error('The provided projectId must be a valid number');
            err.status =400;
            throw err;
        }

        const project = await getProjectByIdRepo(projectId);
        if(project.userId !== req.user.id){
            const err = new Error('Forbidden: You do not own this project');
            err.status =403;
            throw err;
        }
        const tasks = await getAllTasks(projectId);
        res.status(200).json(tasks);

    }catch(err){
        next(err);
    }
}
export async function getTaskByIdHandler(req,res,next){
    try{
        const id=parseInt(req.params.id);
        const task = await getTaskById(id);
        res.status(200).json(task);

    }catch(err){
        next(err);
    }
}

export async function createTaskHandler(req,res,next){
    try{
        const { description, projectId } = req.body;
        const newTask = await createTask({description, projectId: parseInt(projectId)});
        res.status(201).json(newTask);
    }catch(err){
        next(err);
    }
}

export async function updateTaskHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const updated = await updateTask(id,req.body);
        res.status(200).json(updated);

    }catch(err){
        next(err);
    }
}

export async function deleteTaskHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        await deleteTask(id);
        res.status(204).send();
    }catch(err){
        next(err);
    }
}
export async function linkCategoryHandler(req, res, next) {
    try {
        const taskId = req.params.id;
        const { categoryId } = req.body;        
        const updatedTask = await linkCategory(taskId, categoryId);
        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
}



