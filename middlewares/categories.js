const category = require('../models/category');

const findAllCategories = async (req, res, next) => {
    req.categoriesArray = await category.find({});
    next();
};

const findCategoryById = async (req, res, next) => {
    try {
        req.category = await category.findById(req.params.id);
        next();
    } catch(error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
    }
};

const createCategory = async (req, res, next) => {
    try {
        console.log('POST /categories');
        req.category = await category.create(req.body);
        next();
    } catch(error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Ошибка создания категории' }))
    }
};

const updateCategory = async (req, res, next) => {
    try {
        req.category = await category.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch(error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Ошибка обновления категории' }));        
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        req.category = await category.findByIdAndDelete(req.params.id);
        next();
    } catch(error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Ошибка удаления категории' }));        
    }
};

const checkIsCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
      return req.body.name === category.name;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
      next();
    }
};

const checkIsCategoryExistsWhenUpd = async (req, res, next) => {
    req.categoriesArray = await category.find({});
    const isInArray = req.categoriesArray.find((category) => {
      return req.body.name === category.name && req.params.id !== category.id;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
      next();
    }
};

const checkEmptyName = async (req, res, next) => {
    if (
      !req.body.name
    ) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Задайте имя для категории" }));
    } else {
      next();
    }
  };

module.exports = { 
    findAllCategories, 
    findCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
    checkIsCategoryExistsWhenUpd
};


