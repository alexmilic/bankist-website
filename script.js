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

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function(e) {
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')
//     }
// });


// Sticky navigation: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);


// Sections animation
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    // stop observing
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.25
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy load images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    // stop observing
    observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
});

imgTargets.forEach(img => {
    imgObserver.observe(img);
});

// slider
const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
    
    let currSlide = 0;
    const maxSlide = slides.length;
    
    const createDots = function() {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML(
                'beforeend', 
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    }
    
    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => {
            dot.classList.remove('dots__dot--active');
        });
    
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }
    
    const goToSlide = function(slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${(i - slide) * 100}%)`
        });
    }
    
    const nextSlide = function() {
        if (currSlide === maxSlide - 1) {
            currSlide = 0;
        } else {
            currSlide++;
        }
        goToSlide(currSlide);
        activateDot(currSlide);
    }
    
    const prevSlide = function() {
        if (currSlide === 0) {
            currSlide = maxSlide - 1;
        } else {
            currSlide--;
        }
        goToSlide(currSlide);
        activateDot(currSlide);
    }
    const init = function() {
        goToSlide(0);
        createDots();
    
        activateDot(0);
    }
    init();
    
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
           e.key === 'ArrowRight' && nextSlide();
    });
    
    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot'));
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activateDot(slide);
    });
};

slider();



// calcualte random color
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;