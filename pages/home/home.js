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

export function init() {
    
}