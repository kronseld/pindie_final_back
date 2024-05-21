const fs = require('fs').promises;

//контроллёр для обработки запроса к главной странице

const getHtml = async (req,res) => {
    fs.readFile('./public/index.html', 'utf-8').then((data) => {
        res.header("Content-Type", "text/html").send(data);
    })
}

module.exports = getHtml;