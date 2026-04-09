// ✅ Correct Railway backend URL
const API_URL = "https://my-portfolio-production-84e0.up.railway.app";

// ✅ Hide loader when page loads
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
  }
});

// ✅ Handle form submit safely
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm"); // use ID (safer)

  // ✅ Prevent crash if form not found
  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Get values safely
    const fname = document.querySelector("#fname")?.value || "";
    const lname = document.querySelector("#lname")?.value || "";
    const email = document.querySelector("#email")?.value || "";
    const budget = document.querySelector("#budget")?.value || "";
    const message = document.querySelector("#message")?.value || "";

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
