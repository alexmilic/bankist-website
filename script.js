'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


// Modal window
const openModal = function (e) {
    e.preventDefault(); 
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();

    // window.scrollTo(
    //     s1coords.left + window.pageXOffset, 
    //     s1coords.top + window.pageYOffset
    // );

    // works in modern browsers
    // section1.scrollIntoView({
    //     behavior: 'smooth'
    // });

    window.scrollTo({
        left: s1coords.left + window.pageXOffset, 
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth'
    });
});


// page navigation
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// tabs component
tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Menu fade animations
const handleHover = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
            logo.style.this = this;
        });
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// calcualte random color
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;