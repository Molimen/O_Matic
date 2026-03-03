import { currentLangFull } from '../lang.js';

export let isAuto = false;

if (localStorage.getItem("theme") === null) localStorage.setItem("theme", "auto");

if (localStorage.getItem("theme") === "auto") isAuto = true;
else isAuto = false;

if (!window.matchMedia('(prefers-color-scheme: dark)').matches) theme("light");
else theme("dark");

export function theme(mode) {
    if (mode === "light") {
        document.documentElement.style.setProperty('--menu-disabled-value', .9);
        document.documentElement.style.setProperty('--bg-footer-color', '#81818142');
        document.documentElement.style.setProperty('--bg-before-color', 'rgba(0, 0, 0, 0.13)');
        document.documentElement.style.setProperty('--primary-color', '#FD7AD6');
        document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
        document.documentElement.style.setProperty('--bg-second-color', '#DBDBDB');
        document.documentElement.style.setProperty('--bg-third-color', '#C4C4C4');
        document.documentElement.style.setProperty('--border-color', '#cecece');
        document.documentElement.style.setProperty('--text-color', '#0e0e0e');
        document.documentElement.style.setProperty('--text-inverted-color', 'white');
        document.documentElement.style.setProperty('--text-gray-color', '#737373');
        document.querySelector(".bg-image").style.filter = 'invert(1)';
        document.querySelectorAll(".menu-item-image").forEach(icon => {
            icon.style.filter = 'invert(0) opacity(.77)';
        });
    } else if (mode === "dark") {
        document.documentElement.style.setProperty('--menu-disabled-value', .6);
        document.documentElement.style.setProperty('--bg-footer-color', '#17171aA8');
        document.documentElement.style.setProperty('--bg-before-color', 'rgba(0,0,0, 0.6)');
        document.documentElement.style.setProperty('--primary-color', '#FC3EC4');
        document.documentElement.style.setProperty('--bg-color', '#17171a');
        document.documentElement.style.setProperty('--bg-second-color', '#2E2E34');
        document.documentElement.style.setProperty('--bg-third-color', '#414149');
        document.documentElement.style.setProperty('--border-color', '#222222');
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--text-inverted-color', 'black');
        document.documentElement.style.setProperty('--text-gray-color', '#BBBBBC');
        document.querySelector(".bg-image").style.filter = 'invert(0)';
        document.querySelectorAll(".menu-item-image").forEach(icon => {
            icon.style.filter = 'invert(1) opacity(1)';
        });
    }
}

function modifyBtnTheme(mode) {
    document.querySelector('button[data-value="theme-light"]').style.backgroundColor = "var(--bg-second-color)";
    document.querySelector('button[data-value="theme-dark"]').style.backgroundColor = "var(--bg-second-color)";
    document.querySelector('button[data-value="theme-auto"]').style.backgroundColor = "var(--bg-second-color)";
    if (mode === "light") {
        document.querySelector('button[data-value="theme-light"]').style.backgroundColor = "var(--primary-color)";
    } else if (mode === "dark") {
        document.querySelector('button[data-value="theme-dark"]').style.backgroundColor = "var(--primary-color)";
    } else if (mode === "auto") {
        document.querySelector('button[data-value="theme-auto"]').style.backgroundColor = "var(--primary-color)";
    }
}

export function effect(mode) {
    localStorage.setItem("effect", mode);
    if (mode === "enable") {
        document.documentElement.classList.remove('no-animations');
    } else if (mode === "disable") {
        document.documentElement.classList.add('no-animations');
    }
}

function modifyBtnEffect(mode) {
    if (mode === "enable") {
        document.querySelector('button[data-value="effect-enable"]').style.backgroundColor = "var(--primary-color)";
        document.querySelector('button[data-value="effect-disable"]').style.backgroundColor = "var(--bg-second-color)";
    } else if (mode === "disable") {
        document.querySelector('button[data-value="effect-enable"]').style.backgroundColor = "var(--bg-second-color)";
        document.querySelector('button[data-value="effect-disable"]').style.backgroundColor = "var(--primary-color)";
    }
}

function checkBTN(data) {
    const [type, value] = data.split("-");

    if (type === "theme") {
        localStorage.setItem("theme", value);

        if (value === "auto") {
            isAuto = true;
            if (!window.matchMedia('(prefers-color-scheme: dark)').matches) theme("light");
            else theme("dark");
        } else isAuto = false;

        theme(value);
        modifyBtnTheme(value);
    } else if (type === "effect") {
        effect(value);
        modifyBtnEffect(value);
    }
}

export function init() {
    if (localStorage.getItem("theme") !== null) {
        modifyBtnTheme(localStorage.getItem("theme"));
    } else {
        modifyBtnTheme("auto");
    }

    if (localStorage.getItem("effect") !== null) {
        modifyBtnEffect(localStorage.getItem("effect"));
    } else {
        modifyBtnEffect("enable");
    }

    document.querySelector(".multiselect-selector-name").textContent = currentLangFull();

    document.querySelectorAll(".settings-action-button").forEach(btn => {
        btn.addEventListener("click", () => {
            checkBTN(btn.dataset.value);
        });
    });

    // document.querySelector(".multiselect-selector").addEventListener("click", () => {
        // document.querySelector(".multiselect-container").classList.toggle("open");
    // });

    // document.querySelectorAll(".multiselect-options-option").forEach(option => {
        // option.addEventListener("click", () => {
            // document.querySelector(".multiselect-selector-name").textContent = option.textContent;
            // localStorage.setItem("lang", option.dataset.value);
            // document.querySelector(".multiselect-container").classList.remove("open");
        // });
    // });
}