const sendAllGames = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.gamesArray));
  };

const sendGameById = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.game));  
};

const sendCreatedGame = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendUpdatedGame = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Игра обновлена!" }));   
};

const sendDeletedGame = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));  
}
  
  module.exports = { sendAllGames, sendGameById, sendCreatedGame, sendUpdatedGame, sendDeletedGame };
  