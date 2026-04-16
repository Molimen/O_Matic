function loadHTML(page, updateHistory) {
    const main = document.querySelector('main');

    return new Promise((resolve, reject) => {
        fetch(`pages/${page}/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.text();
        })
        .then(html => {
            new DOMParser().parseFromString(html, "text/html").querySelectorAll("meta").forEach(item => {
                if (item.name === "page-type") throw new Error("FALLBACK DETECTED!");
            });

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
                new DOMParser().parseFromString(html, "text/html").querySelectorAll("meta").forEach(item => {
                    if (item.name === "page-type") throw new Error("FALLBACK DETECTED!");
                });

                main.innerHTML = html;
                history.pushState({ page: "404" }, "", `#${"404"}`);
                resolve(html);
            })
            .catch((err) => {
                main.innerHTML = '500 Internal Error';
                if (updateHistory) history.pushState({ page: `${page}` }, '', `#${page}`);
                reject(err);
            });
        });
    });
}

async function loadJS(page) {
    const module = await import(`./pages/${page}/${page}.js`);
    module.init();
}

async function updateDOM(page, updateHistory=false) {
    if (page === '') page = 'home';
    
    await loadHTML(page,updateHistory);
    loadJS(page);
    
    document.getElementById('nav-bar-top').querySelectorAll('a').forEach(item => {
        // note:
        // text that being highlighted is => "text-[26px] text-pink-500 font-bold"
        // text that not being highlighted is => "text-[24px] text-slate-400"
        item.classList.remove('text-[26px]');
        item.classList.remove('text-pink-500');
        item.classList.remove('font-bold');

        item.classList.add('text-[24px]');
        item.classList.add('text-slate-400');

        // highlight a text
        if (item.getAttribute('href').replace('#', '') === page) {
            item.classList.remove('text-[24px]');
            item.classList.remove('text-slate-400');

            item.classList.add('text-[26px]');
            item.classList.add('text-pink-500');
            item.classList.add('font-bold');
        }
    });

    document.getElementById('nav-bar-bottom').querySelectorAll('a').forEach(item => {
        // note:
        // icon that being highlighted is => "bg-pink-600 text-white rounded-full h-[3.2rem] aspect-square"
        // icon that not being highlighted is => "text-slate-400 hover:text-pink-300"
        item.classList.remove('bg-pink-600');
        item.classList.remove('text-white');
        item.classList.remove('rounded-full');
        item.classList.remove('h-[3.2rem]');
        item.classList.remove('aspect-square');

        item.classList.add('text-slate-400');
        item.classList.add('hover:text-pink-300');

        // highlight a text
        if (item.getAttribute('href').replace('#', '') === page) {
            item.classList.remove('text-slate-400');
            item.classList.remove('hover:text-pink-300');

            item.classList.add('bg-pink-600');
            item.classList.add('text-white');
            item.classList.add('rounded-full');
            item.classList.add('h-[3.2rem]');
            item.classList.add('aspect-square');
        }
    });
}

window.addEventListener('popstate', (event) => {
    if (event.state === null) return;

    updateDOM(event.state.page);
});

window.addEventListener('hashchange', () => {
    updateDOM(location.hash.replace("#", ""));
});

updateDOM(location.hash.replace("#", ""),true);

if (localStorage.getItem("lang") !== null) {
    localStorage.clear();
}