import * as repo from '../repositories/categoryRepo.js';

export async function listCategories(){
    return await repo.getAll();
}

export async function getCategoryById(id){
    const category = await repo.getById(id);
    if(!category){
        const error = new Error('Category does not exist');
        error.status=404;
        throw error;
    }
    return category;

}

export async function createCategory(data){
    return await repo.create(data);
}

export async function updateCategory(id,data){
    try{
        return await repo.update(id,data);
    }catch(err){
        const error = new Error('Category does not exist');
        error.status =404;
        throw error;
    }
}

export async function deleteCategory(id){
    try{
        return await repo.remove(id);
    }catch (err){
        const error = new Error('Category does not exist');
        error.status =404;
        throw error;
    }
}