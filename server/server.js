const express = require("express");
const cors = require("cors");
const ctrl = require("./controller/ctrl");

const app = express();

app.use(express.static("public"));
const path = require("path");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const baseURL = "https://www.herethecocktaildb.com/api/json/v1/1";
// let drinkName = "margarita" //need to grab this from user input.
// let alcType = 'vodka' //grab from user input - needs to be updated
// let glassType = 'Cocktail_glass' // grab from user input - needs to be updated

//endpoints
app.get(`${baseURL}/random.php`, ctrl.getRandDrink);
// app.get(`${baseURL}/search.php?s=${drinkName}`, ctrl.getDrinkByName);
// app.get(`${baseURL}/filter.php?g=`, ctrl.getDrinkByGlass);
// app.get(`${baseURL}/search.php?i=${alcType}`, ctrl.getDrinkByAlcohol);

const port = 4004;
app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
