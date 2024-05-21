const game =  require('../models/game');

/*const findAllGames = async (req, res, next) => {
    req.gamesArray = await game.find({}).populate("categories").populate({ path: "users", select: "-password" });
    next();
  };*/

const findAllGames = async (req, res, next) => {
  if(req.query["categories.name"]) { 
    req.gamesArray = await game.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
  req.gamesArray = await game
    .find({})
    .populate("categories")
    .populate({
      path: "users",
      select: "-password"
    })
  next();
};


const findGameById = async (req, res, next) => {
  try {
    req.game = await game.findById(req.params.id).populate("categories").populate({ path: "users", select: "-password" });
    next();
  } catch(error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: 'Игра не найдена' }));
  }
};
  
const createGame = async (req, res, next) => {
  try {
    console.log('POST /games');
    req.game = await game.create(req.body);
    next();
  } catch(error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
  }
};

const updateGame = async (req, res, next) => {
  try {
    req.game = await game.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch(error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления игры" }));    
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await game.findByIdAndDelete(req.params.id);
    next();
  } catch(error)
 {
  res.setHeader("Content-Type", "application/json");
  res.status(400).send(JSON.stringify({ message: "Ошибка удаления игры" }));      
 }};

 const checkEmptyFields = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
if (
  !req.body.categories || 
  req.body.categories.length === 0
) {
  res.setHeader("Content-Type", "application/json");
  res.status(400).send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
} else {
  next();
}
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if(!req.body.users) {
    next();
    return;
  }
  if(req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));    
  };
}

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
};
const checkIsGameExistsWhenUpd = async (req, res, next) => {
  req.gamesArray = await game.find({});
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title && req.params.id !== game.id;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
};

const checkIsVoteRequest = async (req, res, next) => {
if (Object.keys(req.body).length === 1 && req.body.users) {
  req.isVoteRequest = true;
}
next();
};

  module.exports = { 
    findAllGames, 
    findGameById, 
    createGame, 
    updateGame, 
    deleteGame, 
    checkEmptyFields, 
    checkIfCategoriesAvaliable, 
    checkIfUsersAreSafe,
    checkIsGameExists,
    checkIsGameExistsWhenUpd,
    checkIsVoteRequest
  }; 