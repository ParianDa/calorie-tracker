import React, {  useState } from "react";
import "./TrackCalories.css"
import CalorieMeter from "./CalorieMeter";

const TrackCalories = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [rcalorie, setRcalorie] = useState(0);
  const [activity, setActivity] = useState("Select Activity level");

  
  function handleSubmit(event) {
    event.preventDefault();
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

    // Activity multiplier
    let calorieIntake;
    switch (activity) {
      case "sedentary":
        calorieIntake = bmr * 1.2;
        break;
      case "lightly active":
        calorieIntake = bmr * 1.375;
        break;
      case "moderately active":
        calorieIntake = bmr * 1.55;
        break;
      case "very active":
        calorieIntake = bmr * 1.725;
        break;
      case "extra active":
        calorieIntake = bmr * 1.9;
        break;
      default:
        throw new Error("Invalid activity level");
    }

    setRcalorie(Math.round(calorieIntake));
  }

  return (
    <div className="tc-container">
      <h2>Welcome to calorie counter</h2>
      <form onSubmit={handleSubmit}>
        Give your details:
        <input
          type="text"
          placeholder="Enter Your Height"
          onChange={(e) => setHeight(e.target.value)}
          name="height"
        />
        <input
          type="text"
          placeholder="Enter your weight"
          onChange={(e) => setWeight(e.target.value)}
          name="weight"
        />
        <input
          type="text"
          placeholder="Enter your Age"
          onChange={(e) => setAge(e.target.value)}
          name="Age"
        />
        <select
          name="activity"
          id="activity"
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="sedentary">sedentary</option>
          <option value="lightly active">lightly active</option>
          <option value="moderately active">moderately active</option>
          <option value="very active">very active</option>
          <option value="extra active">extra active</option>
        </select>
        <button type="submit">Give my required calorie</button>
      </form>
      <span>Your required calorie intake is : {rcalorie}</span>

      <div className="calorie-tracker-card">
        <CalorieMeter maxCalories={rcalorie}/>
      </div>
    </div>
  );
};

export default TrackCalories;
