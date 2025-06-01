module.exports = function getEmailTemplate(name, course, total, recommendation) {
  return `
    <h2>Hi ${name},</h2>
    <p>Thank you for purchasing the <strong>${course}</strong> course!</p>
    <p>Total Paid: <strong>₹${total}</strong></p>
    <p>Based on your inputs, we recommend: <strong>${recommendation}</strong></p>
    <br/>
    <p>Stay healthy and fit!</p>
    <p><em>Team FitPro</em></p>
  `;
};
