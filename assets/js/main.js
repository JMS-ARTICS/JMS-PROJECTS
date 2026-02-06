document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".design-nav a");
  const items = document.querySelectorAll(".image-item");
  const dropdown = document.getElementById("designDropdown");

  function filterItems(category) {
    items.forEach(item => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
        item.classList.remove("d-none");
      } else {
        item.style.display = "none";
      }
    });
  }

  // Desktop tab click
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      const filter = tab.dataset.filter;

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      filterItems(filter);

      // Sync dropdown
      if (dropdown) dropdown.value = filter;
    });
  });

  // Mobile dropdown change
  if (dropdown) {
    dropdown.addEventListener("change", e => {
      const filter = e.target.value;

      filterItems(filter);

      tabs.forEach(t => {
        t.classList.toggle("active", t.dataset.filter === filter);
      });
    });
  }

  // Default load
  filterItems("all");
});


//==========================================//hero section GSAP scroll  ==========================================//

const wrapper = document.querySelector(".scrollImgWrapper");
const track = document.querySelector(".imgTrack");

window.addEventListener("load", () => {
  const imgs = track.querySelectorAll("img");
  const wrapperWidth = wrapper.offsetWidth;

  let trackWidth = 0;
  imgs.forEach(img => trackWidth += img.offsetWidth);

  // Calculate how many times to clone to fill wrapper + seamless
  const repeatCount = Math.ceil(wrapperWidth / trackWidth) + 1;

  for (let i = 0; i < repeatCount; i++) {
    imgs.forEach(img => track.appendChild(img.cloneNode(true)));
  }

  // Recalculate track width (original only for scroll distance)
  let originalTrackWidth = 0;
  imgs.forEach(img => originalTrackWidth += img.offsetWidth);

  // GSAP animation
  let scrollAnim = gsap.to(track, {
    x: -originalTrackWidth,
    duration: 30,
    ease: "linear",
    repeat: -1
  });

  // Pause on hover
  wrapper.addEventListener("mouseenter", () => scrollAnim.pause());
  wrapper.addEventListener("mouseleave", () => scrollAnim.resume());
});

// Booking Design
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");

  // 🔄 Start loading state
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  btnSpinner.classList.remove("d-none");

  const params = {
    customer_name: document.getElementById("customerName").value,
    customer_phone: document.getElementById("customerPhone").value,
    customer_email: document.getElementById("customerEmail").value,
    customer_subject: document.getElementById("customerSubject").value,
    customer_message: document.getElementById("message").value,
    design_type: document.getElementById("designType").value
  };

  emailjs.send(
    "service_wibny1u",
    "template_n8nywa4",
    params
  )
    .then(() => {
      alert("Inquiry sent successfully 🚀");
      document.getElementById("bookingForm").reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send inquiry ❌");
    })
    .finally(() => {
      // ✅ Restore button
      submitBtn.disabled = false;
      btnText.textContent = "🚀 Send Inquiry";
      btnSpinner.classList.add("d-none");
    });
});

// PreLoader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // If already shown in this session
  if (sessionStorage.getItem("preloaderShown")) {
    preloader.remove();
    return;
  }

  setTimeout(() => {
    preloader.classList.add("hide");

    // Remove after animation
    setTimeout(() => {
      preloader.remove();
    }, 600);

    sessionStorage.setItem("preloaderShown", "true");
  }, 800);
});