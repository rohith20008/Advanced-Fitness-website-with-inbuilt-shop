document.getElementById('diet-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const goal = document.getElementById('goal').value;
    const calories = document.getElementById('calories').value;
    const diet = document.getElementById('diet').value;
    const resultsDiv = document.getElementById('results');
  
    resultsDiv.innerHTML = "🍲 Loading your personalized Indian diet chart...";
  
    const apiKey = 'b67bb50264a84117a3f669dd5cfa331d';
    const spoonacularDiet = diet === 'vegetarian' ? 'vegetarian' : '';
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&diet=${spoonacularDiet}&apiKey=${apiKey}&excludeCuisine=Italian,Mexican,Chinese,Japanese,French`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (!data.week) {
        resultsDiv.innerHTML = "❌ Error: No meal plan was returned. Try different settings.";
        return;
      }
  
      resultsDiv.innerHTML = "";
  
      let dayIndex = 1;
      for (const day in data.week) {
        const meals = data.week[day].meals;
  
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `<h3>Day ${dayIndex}: ${day.charAt(0).toUpperCase() + day.slice(1)}</h3>`;
  
        const table = document.createElement('table');
        const header = `
          <tr>
            <th>Meal</th>
            <th>Title</th>
            <th>Calories</th>
            <th>Recipe</th>
          </tr>
        `;
        let rows = "";
        let totalCalories = 0;
  
        const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  
        meals.forEach((meal, index) => {
          const mealType = mealTypes[index] || `Meal ${index + 1}`;
          const mealCalories = meal.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
          totalCalories += mealCalories;
  
          rows += `
            <tr>
              <td>${mealType}</td>
              <td>${meal.title}</td>
              <td>${Math.round(mealCalories)} kcal</td>
              <td><a href="${meal.sourceUrl}" target="_blank">View</a></td>
            </tr>
          `;
        });
  
        rows += `
          <tr style="font-weight: bold;">
            <td colspan="2">Total</td>
            <td>${Math.round(totalCalories)} kcal</td>
            <td></td>
          </tr>
        `;
  
        table.innerHTML = header + rows;
        dayCard.appendChild(table);
        resultsDiv.appendChild(dayCard);
        dayIndex++;
      }
    } catch (err) {
      console.error(err);
      resultsDiv.innerHTML = "⚠️ Error fetching meal plan. Please try again later.";
    }
  });
  
  
  

