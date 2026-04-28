import { getProjectById } from "../services/projectService.js";

export async function authorizeProjectOwnership(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const project = await getProjectById(id);

        if(project.userId !== req.user.id){
            const error = new Error('Forbidden: insufficient permission');
            error.status = 403;
            return next(error);
        }
        next();
    } catch(err){
        next(err);
    }
}