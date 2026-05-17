// import { returnBirthday } from '../modules/person.js';

// const now = new Date();

// let test = false;
// let testDate = 19;
// let testMonth = 9;

// let month;
// let date;

// if (test) {
//     month = testMonth-1;
//     date = testDate;

// } else {
//     month = now.getMonth();
//     date = now.getDate();
// }

// function showBirthday() {
//     let birthday = returnBirthday()[month];

//     for (let i = 0; i < birthday.length; i++) {
//     const wraper = document.createElement('div');
//     wraper.className = 'birthday-wraper';

//     document.querySelector(".birthday-content").appendChild(wraper);
//     }

//     let counter = 0;
//     document.querySelectorAll(".birthday-wraper").forEach(wraper => {
//         const title = document.createElement("div");
//         const line = document.createElement("div");

//         title.className = "birthday-name";
//         title.textContent = `${birthday[counter][1]}`;
//         line.className = "birthday-date";
//         line.textContent = `${birthday[counter][0]}`;

//         const birthday_gap = 3;
//         if (date <= birthday[counter][0]) {
//             if (Math.abs(date-birthday[counter][0]) <= 0) {
//                 wraper.style.background = "#FFD700";
//                 wraper.style.color = "black";
//             } else if (Math.abs(date-birthday[counter][0]) <= Math.floor(birthday_gap/2)) {
//                 wraper.style.background = "#CE8946";
//                 wraper.style.color = "black";
//             } else if (Math.abs(date-birthday[counter][0]) <= birthday_gap) {
//                 wraper.style.background = "#C4C4C4";
//                 wraper.style.color = "black";
//             }
//         }

//         wraper.appendChild(title);
//         wraper.appendChild(line);
//         counter++;
//     });
// }

// export function init() {
//     document.querySelectorAll(".home-card-btn").forEach(btn => {
//         btn.addEventListener("click", () => {
//             history.replaceState(null, '', `#${btn.dataset.id}`);
//             window.dispatchEvent(new HashChangeEvent('hashchange'));
//             localStorage.setItem("transition", true);
//         });
//     });

//     showBirthday();

// }
import {spring, waapi, stagger, splitText, createTimeline, scrambleText } from 'https://esm.sh/animejs@4.4.1';

const { words, chars } = splitText('.hero-header', { words: true, chars: true, accessible: false });

export function init() {
    waapi.animate(chars.slice(0,8).reverse(), {
        translate: ['0 -120vw', '0 0'],
        delay: stagger(100),
        duration: 600,
        ease: spring({ bounce: .15, duration: 400 }),
    });
    waapi.animate(chars.slice(17,27).reverse(), {
        translate: [`-120vw 0`, `0 0`],
        delay: stagger(100),
        duration: 600,
        ease: spring({ bounce: .15, duration: 400}),
    });
    waapi.animate(chars.slice(8,17), {
        translate: [`120vw 0`, `0 0`],
        delay: stagger(100),
        duration: 600,
        ease: spring({ bounce: .15, duration: 400 }),
    });

    const SimplifySpan = document.querySelectorAll(".hero-header span:first-child span span");
    SimplifySpan.forEach(el => {
        el.classList.add("text-transparent" , "bg-clip-text", "bg-gradient-to-t" , "from-primary","from-30%" , "via-secondary" , "to-tertiary");
    });

    const boxes       = document.querySelectorAll('.box');
    const covers      = document.querySelectorAll('.cover');
    const progressBar = document.getElementById('progress-bar');
    const scrollSpace = document.querySelector('.scroll-space');

    // ── Main timeline ────────────────────────────────────────
    const tl = createTimeline({ autoplay: false, defaults: { ease: 'inOutQuad' } })
    .add(covers[0], { duration: 1000, translateY: '50%' })
    .add(covers[1], { duration: 1000, translateY: '-50%' }, '-=1000')
    .add('.box', {
        translateY: ['110vh', '0px'],
        rotate: '1turn',
        duration: 2000,
    }, '-=1500')
    .add('.box', {
        borderRadius: { delay: 200, duration: 800, from: '3px', to: '200px' },
        rotate: '-1turn',
        scale: [1, 1.5, 0.25],
        duration: 1250,
    })
    .add('.box', {
        scale: 1,
        width: '90vw',
        height: '15px',
        duration: 1000,
    })
    .add('.box', {
        backgroundColor: '#e8ff47',
        duration: 400,
        filter: ['blur(0px)', 'blur(4px)'],
    })
    .add('.anim-text', {
        delay: 175,
        opacity: { to: 1, duration: 250 },
        innerHTML: {
        to: scrambleText({ settleDuration: 500, revealRate: 30 }),
        delay: 500,
        duration: 1500,
        },
    })
    .add(boxes[0], {
        translateY: '185px',
        duration: 1500,
        ease: 'inOut(5.5)',
        delay: 100,
    })
    .add(boxes[1], {
        translateY: '-185px',
        duration: 1500,
        ease: 'inOut(5.5)',
    }, '-=1500')
    .add(covers[0], {
        duration: 1500,
        translateY: '110%',
        ease: 'inOut(5.5)',
    }, '-=1500')
    .add(covers[1], {
        duration: 1500,
        translateY: '-110%',
        ease: 'inOut(5.5)',
    }, '-=1500');

    // ── Progress bar timeline ────────────────────────────────
    const progressTl = createTimeline({ autoplay: false })
    .add(progressBar, {
        width    : ['0%', '100%'],
        duration : 1000,
        ease     : 'linear'
    });

    const totalDuration    = tl.duration;
    const progressDuration = progressTl.duration;
    let played = false;

    function scrub() {
    const rect     = scrollSpace.getBoundingClientRect();
    const total    = scrollSpace.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    // Show/hide progress bar
    const inView = scrolled > 0 && scrolled < total;
    progressBar.style.opacity = inView ? '1' : '0';

    // Scrub progress bar (always reversible)
    progressTl.seek(progress * progressDuration);

    // Main timeline: scrub until 10%, then play one-way
    if (!played) {
        tl.seek(progress * (totalDuration * (progress / 0.3)));

        if (progress >= 0.1) {
        played = true;
        tl.play();
        }
    }
    }

    const scrollStage = document.querySelector('.scroll-stage');
    const scrollSpaceRect = () => scrollSpace.getBoundingClientRect();

    function updateStickyStage() {
    const rect = scrollSpaceRect();
    const navbarH = 64; // sesuaikan dengan tinggi navbar kamu
    
    if (rect.top <= navbarH && rect.bottom >= window.innerHeight) {
        // Di zona sticky
        scrollStage.style.position = 'fixed';
        scrollStage.style.top = navbarH + 'px';
        scrollStage.style.left = '0';
        scrollStage.style.right = '0';
        scrollStage.style.height = (window.innerHeight - navbarH) + 'px';
    } else if (rect.bottom < window.innerHeight) {
        // Sudah melewati zona sticky — tempel di bawah
        scrollStage.style.position = 'absolute';
        scrollStage.style.top = 'auto';
        scrollStage.style.bottom = '0';
    } else {
        // Belum masuk zona sticky
        scrollStage.style.position = 'absolute';
        scrollStage.style.top = '0';
        scrollStage.style.bottom = 'auto';
    }
    }

    window.addEventListener('scroll', () => {
    scrub();
    updateStickyStage();
    }, { passive: true });

    updateStickyStage();
}