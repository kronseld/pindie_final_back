const sendAllCategories = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryById = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.category));
};

const sendCreatedCategory = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

const sendUpdatedCategory = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: 'Категория обновлена' }));  
};

const sendDeletedCat = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));  
}

module.exports = { sendAllCategories, sendCategoryById, sendCreatedCategory, sendUpdatedCategory, sendDeletedCat };
