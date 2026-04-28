import * as service from '../services/categoryService.js';

export async function getCategoriesHandler(req,res,next){
    try{
        const categories = await service.listCategories();
        res.status(200).json(categories);
    }catch(err){next(err);}
}

export async function getCategoryByIdHandler(req,res,next){
    try{
        const category = await service.getCategoryById(req.params.id);
        res.status(200).json(category);
    }catch(err){
        next(err);
    }
}

export async function createCategoryHandler(req,res,next){
    try{
        const category = await service.createCategory(req.body);
        res.status(201).json(category);
    }catch(err){
        next(err);
    }
}

export async function updateCategoryHandler(req,res,next){
    try{
        const category = await service.updateCategory(req.params.id,req.body);
        res.status(200).json(category);
    }catch(err){next(err);}
}

export async function deleteCategoryHandler(req,res,next){
    try{
        await service.deleteCategory(req.params.id);
        res.status(204).send();

    }catch(err){next(err);}
}
