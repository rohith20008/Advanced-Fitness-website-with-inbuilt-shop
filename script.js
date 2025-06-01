// Initialize EmailJS with your public key
emailjs.init("em7wLHgzKmEcGMVvC");

const enrollButtons = document.querySelectorAll(".enroll-btn");
const modal = document.getElementById("enroll-modal");
const closeBtn = document.querySelector(".close-btn");
const form = modal.querySelector("form");
const successPopup = document.getElementById("success-popup");
const closeSuccess = document.getElementById("close-success");

// Show modal when enroll button is clicked
enrollButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

// Close modal on 'x' button click
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the form
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Form submission with EmailJS
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form reload

  const name = form.querySelector("input[type='text']").value;
  const email = form.querySelector("input[type='email']").value;
  const course = form.querySelector("select").value;

  const templateParams = {
    name: name,
    email: email,
    course: course
  };

  // Send email using EmailJS
  emailjs.send("service_iu0azvk", "template_fykoyke", templateParams)
    .then(() => {
      modal.style.display = "none";         // Close modal
      successPopup.style.display = "flex";  // Show success popup
      form.reset();                         // Reset form fields
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Could not send confirmation email. Please try again.");
    });
});

// Close success popup
closeSuccess.addEventListener("click", () => {
  successPopup.style.display = "none";
});

