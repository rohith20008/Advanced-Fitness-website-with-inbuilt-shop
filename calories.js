const form = document.getElementById("calorie-form");
const foodInput = document.getElementById("food-input");
const resultArea = document.getElementById("result-area");

// Replace with your Nutritionix App ID and Key
const appId = "49504de1";
const appKey = "26ede962d3cd7e43dd752ef02c6b5950";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = foodInput.value.trim();
  if (!query) return;

  resultArea.innerHTML = "<p>🔍 Fetching nutritional info...</p>";

  try {
    const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": appId,
        "x-app-key": appKey
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) throw new Error("Failed to fetch data.");

    const data = await res.json();
    const food = data.foods[0];

    resultArea.innerHTML = `
      <h2>${food.food_name}</h2>
      <p><strong>Calories:</strong> ${food.nf_calories}</p>
      <p><strong>Serving Size:</strong> ${food.serving_qty} ${food.serving_unit}</p>
      <p><strong>Protein:</strong> ${food.nf_protein}g</p>
      <p><strong>Carbs:</strong> ${food.nf_total_carbohydrate}g</p>
      <p><strong>Fats:</strong> ${food.nf_total_fat}g</p>
    `;
  } catch (error) {
    console.error(error);
    resultArea.innerHTML = `<p style="color: red;">❌ Could not retrieve data. Please try again.</p>`;
  }
});
