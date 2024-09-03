import { useState, useEffect } from "react";
import "./TrackCalories.css";

export default function CalorieMeter(props) {
  const [currentCalories, setCurrentCalories] = useState(0);
  const [calories, setCalories] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [foodChoice, SetFoodChoice] = useState([]);
  const [addedFoods, setAddedFood] = useState({});
  const [query, setQuery] = useState("rice");
  const [quantity, setQuantity] = useState([]);
  const APP_ID = "7e0463d0";
  const APP_KEY = "04326f8012732143f103c58a17b560be";
  

  useEffect(() => {
    if (!query) return;
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    async function fetchData() {
      try {
        const response = await fetch(url);
        const foodItem = await response.json();
        setFoodList(foodItem.hits);
      } catch (e) {
        console.log(e, "Error getting the data");
      }
    }
    fetchData();
  }, [query]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function addCalories() {
    let dweight = 0;
    let selectedwt = 0
    let itemcal = 0
    let totalSum = []
    foodChoice.map((item)=>{
        dweight = item.totalWeight
        itemcal = item.calories
        selectedwt = quantity[item.uri]

        calcTotalCal(dweight, itemcal, selectedwt)
    })

    function calcTotalCal(dweight, itemcal, selectedwt) {
        totalSum.push((itemcal / dweight)  * selectedwt)
    }
    let finalSum = totalSum.reduce((partialSum,a)=>partialSum+a,0)
    setCurrentCalories(finalSum)
  }

  function handleAddFood(item) {
    const itemId = item.uri
    if(!addedFoods[itemId]) {
        setQuantity((prevq) => ({
            ...prevq,
            [itemId]:"50"
        }))
    }
    SetFoodChoice((prevFood) => [...prevFood, item]);
    setAddedFood((prevFood) => ({
      ...prevFood,
      [item.uri]: true,
    }));
  }

  function handleQuantity(itemId, quantity) {
    setQuantity((prevq)=>({
        ...prevq,
        [itemId]: quantity
    }))
  }

  const fillPercentage = (currentCalories / props.maxCalories) * 100;

  return (
    <div className="calorie-meter-container">
      <div className="calorie-meter">
        <div className="meter">
          <div
            className="meter-fill"
            style={{ width: `${fillPercentage}%` }}
          ></div>
        </div>
        <p className="calorie-count">
          Calories: {currentCalories} / {props.maxCalories}
        </p>
      </div>
      <input
        type="search"
        name="food"
        placeholder="enter food you took for the day"
        value={query}
        onChange={handleChange}
      />
      <h2>Select the type:</h2>
      <ul>
        {foodList.map((item) => (
          <div>
            <li key={item.recipe.uri}>{item.recipe.label}</li>
            <button
              onClick={() => handleAddFood(item.recipe)}
              disabled={addedFoods[item.recipe.uri]}
            >
              {addedFoods[item.recipe.uri] ? "Added" : "Add"}
            </button>
            {addedFoods[item.recipe.uri] && (
                <select value = {quantity[item.recipe.uri] || "50" } onChange={(e) => handleQuantity(item.recipe.uri, e.target.value)}>
                <option value="50">50</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="250">250</option>
                <option value="300">300</option>
              </select>
            )}
            
          </div>
        ))}
      </ul>
      <button onClick={addCalories}>Add Food</button>
    </div>
  );
}
