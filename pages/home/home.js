async function getBirthdayData(idx) {
    try {

        const response = await fetch(`https://misty-haze-0c50b7xf9.ceplox021.workers.dev/?type=birthday&index=${idx}`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const rawdata = await response.json();
        return rawdata["result"];

    } catch {

        if (!navigator.onLine) throw new Error("Tidak ada koneksi internet");
        throw new Error("Koneksi bermasalah, coba lagi");

    }
    
}

const now = new Date();

let test = false;
let testDate = 11;
let testMonth = 9;

let month;
let date;

if (test) {
    month = testMonth-1;
    date = testDate;

} else {
    month = now.getMonth();
    date = now.getDate();
}

async function showBirthday() {
    let birthday = await getBirthdayData(month);

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

        const birthday_gap = 7;
        if (date <= birthday[counter][0]) {
            if (Math.abs(date-birthday[counter][0]) <= 0) {
                wraper.classList.add("h-0");
                wraper.style.color = "white";
            } else if (Math.abs(date-birthday[counter][0]) <= Math.floor(birthday_gap/2)) {
                wraper.classList.add("h-3");
                wraper.style.color = "black";
            } else if (Math.abs(date-birthday[counter][0]) <= birthday_gap) {
                wraper.classList.add("h-7");
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
            localStorage.setItem("transition", true);
        });
    });

    showBirthday();

}