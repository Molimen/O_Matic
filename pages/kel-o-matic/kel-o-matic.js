function printA() {
    console.log("a");
}
export function init() {
    document.getElementById('abc').addEventListener('click', () => {
        printA();
    });
}