const categoriesRouter = require('express').Router();
const { 
    findAllCategories, 
    findCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
    checkIsCategoryExistsWhenUpd
} = require('../middlewares/categories');
const { 
    sendAllCategories, 
    sendCategoryById, 
    sendCreatedCategory, 
    sendUpdatedCategory, 
    sendDeletedCat 
} = require('../controllers/categories');
const { checkAuth } = require('../middlewares/auth');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post('/categories', findAllCategories, checkIsCategoryExists, checkEmptyName, checkAuth, createCategory, sendCreatedCategory);
categoriesRouter.put('/categories/:id', findCategoryById, checkIsCategoryExistsWhenUpd, checkEmptyName, checkAuth, updateCategory, sendUpdatedCategory);
categoriesRouter.delete('/categories/:id', checkAuth, findCategoryById, deleteCategory, sendDeletedCat);

module.exports = categoriesRouter;