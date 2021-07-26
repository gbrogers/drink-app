const randDrinkAns = document.querySelector("#randAnswer");
const randDrinkRequest = document.querySelector("#randRequest");

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";

const getRandDrink = () =>
  axios
    .get(`${baseURL}/random.php`)
    .then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        const randText = document.createElement("p");
        randText.textContent = `${res.data[i]}`;
        document.querySelector("randDrinkAns").appendChild(randText);
      }
    })
    .catch((error) => console.log(error));

randDrinkRequest.addEventListener("click", getRandDrink);
