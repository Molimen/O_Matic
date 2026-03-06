export function init() {
    document.querySelectorAll(".home-card-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            history.replaceState(null, '', `#${btn.dataset.id}`);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    });
}