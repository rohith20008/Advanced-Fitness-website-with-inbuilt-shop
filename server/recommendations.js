module.exports = function getRecommendation(age, occupation, medical) {
  if (medical.includes('diabetes')) return "Low Sugar & Cardio Plan";
  if (occupation.toLowerCase().includes('student')) return "High Energy Home Workout";
  if (age > 40) return "Joint-friendly Yoga Routine";
  return "Balanced Diet & HIIT Routine";
};
