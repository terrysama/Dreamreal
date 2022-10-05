const navBtn = document.querySelector('.navbar-toggler');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.navbar-nav');
const header = document.querySelector(".header");

navBtn.addEventListener('click', () => {
    const isExpanded = JSON.parse(navBtn.getAttribute('aria-expanded'));
    isExpanded && nav.classList.add('scrolled');
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollPosition = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPosition = window.pageYOffset;
  if (prevScrollPosition > currentScrollPosition) {
    nav.style.top = "0";
  } else {
    nav.style.top = -nav.offsetHeight + 'px';
  }
  prevScrollPosition = currentScrollPosition;
}

// -- INTERSECTION OBSERVERS --

// Scroll Effect For Navbar
const scrollOptions = {
    threshold: 0,
    rootMargin: "-35%"
}

const scroll = new IntersectionObserver(function (entry) {
    !entry[0].isIntersecting ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
}, scrollOptions);

scroll.observe(header);

// Content Animations
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
    threshold: 0,
    rootMargin: "0% 0% -10% 0%"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        } else {
            return;
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});