const express = require("express");
const cors = require("cors");
const ctrl = require("./controller/ctrl");

const app = express();

app.use(express.static("public"));
const path = require("path");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";

let drinkName = "";
let alcType = "";
let glassType = "";

//endpoints
app.get(`${baseURL}/random.php`, ctrl.getRandDrink);
app.get(`${baseURL}/search.php?s=${drinkName}`, ctrl.getDrinkByName);
app.get(`${baseURL}/filter.php?g=${glassType}`, ctrl.getDrinkByGlass);
app.get(`${baseURL}/filter.php?i=${alcType}`, ctrl.getDrinkByAlcohol);

const port = process.env.PORT || 4004;
app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
