const results = document.querySelector(".results");
const form = document.querySelector("form");

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";

const getInput = (e) => {
  e.preventDefault();

  let glassType;
  const items = document.querySelectorAll('input[name="glass"]');
  for (const item of items) {
    if (item.checked) {
      glassType = item.value;
    }
  }
  getDrinkByGlass(glassType);
  console.log(glassType);
};
form.addEventListener("submit", getInput);

const getDrinkByGlass = (glassType) => {
  results.innerHTML = "";

  axios
    .get(`${baseURL}/filter.php?g=${glassType}`)
    .then((res) => {
      console.log(res.data);
      const { drinks } = res.data;
      if (drinks == null) {
        let answerSection = document.createElement("section");
        answerSection.className = "answer-section";
        results.appendChild(answerSection);

        let noneFound = document.createElement("h2");
        noneFound.innerHTML =
          "Sorry, no results found by that name. Please try again.";
        answerSection.appendChild(noneFound);
        return;
      } else {
        for (let i = 0; i < drinks.length; i++) {
          console.log(drinks[i].strDrink);
          let answerSection = document.createElement("section");
          answerSection.className = "answer-section";
          results.appendChild(answerSection);

          let drinkName = document.createElement("h2");
          drinkName.innerHTML = drinks[i].strDrink;
          answerSection.appendChild(drinkName);

          let drinkImage = document.createElement("img");
          drinkImage.className = "result-img";
          drinkImage.src = drinks[i].strDrinkThumb;
          answerSection.appendChild(drinkImage);
          let thisDrink = drinks[i].strDrink;

          axios
            .get(`${baseURL}/search.php?s=${thisDrink}`)
            .then((res) => {
              const drinks = res.data.drinks;

              for (let i = 0; i < drinks.length; i++) {
                if (drinks[i].strDrink === thisDrink) {
                  let drinkInstructions = document.createElement("p");
                  drinkInstructions.innerHTML = drinks[0].strInstructions;
                  answerSection.appendChild(drinkInstructions);
                  let ingredientList = document.createElement("section");
                  answerSection.appendChild(ingredientList);
                  for (j = 1; j < 16; j++) {
                    if (
                      drinks[i][`strIngredient${j}`] === null ||
                      drinks[i][`strIngredient${j}`] === ""
                    ) {
                      break;
                    }

                    if (
                      drinks[i][`strMeasure${j}`] === null ||
                      drinks[i][`strMeasure${j}`] === ""
                    ) {
                      drinks[i][`strMeasure${j}`] = "to taste";
                    }

                    let ingredient = document.createElement("li");
                    ingredient.innerHTML =
                      drinks[i][`strIngredient${j}`] +
                      ": " +
                      drinks[i][`strMeasure${j}`];
                    ingredientList.appendChild(ingredient);
                  }
                }
              }
            })
            .catch((error) => console.log(error));
        }
      }
    })
    .catch((error) => console.log(error));
};
