import { getTaskById } from '../services/taskService.js';

export async function authorizeTaskOwnership(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const task = await getTaskById(id);

        if(task.project.userId !== req.user.id){
            const error = new Error('Forbidden: insufficient permission');
            error.status=403;
            return next(error);
        }
        next();

    }catch(err){
        next(err);
    }
}