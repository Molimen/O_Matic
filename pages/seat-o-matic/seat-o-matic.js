import { returnPerson } from '../person.js';

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
}

function resetSeat() {
    document.querySelectorAll('.seat-item-L').forEach(el => {
        el.textContent = '??';
        el.style.backgroundColor = "#9FFFA5";
    });
    document.querySelectorAll('.seat-item-P').forEach(el => {
        el.textContent = '??';
        el.style.backgroundColor = "#FFFA9F";
    });
}

let globalSeat;
function writeSeat(isWrite) {
    resetSeat();
    let seatOrder = [];

    if (isWrite) {
        let person = structuredClone(returnPerson()[Number(localStorage.getItem("classSelect"))]);
        let man = [];
        let woman = [];

        for (let i = 0; i < person.length; i++) {
            if (person[i][1] === "L") man.push(person[i]);
            else if (person[i][1] === "P") woman.push(person[i]);
        }

        let manRandom = shuffle(man);
        let womanRandom = shuffle(woman);
        let checkBalanced;
        if (manRandom.length === womanRandom.length) checkBalanced = 0;
        else if (manRandom.length > womanRandom.length) checkBalanced = 1;
        else if (manRandom.length < womanRandom.length) checkBalanced = 2;

        while (true) {
            if (manRandom.length === 0 || womanRandom.length === 0) {
                if (checkBalanced > 0) {
                    if (checkBalanced === 1) {
                        seatOrder.push([manRandom.pop()[0]+100,manRandom.pop()[0]+100]);
                    } else if (checkBalanced === 2) {
                        seatOrder.push([womanRandom.pop()[0]+200,womanRandom.pop()[0]+200]);
                    }

                    checkBalanced = 0;
                }

                break;
            }

            if (Math.floor(Math.random()*101) > 85 && checkBalanced > 0) {
                if (checkBalanced === 1) {
                    seatOrder.push([manRandom.pop()[0]+100,manRandom.pop()[0]+100]);
                } else if (checkBalanced === 2) {
                    seatOrder.push([womanRandom.pop()[0]+200,womanRandom.pop()[0]+200]);
                }
                if (manRandom.length === womanRandom.length) {
                    checkBalanced = 0;
                }
            } else {
                seatOrder.push([manRandom.pop()[0],womanRandom.pop()[0]]);
            }
        }
        globalSeat = structuredClone(seatOrder);
        document.querySelector(".seat-input-downloadnshare-button").disabled = false;
    } else if (!isWrite) {
        seatOrder = structuredClone(globalSeat);
    }

    let counter = 0;
    document.querySelectorAll('.seat-item-L').forEach(el => {
        if (counter < 16) {
            if (seatOrder[counter][0] > 100 && seatOrder[counter][0] < 200) {
                el.textContent = seatOrder[counter][0]-100;
                el.style.backgroundColor = "#9FFFA5";
            } else if (seatOrder[counter][0] > 200) {
                el.textContent = seatOrder[counter][1]-200;
                el.style.backgroundColor = "#FFFA9F";
            } else {
                el.textContent = seatOrder[counter][0];
            }
            counter++;
        } else {
            el.textContent = "XX";
        }
    });

    counter = 0;
    document.querySelectorAll('.seat-item-P').forEach(el => {
        if (counter < 16) {
            if (seatOrder[counter][1] > 100 && seatOrder[counter][1] < 200) {
                el.textContent = seatOrder[counter][1]-100;
                el.style.backgroundColor = "#9FFFA5";
            } else if (seatOrder[counter][0] > 200) {
                el.textContent = seatOrder[counter][0]-200;
                el.style.backgroundColor = "#FFFA9F";
            } else {
                el.textContent = seatOrder[counter][1];
            }
            counter++;
        } else {
            el.textContent = "XX";
        }
    });
}

async function downloadSeat() {
    if (typeof globalSeat === "undefined") {
        return;
    }

    const module = await import("./html2canvas.esm.js");
    const html2canvas = module.default;

    const element_target = document.querySelector('.seat-result-container');
    const canvas = await html2canvas(element_target);

    canvas.toBlob(async (blob) => {
        const file = new File([blob], "hasil.png", {type: "image/png"});

        //firefox kaga support share
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "Seat chart baru"
            });
            } 
        // Fallback download
        else {
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "hasil.png";
        a.click();

        URL.revokeObjectURL(url);
        window.alert("Browser ga bisa share, cek hasil dalam histori download")
        }

    }, "image/png")
}

export function init() {
    if (localStorage.getItem("classSelect") !== null) {
        const text = document.querySelector(".multiselect-selector-name");

        switch (Number(localStorage.getItem("classSelect"))) {
            case 0:
                text.textContent = "X-1";
                break;
            case 1:
                text.textContent = "X-2";
                break;
            case 2:
                text.textContent = "X-3";
                break;
            case 3:
                text.textContent = "X-4";
                break;
            case 4:
                text.textContent = "X-5";
                break;
            case 5:
                text.textContent = "X-6";
                break;
            default:
                break;
        }
    } else {
        localStorage.setItem("classSelect", 0);
    }

    document.querySelector(".multiselect-selector").addEventListener("click", () => {
        document.querySelector(".multiselect-container").classList.toggle("open");
    });

    document.querySelectorAll(".multiselect-options-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelector(".multiselect-selector-name").textContent = option.textContent;
            localStorage.setItem("classSelect", option.dataset.value);
            document.querySelector(".multiselect-container").classList.remove("open");
        });
    });

    document.querySelector('.seat-input-button').addEventListener("click", () => {
        writeSeat(true);
    });

    try {
        writeSeat(false);
    } catch {
    }

    if (typeof globalSeat !== "undefined") document.querySelector(".seat-input-downloadnshare-button").disabled = false;
    else document.querySelector(".seat-input-downloadnshare-button").disabled = true;

    document.querySelector(".seat-input-downloadnshare-button").addEventListener("click", () => {
        downloadSeat();
    });
}