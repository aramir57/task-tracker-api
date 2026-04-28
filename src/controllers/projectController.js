import{
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from '../services/projectService.js';

export async function getAllProjectsHandler(req,res,next){
    try{
        const projects = await getAllProjects(req.user.id);
        res.status(200).json(projects);
    }catch (err){
        next(err);
    }
}

export async function getProjectByIdHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const project = await getProjectById(id);
        res.status(200).json(project);
    } catch(err){
        next(err);
    }
}

export async function createProjectHandler(req,res,next){
    try{
        const { title } = req.body;
        const newProject = await createProject({ title, userId: req.user.id});
        res.status(201).json(newProject);
    } catch(err){
        next(err);
    }
}

export async function updateProjectHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const { title } = req.body;
        const updated = await updateProject(id, { title });
        res.status(200).json(updated);
    }catch(err){
        next(err);
    }
}

export async function deleteProjectHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        await deleteProject(id);
        res.status(204).send();
    }catch (err){
        next(err);
    }
}