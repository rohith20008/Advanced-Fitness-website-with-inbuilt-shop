// Personalized Workout Plan Generator
document.getElementById('workout-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const goal = document.getElementById('goal').value;
    const level = document.getElementById('level').value;
    const days = parseInt(document.getElementById('days').value);
    const currentWeight = parseFloat(document.getElementById('currentWeight').value);
    const goalWeight = parseFloat(document.getElementById('goalWeight').value);
    const duration = parseInt(document.getElementById('duration').value);
  
    let plan = "";
  
    if (goal === "weightloss") {
      if (level === "beginner") plan = "Beginner Fat Burn: Full-body circuit 3x/week + 2 cardio days";
      else if (level === "intermediate") plan = "HIIT 3x/week + Upper/Lower Split";
      else plan = "Split: Cardio + Strength 5x/week (Push-Pull-Legs)";
    } else if (goal === "muscle") {
      if (level === "beginner") plan = "Push-Pull-Legs 3x/week with light weights";
      else if (level === "intermediate") plan = "PPL 5x/week with progressive overload";
      else plan = "Bro Split 6x/week with advanced volume and intensity";
    } else if (goal === "endurance") {
      plan = `Mixed Cardio & Bodyweight Workouts ${days} days/week focusing on stamina.`;
    }
  
    const weightDiff = currentWeight - goalWeight;
    const weeklyLoss = (weightDiff / (duration * 4)).toFixed(2);
  
    plan += `<br><br><strong>Weight Goal:</strong> Lose ${weeklyLoss} kg per week for ${duration} months.`;
  
    document.getElementById('workout-result').innerHTML = plan;
  
    // Update Chart
    const chartData = [];
    for (let i = 0; i <= duration * 4; i++) {
      const weight = (currentWeight - (weeklyLoss * i)).toFixed(1);
      chartData.push(weight > 0 ? parseFloat(weight) : 0);
    }
  
    updateChart(chartData);
  });
  
  let chart;
  function updateChart(data) {
    const ctx = document.getElementById('progressChart').getContext('2d');
  
    if (chart) chart.destroy(); // Destroy previous chart
  
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => `Week ${i + 1}`),
        datasets: [{
          label: 'Projected Weight (kg)',
          data: data,
          borderColor: '#00ffcc',
          backgroundColor: 'rgba(0, 255, 204, 0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 3,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#444' }
          },
          y: {
            ticks: { color: '#fff' },
            grid: { color: '#444' }
          }
        }
      }
    });
  }
  