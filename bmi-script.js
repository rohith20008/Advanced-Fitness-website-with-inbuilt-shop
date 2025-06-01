document.getElementById("bmiForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;
    const kgChange = parseFloat(document.getElementById("kgChange").value);
    const months = parseFloat(document.getElementById("months").value);
  
    // BMI Calculation
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    let bmiCategory = "";
  
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 24.9) bmiCategory = "Normal";
    else if (bmi < 29.9) bmiCategory = "Overweight";
    else bmiCategory = "Obese";
  
    // BMR Calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Maintenance calories
    const maintenanceCalories = bmr * activity;
  
    // Calorie Adjustment
    const totalCaloriesToChange = kgChange * 7700;
    const dailyAdjustment = totalCaloriesToChange / (months * 30);
    const finalCalories =
      goal === "gain"
        ? maintenanceCalories + dailyAdjustment
        : maintenanceCalories - dailyAdjustment;
  
    // Output
    document.getElementById("result").innerHTML = `
      <h3>Results</h3>
      <p><strong>BMI:</strong> ${bmi.toFixed(2)} (${bmiCategory})</p>
      <p><strong>Maintenance Calories:</strong> ${Math.round(maintenanceCalories)} kcal/day</p>
      <p><strong>To ${goal} ${kgChange} kg in ${months} month(s):</strong></p>
      <p><strong>Recommended Daily Calories:</strong> ${Math.round(finalCalories)} kcal/day</p>
    `;
  });
  const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatBody = document.getElementById("chat-body");

sendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  generateDietResponse(msg.toLowerCase());
  chatInput.value = "";
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender;
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateDietResponse(message) {
  let response = "";

  if (message.includes("gain")) {
    response = `Here's a high-calorie diet plan:
🍳 Breakfast: 4 boiled eggs, peanut butter toast  
🍚 Lunch: Rice, chicken curry, salad  
🥤 Snack: Banana smoothie with milk  
🍝 Dinner: Pasta with veggies and grilled paneer  
+ Add nuts and dry fruits for more calories.`;
  } else if (message.includes("lose")) {
    response = `Here's a calorie-deficit diet:
🥣 Breakfast: Oats with fruits  
🥗 Lunch: Grilled chicken/veg salad + multigrain roti  
🍎 Snack: Apple or green tea  
🥘 Dinner: Light soup + boiled veggies  
Drink 2-3L water & avoid sugar!`;
  } else if (message.includes("vegetarian" || "veg" || "Veg")) {
    response = `Veg diet suggestion:
🌞 Breakfast: Poha/upma + fruits  
🌮 Lunch: Rice, dal, sabzi, salad  
🍌 Snack: Banana or nuts  
🌃 Dinner: Chapati + paneer or tofu curry  
Stay consistent and hydrate well!`;
  } else if (message.includes("calorie")) {
    response = `To help you better, please share your goal (gain/lose), current weight, and preferred calories.`;
    if(message.includes(weight>70)){
      response = `You need to lose weight....
      Your diet is :
      🌞 Breakfast: idly 3nos+ fruits  
🌮 Lunch: Rice(200g), dal, sabzi, salad  
🍌 Snack: Banana or nuts  
🌃 Dinner: Chapati(3nos) + paneer or chicken curry `;

    }
    else if(weight<55){
      response=`You need to gain weight
      Your diet is :
      🌞 Breakfast: idly 4nos+ fruits +4eggs/100g panneer 
🌮 Lunch: Rice(300g), dal, sabzi, salad,200g chicken/soyachunks (100g)  
🍌 Snack: Banana or nuts  /whey protein
🌃 Dinner: Chapati(3nos) + paneer or chicken curry + 4eggs ; 
      `
    
    }
  } else {
    response = `Please tell me:
- Your goal (gain or lose weight)  
- Your calorie need (optional)  
- Food preference (veg/non-veg)`;
  }

  setTimeout(() => appendMessage("bot", response), 600);
}

  