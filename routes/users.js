const usersRouter = require('express').Router();
const { 
    findAllUsers, 
    findUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPass,
    checkIsUserExists,
    checkIsUserExistsWhenUpd,
    hashPassword 
} = require('../middlewares/users');
const { 
    sendAllUsers, 
    sendUserById, 
    sendCreatedUser, 
    sendUpdatedUser, 
    sendDeletedUser,
    sendMe
} = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

usersRouter.get("/me", checkAuth, sendMe);
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.post('/users', findAllUsers, checkIsUserExists, checkEmptyNameAndEmailAndPass, checkAuth, hashPassword, createUser, sendCreatedUser);
usersRouter.put('/users/:id', findUserById, checkIsUserExistsWhenUpd, checkEmptyNameAndEmail, checkAuth, updateUser, sendUpdatedUser);
usersRouter.delete('/users/:id', checkAuth, findUserById, deleteUser, sendDeletedUser);

module.exports = usersRouter;