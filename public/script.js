document.getElementById("course-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = parseInt(document.getElementById("age").value);
  const medical = document.getElementById("medical").value;
  const occupation = document.getElementById("occupation").value;
  const height = document.getElementById("height").value;
  const course = document.getElementById("course").value;
  const coupon = document.getElementById("coupon").value;

  let total = 999;
  if (coupon === "FIT50") total = total * 0.5;

  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      course,
      discount: coupon,
      total,
      recommendation: getRecommendation(age, occupation, medical)
    })
  });

  const msg = await res.text();
  alert(msg);
});

function getRecommendation(age, occupation, medical) {
  if (medical.includes("asthma")) return "Breathing & Relaxation Course";
  if (occupation.includes("IT")) return "Posture & Flexibility Plan";
  if (age > 40) return "Senior-friendly Low Impact Fitness";
  return "Full Body Transformation Plan";
}
