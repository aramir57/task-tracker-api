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
        const categoryData = { ...req.body, userId: req.user.id};
        const category = await service.createCategory(categoryData);
        res.status(201).json(category);
    }catch(err){
        next(err);
    }
}

export async function updateCategoryHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        const category = await service.getCategoryById(id);

    

    if(!category){
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
    }

    if(category.userId !== req.user.id){
        const err = new Error('Forbidden: You do not own this category');
        err.status=403;
        throw err;
    }

    const updated = await service.updateCategory(id,req.body);
    res.status(200).json(updated);
}catch(err){next(err);}

}

export async function deleteCategoryHandler(req,res,next){
    try{
        const id = parseInt(req.params.id);
        
        const category = await service.getCategoryById(id);

        if(!category){
            const err = new Error('Category not found');
            err.status=404;
            throw err;
        }

        if(category.userId !== req.user.id){
            const err = new Error('Forbidden: You do not own this category');
            err.status =403;
            throw err;
        }

        await service.deleteCategory(id);
        res.status(204).send();
    }catch(err){
        next(err);
    }
}
