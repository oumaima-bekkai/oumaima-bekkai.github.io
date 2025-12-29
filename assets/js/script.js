// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

//Linkedin
document.addEventListener('DOMContentLoaded', function() {
  // Select the LinkedIn anchor tag within the social list
  var linkedInIcon = document.querySelector('.social-list li a[href*="linkedin.com"]');

  // Add a click event listener to the LinkedIn icon
  linkedInIcon.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor link behavior
    window.open(this.getAttribute('href'), '_blank'); // Open the LinkedIn link in a new tab
  });
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}
// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  formBtn.disabled = true; // Optionally disable the button to prevent multiple submissions
  formBtn.textContent = 'Sending...'; // Provide user feedback

  const formData = new FormData(this); // Use FormData to capture all form data

  // Use fetch API to submit the form data to Formspree
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json' // Ensure you set the Accept header to expect a JSON response
    }
  })
  .then(response => {
    if (response.ok) {
      // Handle successful submission here
      alert('Thank you for your message! We will get back to you soon.');
      form.reset(); // Reset the form after successful submission
      formBtn.textContent = 'Send Message'; // Reset button text
    } else {
      // Handle submission errors here
      response.json().then(data => {
        if (data.errors) {
          alert(data.errors.map(error => error.message).join(", "));
        } else {
          alert('Oops! There was a problem with your submission.');
        }
      });
    }
  })
  .catch(error => {
    // Handle network errors here
    alert('Oops! There was a problem submitting your form.');
  })
  .finally(() => {
    // Re-enable the form button after processing (optional)
    formBtn.disabled = false;
  });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Flip cards (They trusted me section)
document.querySelectorAll("[data-flip-card]").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });

  // Keyboard accessibility
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("is-flipped");
    }
  });
});

/* ===============================
   Projects: "Under construction" modal
   Reuses the existing testimonials modal
   =============================== */

// Grab project links/cards (works with most versions of this template)
const projectLinks = document.querySelectorAll(".project-item a, [data-filter-item] a");

const openUnderConstruction = () => {
  // Safety: only run if the modal exists in the DOM
  if (!modalContainer || !overlay || !modalTitle || !modalText) return;

  // Set generic content
  modalTitle.innerHTML = "Under construction";
  modalText.innerHTML = "This project page is currently being built. Check back soon.";

  // Optional: clear image if present
  if (modalImg) {
    modalImg.src = "";
    modalImg.alt = "";
  }

  // Open modal (uses your existing function)
  testimonialsModalFunc();
};

// Intercept clicks on project cards
projectLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    // If you have some projects already live, you can exclude them by checking href here.
    e.preventDefault();
    openUnderConstruction();
  });
});

