import{
    getAllProjectsRepo,
    getProjectByIdRepo,
    createProjectRepo,
    updateProjectRepo,
    deleteProjectRepo,
} from '../repositories/projectRepo.js';

export async function getAllProjects(userId){
    return await getAllProjectsRepo(userId);
}

export async function getProjectById(id){
    const project = await getProjectByIdRepo(id);
    if(project) return project;
    
    const error = new Error(`Project ${id} not found`);
    error.status = 404;
    throw error;
}

export async function createProject(data){
    return await createProjectRepo(data);
}

export async function updateProject(id, data){
    const updated = await updateProjectRepo(id,data);
    if(updated) return updated;

    const error = new Error(`Project ${id} not found`);
    error.status = 404;
    throw error;
}

export async function deleteProject(id){
    const result = await deleteProjectRepo(id);
    if(result) return;

    const error = new Error(`Project ${id} not found`);
    error.status = 404;
    throw error;
}
