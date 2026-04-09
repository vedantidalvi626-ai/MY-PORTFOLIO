// ===========================
// CONFIG
// ===========================
const API_URL = window.location.origin; // works on Railway

// ===========================
// PAGE LOADER FIX
// ===========================
window.onload = function () {
  const loader = document.getElementById("loader")// ===========================
// CONFIG
// ===========================
const API_URL = window.location.origin;

// ===========================
// PAGE LOADER
// ===========================
window.onload = function () {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

// ===========================
// MOBILE MENU
// ===========================
function closeMenu() {
  const overlay = document.getElementById("mobOverlay");
  if (overlay) overlay.classList.remove("open");
}

// ===========================
// MAIN INIT
// ===========================
document.addEventListener("DOMContentLoaded", () => {

  // ── Slide-up animations ──
  const elements = document.querySelectorAll(".slide-up");
  if (window.innerWidth < 768) {
    elements.forEach(el => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 }); // triggers when 10% visible
    elements.forEach(el => observer.observe(el));
  }

  // ── Hamburger menu ──
  const hamburger = document.getElementById("hamburger");
  const mobOverlay = document.getElementById("mobOverlay");
  const mobClose = document.getElementById("mobClose");

  hamburger?.addEventListener("click", () => mobOverlay?.classList.add("open"));
  mobClose?.addEventListener("click", () => mobOverlay?.classList.remove("open"));

  // ── Nav scroll effect ──
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ── Skill bar animation ──
  const skillFills = document.querySelectorAll(".skill-fill");
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + "%";
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(el => skillObserver.observe(el));

  // ── Custom cursor (desktop only) ──
  if (window.innerWidth > 960) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    document.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
      setTimeout(() => {
        ring.style.left = e.clientX + "px";
        ring.style.top  = e.clientY + "px";
      }, 80);
    });
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("expanded"));
      el.addEventListener("mouseleave", () => ring.classList.remove("expanded"));
    });
  }

  // ── Contact form ──
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector(".submit-btn");
    btn.textContent = "Sending…";
    btn.disabled = true;

    const body = {
      fname:   document.querySelector("#fname")?.value || "",
      lname:   document.querySelector("#lname")?.value || "",
      email:   document.querySelector("#email")?.value || "",
      budget:  document.querySelector("#budget")?.value || "",
      message: document.querySelector("#message")?.value || "",
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const success = document.getElementById("formSuccess");
        success?.classList.add("show");
        form.reset();
        setTimeout(() => success?.classList.remove("show"), 5000);
      } else {
        const result = await response.text();
        alert("❌ Error: " + result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("❌ Server not reachable. Try emailing directly.");
    } finally {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }
  });

});
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
