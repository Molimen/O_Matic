import { returnBirthday } from '../modules/person.js';

const now = new Date();

let test = true;
let testDate = 14;

let month;
let date;

if (test) {
    month = 12;
    date = testDate;

} else {
    month = now.getMonth();
    date = now.getDate();
}

function showBirthday() {
    let birthday = returnBirthday()[month];

    for (let i = 0; i < birthday.length; i++) {
    const wraper = document.createElement('div');
    wraper.className = 'birthday-wraper';

    document.querySelector(".birthday-content").appendChild(wraper);
    }

    let counter = 0;
    document.querySelectorAll(".birthday-wraper").forEach(wraper => {
        const title = document.createElement("div");
        const line = document.createElement("div");

        title.className = "birthday-name";
        title.textContent = `${birthday[counter][1]}`;
        line.className = "birthday-date";
        line.textContent = `${birthday[counter][0]}`;

        if (date <= birthday[counter][0]) {
            if (Math.abs(date-birthday[counter][0]) <= 0) {
                wraper.style.background = "#FFD700";
                wraper.style.color = "black";
            } else if (Math.abs(date-birthday[counter][0]) <= 1) {
                wraper.style.background = "#CE8946";
                wraper.style.color = "black";
            } else if (Math.abs(date-birthday[counter][0]) <= 3) {
                wraper.style.background = "#C4C4C4";
                wraper.style.color = "black";
            }
        }

        wraper.appendChild(title);
        wraper.appendChild(line);
        counter++;
    });
}

export function init() {
    document.querySelectorAll(".home-card-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            history.replaceState(null, '', `#${btn.dataset.id}`);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    });

    showBirthday();

}