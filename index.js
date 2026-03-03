/*
TO-DO: 
0. add 404, easter egg
1. add footer
2. anti spam the menu selector
4. add rigged seat (maybe...)
*/

/*
dont forget do lang...
*/

import { theme, effect, isAuto } from './pages/settings/settings.js';
import { getLang, currentLang } from './pages/lang.js';

async function updateMenuItemSelect(page,skip=false) {
    const selector = document.getElementById('menu-item-select');
    if (skip) {
        selector.style.transition = "none";
    }

    const btn = document.querySelector(`button[data-id='${page}']`);
    if (btn === null) return;

    if (btn.dataset.id === "home") {
        selector.style.left = `${Math.round(window.innerWidth > 768 ?
            btn.offsetLeft > 0 ? btn.offsetLeft : 30 : -100)}px`;
        await new Promise(resolve => setTimeout(resolve, 1));
        selector.style.transition = "all .8s cubic-bezier(0.2, 1.3, 0.3, 1)";
        return;
    }
    selector.style.left = `${Math.round(window.innerWidth > 768 ? btn.offsetLeft-1 : btn.offsetLeft-2)}px`;
    await new Promise(resolve => setTimeout(resolve, 1));
    selector.style.transition = "all .8s cubic-bezier(0.2, 1.3, 0.3, 1)";
}

function loadHTML(page,updateHistory) {
    const main = document.querySelector('main');

    return new Promise((resolve, reject) => {
        fetch(`pages/${page}/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.text();
        })
        .then(html => {
            main.innerHTML = html;
            if (updateHistory) history.pushState({ page: `${page}` }, '', `#${page}`);
            resolve(html);
        })
        .catch(() => {
            fetch(`pages/404/404.html`)
            .then(res => {
                if (!res.ok) throw new Error("404 Page not found. womp womp.");
                return res.text();
            })
            .then(html => {
                main.innerHTML = html;
                history.pushState({ page: "404" }, "", `#${"404"}`);
                resolve(html);
            })
            .catch((err) => {
                main.innerHTML = '<div id="main-container">500 Internal Error</div>';
                if (updateHistory) history.pushState({ page: `${page}` }, '', `#${page}`);
                reject(err);
            });
        });
    });
}

function loadCSS(page) {
    const href = `pages/${page}/${page}.css`;
    return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;

        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error("Failed to load " + href));

        document.head.appendChild(link);
    });
}

async function loadJS(page) {
    const module = await import(`./pages/${page}/${page}.js`);
    module.init();
}

async function updateDOM(page, updateHistory=false, animMoveType="skip") {
    if (localStorage.getItem("effect") !== null) {
        if (localStorage.getItem("effect") === "disable") {
            animMoveType = "skip";
        }
    }

    lang = getLang(currentLang());

    if (page === '') page = 'home';
    const main = document.querySelector('main');

    updateMenuItemSelect(page, animMoveType === "skip" ? true : false);

    const body = document.querySelector('body');

    if (page !== 'home') {
        body.style.backgroundPosition = '0 6%';
    } else {
        body.style.backgroundPosition = '0 4%';
    }

    const animTime = 400;
    if (animMoveType === "up") {
        main.style.transition = `transform ${animTime}ms ease`;
        main.style.transform = "translateY(-200%)";
        await new Promise(resolve => setTimeout(resolve, animTime));
    } else if (animMoveType === "left") {
        main.style.transition = `transform ${animTime}ms ease`;
        main.style.transform = "translateX(-200%)";
        await new Promise(resolve => setTimeout(resolve, animTime));
        main.style.transition = "none";
        main.style.transform = "translateX(200%)";
    } else if (animMoveType === "right") {
        main.style.transition = `transform ${animTime}ms ease`;
        main.style.transform = "translateX(200%)";
        await new Promise(resolve => setTimeout(resolve, animTime));
        main.style.transition = "none";
        main.style.transform = "translateX(-200%)";
    }

    let isError = false;
    try {
        await loadCSS(page);
    } catch {isError = true;}
    await loadHTML(page,updateHistory);
    if (!isError) loadJS(page);

    if (localStorage.getItem("effect") !== null) effect(localStorage.getItem("effect"));

    if (document.querySelector(".about-info-debug-menu")) {
        document.querySelector(".about-info-debug-menu").addEventListener("click", () => {
            eruda.init();
            alert("mode debugnya sudah nyaalaa~"); //tbh, i search every encoder but i too lazy to implement it... :>
        });
    }

    if (animMoveType !== "skip") {
        main.style.transition = `transform ${animTime}ms ease`;
        main.style.transform = "translateX(0) translateY(0)";
        await new Promise(resolve => setTimeout(resolve, animTime));
        main.style.transition = "none";
    }
}

let lastType = -1;
function detectDirection(page) {
    let currentType = 0;
    switch (page) {
        case "home":
            currentType = 1;
            break;
        case "kel-o-matic":
            currentType = 2;
            break;
        case "seat-o-matic":
            currentType = 3;
            break;
        case "settings":
            currentType = 4;
            break;
        case "about":
            currentType = 5;
            break;
        default:
            break;
    }

    if (lastType > currentType) {
        lastType = currentType;
        return "left";
    } else if (lastType < currentType) {
        lastType = currentType;
        return "right";
    } else if (lastType === currentType) {
        lastType = currentType;
        return "up";
    }

    return;
}

document.querySelector('header').addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;

    updateDOM(btn.dataset.id,true,detectDirection(btn.dataset.id));
});

window.addEventListener('popstate', (event) => {
    if (event.state === null) return;

    updateDOM(event.state.page);
});

window.addEventListener('hashchange', () => {
    updateDOM(location.hash.replace("#", ""), false);
});

window.matchMedia("(max-width: 768px)").addEventListener("change", () => {
    updateMenuItemSelect(location.hash.replace("#", ""),true);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (isAuto) theme(e.matches ? 'dark' : 'light');
});

let lang = getLang(currentLang());

//Start the UI
detectDirection(location.hash.replace("#", ""));
updateDOM(location.hash.replace("#", ""), true);