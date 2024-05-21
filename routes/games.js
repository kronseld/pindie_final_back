const gamesRouter = require('express').Router();
const { 
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
} = require('../middlewares/games');
const { 
    sendAllGames, 
    sendGameById, 
    sendCreatedGame, 
    sendUpdatedGame, 
    sendDeletedGame 
} = require('../controllers/games');
const { checkAuth } = require('../middlewares/auth');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.post('/games', findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields,   createGame, sendCreatedGame, checkAuth);
gamesRouter.put('/games/:id', findGameById, checkIsGameExistsWhenUpd, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields,  updateGame, sendUpdatedGame, checkAuth);
gamesRouter.delete('/games/:id', findGameById, deleteGame, sendDeletedGame, checkAuth);

module.exports = gamesRouter;