// Replace this with your REAL Railway backend URL
const API_URL = "my-portfolio-production-84e0.up.railway.app";

// Handle form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values from form inputs
    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;
    const email = document.querySelector("#email").value;
    const budget = document.querySelector("#budget").value;
    const message = document.querySelector("#message").value;

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          budget,
          message
        })
      });

      const result = await response.text();

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Error: " + result);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("❌ Server not reachable");
    }
  });
});
