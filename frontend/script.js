// ===========================
// CONFIG
// ===========================
const API_URL = window.location.origin; // works on Railway

// ===========================
// PAGE LOADER FIX
// ===========================
window.onload = function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
};

// ===========================
// MOBILE MENU FIX
// ===========================
function closeMenu() {
  const overlay = document.getElementById("mobOverlay");
  if (overlay) overlay.classList.remove("open");
}

// ===========================
// SCROLL ANIMATION FIX ✅
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".slide-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  elements.forEach(el => observer.observe(el));
});

// ===========================
// CONTACT FORM
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
// FIX for mobile visibility
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".slide-up");

  if (window.innerWidth < 768) {
    // 📱 On mobile → show everything directly
    elements.forEach(el => el.classList.add("visible"));
  } else {
    // 💻 Desktop → use animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    elements.forEach(el => observer.observe(el));
  }
});
