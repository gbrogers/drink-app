// const randDrinkAns = document.querySelector("#rand-answer");
const randDrinkRequest = document.querySelector("#rand-request");
// const ingredientList = document.querySelector("#ingredient-list");
const results = document.querySelector(".results");

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
//Random Drink Generator
const getRandDrink = () => {
  results.innerHTML = "";

  axios
    .get(`${baseURL}/random.php`)
    .then((res) => {
      console.log(res.data.drinks[0]);
      const { drinks } = res.data;

      let answerSection = document.createElement("section");
      answerSection.className = "answer-section";
      results.appendChild(answerSection);

      let drinkName = document.createElement("h2");
      drinkName.innerHTML = drinks[0].strDrink;
      answerSection.appendChild(drinkName);

      let drinkImage = document.createElement("img");
      drinkImage.className = "result-img";
      drinkImage.src = drinks[0].strDrinkThumb;
      answerSection.appendChild(drinkImage);

      let drinkInstructions = document.createElement("p");
      drinkInstructions.innerHTML = drinks[0].strInstructions;
      answerSection.appendChild(drinkInstructions);

      let ingredientList = document.createElement("section");
      answerSection.appendChild(ingredientList);
      for (i = 1; i < 16; i++) {
        if (
          drinks[0][`strIngredient${i}`] === null ||
          drinks[0][`strIngredient${i}`] === ""
        ) {
          break;
        }
        if (
          drinks[0][`strMeasure${i}`] === null ||
          drinks[0][`strMeasure${i}`] === ""
        ) {
          drinks[0][`strMeasure${i}`] = "to taste";
        }

        let ingredient = document.createElement("li");
        ingredient.innerHTML =
          drinks[0][`strIngredient${i}`] + ": " + drinks[0][`strMeasure${i}`];
        ingredientList.appendChild(ingredient);
      }
    })
    .catch((error) => console.log(error));
};

randDrinkRequest.addEventListener("click", getRandDrink);
