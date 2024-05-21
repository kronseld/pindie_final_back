const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const path = require('path');
const apiRouter = require('./routes/apiRouter');
const cookieParser = require("cookie-parser");
const connectToDataBase = require('./database/connect');
const pagesRouter = require('./routes/pajes');
const app = express();

const PORT = 3001;
connectToDataBase();
app.use(
    cors, 
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, 'public'))
);
//app.use(express.static('public'));
//app.use(mainRoute);

app.listen(PORT, () => {
    console.log('Приложение запущено на порте ' + PORT);
});