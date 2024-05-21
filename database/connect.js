const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/pindie';

async function connectToDataBase() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Успешное подключение к базе MongoDB!')
    } catch(err) {
        console.log('Ошибка при подключении к базе MongoDB :(');
        console.error(err);
    }
};

module.exports = connectToDataBase;