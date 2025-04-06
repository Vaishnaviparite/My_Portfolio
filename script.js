//  Open Tab with Smooth Scroll & Highlight Active Tab 
function openTab(tabId) {
  let tabElement = document.getElementById(tabId);

  if (tabElement) {
      // Wipe transition effect
      document.querySelectorAll(".section").forEach(section => {
          section.classList.remove("wipe-enter-active", "active");
          section.classList.add("wipe-exit");
      });

      setTimeout(() => {
          tabElement.classList.remove("wipe-exit");
          tabElement.classList.add("wipe-enter", "wipe-enter-active", "active");
      }, 500);

      // Smooth scroll
      tabElement.scrollIntoView({ behavior: "smooth", block: "start" });

      // Highlight active tab
      document.querySelectorAll(".nav-links a").forEach(link => {
          link.classList.remove("active");
      });

      let activeLink = document.querySelector(`.nav-links a[href*='${tabId}']`);
      if (activeLink) {
          activeLink.classList.add("active");
      }

      // Save active tab in localStorage
      localStorage.setItem("activeTab", tabId);
  }
}

// Restore the last active tab on page load
document.addEventListener("DOMContentLoaded", () => {
  let savedTab = localStorage.getItem("activeTab") || "about"; // Default to "about"
  openTab(savedTab);
});

// Dark Mode Toggle 
const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body;

// Check local storage for dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
  } else {
      localStorage.setItem("darkMode", "disabled");
  }
});

//Visitor Counter
let visitorCount = localStorage.getItem("visitorCount") || 0;
visitorCount++;
localStorage.setItem("visitorCount", visitorCount);
document.getElementById("visitorCount").innerText = visitorCount;

// Form Validation For Contact Form
function validateForm(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let errorMessage = document.getElementById("error-message");

  if (name === "" || email === "" || message === "") {
      errorMessage.innerText = "Please fill in all fields.";
      errorMessage.style.color = "red";
      return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
      errorMessage.innerText = "Please enter a valid email.";
      errorMessage.style.color = "red";
      return false;
  }

  errorMessage.innerText = "Message sent successfully!";
  errorMessage.style.color = "green";

  // Simulate form submission
  document.getElementById("contactForm").reset();
}

// Project Filtering System 
function filterProjects(category) {
  let projects = document.querySelectorAll(".project-card");

  projects.forEach(project => {
      if (category === "all" || project.classList.contains(category)) {
          project.style.display = "block";
      } else {
          project.style.display = "none";
      }
  });
}

// Slideshow Feature 
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

// Auto slide change every 30 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 30000);

// Show the first slide initially
showSlide(currentSlide);
