let counter = 0;
function updateInfo() {
    counter = 0;
    document.querySelectorAll("#widthNotSupport > span").forEach(span => {
        switch (counter) {
            case 0:
                span.innerHTML = `Viewport:<br>${window.innerWidth}px x ${window.innerHeight}px`;
                break;
            case 1:
                span.innerHTML = `DPR:<br>${window.devicePixelRatio}`;
                break;
            case 2:
                span.innerHTML = `Screen Resolution:<br>${screen.width}px x ${screen.height}px`;
                break
            default:
                break;
        }
        counter++;
    });
}

window.addEventListener('load', updateInfo);
window.addEventListener('resize', updateInfo);
window.addEventListener('orientationchange', updateInfo);