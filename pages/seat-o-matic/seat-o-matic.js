import { returnPerson } from '../modules/person.js';

function getLuminanceFromColor(color) {

    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
    if (!hexRegex.test(color)) { //handle rgb

      const values = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
      
      const parts = values.split(',');

      const red = parts[0].trim();
      const green = parts[1].trim();
      const blue = parts[2].trim();
      
      console.log(`R: ${red}, G: ${green}, B: ${blue}`);
      return 0.2126 * Number(red) + 0.7152 * Number(green) + 0.0722 * Number(blue); 
      
    } else {
        let cleanHex = color.replace('#', '');
        if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(char => char + char).join(''); 
        }
    
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
    

        const [rs, gs, bs] = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs; //outputnya antara 0 (ireng) sampe 1 (very putih)
        // warna terang : warna > 0.179
        // warna gelap : warna <= 0.179
    }
  
    
  }
  
function shuffleSeat(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    }

    return copy;
}

function resetSeat() {
    if (localStorage.getItem('seatClassSelect') !== '5') {
        document.querySelector('.seat-result-info').style.display = 'none';
    } else {
        document.querySelector('.seat-result-info').style.display = 'inline';
    };
    document.querySelectorAll('.seat-item-L').forEach(el => {
        el.textContent = '??';
        el.style.backgroundColor = localStorage.getItem("boy_color") === null ? "#9FFFA5" : localStorage.getItem("boy_color");
        el.style.color = getLuminanceFromColor(localStorage.getItem("boy_color") === null ? "#9FFFA5" : localStorage.getItem("boy_color")) > 0.179 ? "#000000" : "#ffffff";
    });
    document.querySelectorAll('.seat-item-P').forEach(el => {
        el.textContent = '??';
        el.style.backgroundColor = localStorage.getItem("girl_color") === null ? "#FFFA9F" : localStorage.getItem("girl_color");
        el.style.color = getLuminanceFromColor(localStorage.getItem("girl_color") === null ? "#FFFA9F" : localStorage.getItem("girl_color")) > 0.179 ? "#000000" : "#ffffff";
    });
}

// return 0 if boy else if girl 1
function getGender(absent) {
    let person = returnPerson()[Number(localStorage.getItem("seatClassSelect"))];
    
    return person[absent-1][1] === "L" ? 0 : 1;
}

let RSeat1;
let RSeat2;
// yes it's is possibe to have both gender on the same seat, but that shit is too obvious
// we should probably disable this someday
const RSeatItemCONST = [[1,17],[1,26],[21,13],[32,18],[32,17],[32,13],[21,18],[21,17],[1,18]]; // please add more... (no)
let RSeatChangeHappen = 25; //definitely should be low chance, cuz imagine if we got rigged seat like 5 times in a row
let RseatUpTo = 3;
let globalSeat;
function writeSeat(isWrite) {
    resetSeat();
    let seatOrder = [];

    if (isWrite) {
        let person = structuredClone(returnPerson()[Number(localStorage.getItem("seatClassSelect"))]);
        let man = [];
        let woman = [];

        for (let i = 0; i < person.length; i++) {
            if (person[i][1] === "L") man.push(person[i]);
            else if (person[i][1] === "P") woman.push(person[i]);
        }

        let manRandom = shuffleSeat(man);
        let womanRandom = shuffleSeat(woman);
        let checkBalanced;
        if (manRandom.length === womanRandom.length) checkBalanced = 0;
        else if (manRandom.length > womanRandom.length) checkBalanced = 1;
        else if (manRandom.length < womanRandom.length) checkBalanced = 2;

        while (true) {
            if (manRandom.length === 0 || womanRandom.length === 0) {
                if (checkBalanced > 0) {
                    if (checkBalanced === 1) {
                        seatOrder.push([manRandom.pop()[0],manRandom.pop()[0]]);
                    } else if (checkBalanced === 2) {
                        seatOrder.push([womanRandom.pop()[0],womanRandom.pop()[0]]);
                    }

                    checkBalanced = 0;
                }

                break;
            }

            if (Math.floor(Math.random()*101) > 85 && checkBalanced > 0) {
                if (checkBalanced === 1) {
                    seatOrder.push([manRandom.pop()[0],manRandom.pop()[0]]);
                } else if (checkBalanced === 2) {
                    seatOrder.push([womanRandom.pop()[0],womanRandom.pop()[0]]);
                }
                if (manRandom.length === womanRandom.length) {
                    checkBalanced = 0;
                }
            } else {
                seatOrder.push([manRandom.pop()[0],womanRandom.pop()[0]]);
            }
        }

        if (!(Math.floor(Math.random()*101) > RSeatChangeHappen)) {
            if (localStorage.getItem("seatClassSelect") === "5") {
                console.log("RIGGED MODE ON!");
                let RSeatItem = [];
                let RSeatItemIndexDone = [];
                let RSeatItemAbsentDone = [];
                let hitung = 0;

                for (let i = 0; i < RseatUpTo; i++) {
                    if (hitung > 10000) {
                        console.warn("there is duplicate absent and the data doesn't offer any to replace the data!");
                        break;
                    }
                    hitung++;
                    const randomIndex = Math.floor(Math.random() * (RSeatItemCONST.length));

                    if (RSeatItemIndexDone.includes(randomIndex) || (RSeatItemAbsentDone.includes(RSeatItemCONST[randomIndex][0]) || RSeatItemAbsentDone.includes(RSeatItemCONST[randomIndex][1]))) {
                        i--;
                        continue;
                    }
                    RSeatItemAbsentDone.push(RSeatItemCONST[randomIndex][0]);
                    RSeatItemAbsentDone.push(RSeatItemCONST[randomIndex][1]);
                    RSeatItemIndexDone.push(randomIndex);

                    RSeatItem.push(RSeatItemCONST[randomIndex]);
                }

                for (let i = 0; i < RSeatItem.length; i++) {
                    for (let j = 0; j < seatOrder.length; j++) {
                        if (seatOrder[j][getGender(RSeatItem[i][0])] === RSeatItem[i][0]) {
                            RSeat1 = j;
                            break
                        }
                    }

                    for (let j = 0; j < seatOrder.length; j++) {
                        if (seatOrder[j][getGender(RSeatItem[i][1])] === RSeatItem[i][1]) {
                            RSeat2 = j;
                            break
                        }
                    }

                    let temp = seatOrder[RSeat2][getGender(RSeatItem[i][1])^1];
                    seatOrder[RSeat2][getGender(RSeatItem[i][1])^1] = seatOrder[RSeat1][getGender(RSeatItem[i][0])];
                    seatOrder[RSeat1][getGender(RSeatItem[i][0])] = temp;
                }
            }
        }

        globalSeat = structuredClone(seatOrder);
        document.querySelector(".seat-input-downloadnshare-button").disabled = false;
        document.querySelector('.color-input-widget').classList.remove('disabled');
    } else if (!isWrite) {
        seatOrder = structuredClone(globalSeat);
    }

    let counter = 0;
    document.querySelectorAll('.seat-item-L').forEach(el => {
        if (counter < 16) {
            el.textContent = seatOrder[counter][0];
            if (getGender(seatOrder[counter][0]) === 0) {
                el.style.backgroundColor = localStorage.getItem("boy_color");
                el.style.color = getLuminanceFromColor(localStorage.getItem("boy_color")) > 0.179 ? "#000000" : "#ffffff";
            } else if (getGender(seatOrder[counter][0]) === 1) {
                el.style.backgroundColor = localStorage.getItem("girl_color");
                el.style.color = getLuminanceFromColor(localStorage.getItem("girl_color")) > 0.179 ? "#000000" : "#ffffff";
            } 
            
            counter++;
        } else {
            el.textContent = "XX";
        }
    });

    counter = 0;
    document.querySelectorAll('.seat-item-P').forEach(el => {
        if (counter < 16) {
            el.textContent = seatOrder[counter][1];
            if (getGender(seatOrder[counter][1]) === 0) {
                el.style.backgroundColor = localStorage.getItem("boy_color");
                el.style.color = getLuminanceFromColor(localStorage.getItem("boy_color")) > 0.179 ? "#000000" : "#ffffff";
            } else if (getGender(seatOrder[counter][1]) === 1) {
                el.style.backgroundColor = localStorage.getItem("girl_color");
                el.style.color = getLuminanceFromColor(localStorage.getItem("girl_color")) > 0.179 ? "#000000" : "#ffffff";
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

    const module = await import("../modules/html2canvas.esm.js");
    const html2canvas = module.default;

    const element_target = document.querySelector('.seat-result-container');
    const canvas = await html2canvas(element_target,{scale : 1.5});

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
    if (localStorage.getItem("seatClassSelect") !== null) {
        const text = document.querySelector(".multiselect-selector-name");

        switch (Number(localStorage.getItem("seatClassSelect"))) {
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
        localStorage.setItem("seatClassSelect", 0);
    }

    document.querySelector(".multiselect-selector").addEventListener("click", () => {
        document.querySelector(".multiselect-container").classList.toggle("open");
    });

    document.querySelectorAll(".multiselect-options-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelector(".multiselect-selector-name").textContent = option.textContent;
            localStorage.setItem("seatClassSelect", option.dataset.value);
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

    if (typeof globalSeat !== "undefined") {
        document.querySelector(".seat-input-downloadnshare-button").disabled = false;
        document.querySelector('.color-input-widget').classList.remove('disabled');
    } else {
        document.querySelector(".seat-input-downloadnshare-button").disabled = true;
        document.querySelector('.color-input-widget').classList.add('disabled');
    }
     

    document.querySelector(".seat-input-downloadnshare-button").addEventListener("click", () => {
        downloadSeat();
    });

    // color thing (start) ------------------------------------------------------------------------------------------
    let color_input = document.querySelectorAll(".true-color-input");
    let color_gui = document.querySelectorAll(".color-input");
    let color_hint = document.querySelectorAll(".seat-result-color-type");

        //bikin value warna yang persisten, sekaligus fallback default
    if (localStorage.getItem("boy_color") === null || localStorage.getItem("girl_color") === null) {
        localStorage.setItem("boy_color", "#9FFFA5");
        localStorage.setItem("girl_color", "#FFFA9F");
    };

        // nyetel value awal
    color_input[0].value = localStorage.getItem("boy_color");
    color_input[1].value = localStorage.getItem("girl_color");

        // biar warna ui ga ke reset?
        color_hint[1].style.backgroundColor = localStorage.getItem("boy_color");
        color_hint[0].style.backgroundColor = localStorage.getItem("girl_color");
        color_gui[0].style.backgroundColor = localStorage.getItem("boy_color");
        color_gui[1].style.backgroundColor = localStorage.getItem("girl_color")

    color_input.forEach((element,index) => {
        const pickr = Pickr.create({
            el: element,
            theme: 'monolith',
            default: index === 0 ? localStorage.getItem("boy_color") : localStorage.getItem("girl_color"),
    
            swatches: [
                '#9FFFA5',
                '#FFFA9F',
                '#2196F3',
                '#FF48C4',
                '#84A98C',
                '#FDA4AF',
                '#733BD9',
                '#F59E0B'
            ],
    
            components: {
    
                // Main components
                preview: true,
                opacity: true,
                hue: true,
    
                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    hsva: true,
                    cmyk: true,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        });
        pickr.on('init', instance => {
            console.log('Event: "init"', instance);
        }).on('hide', instance => {
            console.log('Event: "hide"', instance);
        }).on('show', (color, instance) => {
            console.log('Event: "show"', color, instance);
        }).on('save', (color, instance) => { //THE USED THING, also the instance variable isnt used 
            const hex = color.toHEXA().toString();
            if (index === 0) {
                localStorage.setItem("boy_color", hex);
                
                color_hint[index+1].style.backgroundColor = localStorage.getItem("boy_color");
                
                document.querySelectorAll(".seat-placement-actual-seat").forEach((seat) => {
                    if (getGender(Number(seat.textContent)) === 0) {
                        seat.style.backgroundColor = localStorage.getItem("boy_color");
                        seat.style.color = getLuminanceFromColor(localStorage.getItem("boy_color")) > 0.179 ? "#000000" : "#ffffff";
                    } else {
                        seat.style.backgroundColor = localStorage.getItem("girl_color");
                        seat.style.color = getLuminanceFromColor(localStorage.getItem("girl_color")) > 0.179 ? "#000000" : "#ffffff";
                    }

                    
                });
            } else if (index === 1) {
                localStorage.setItem("girl_color", hex);
                
                color_hint[index-1].style.backgroundColor = localStorage.getItem("girl_color");

                document.querySelectorAll(".seat-placement-actual-seat").forEach((seat) => {
                    if (getGender(Number(seat.textContent)) === 1) {
                        seat.style.backgroundColor = localStorage.getItem("girl_color");
                        seat.style.color = getLuminanceFromColor(localStorage.getItem("girl_color")) > 0.179 ? "#000000" : "#ffffff";
                    } else {
                        seat.style.backgroundColor = localStorage.getItem("boy_color");
                        seat.style.color = getLuminanceFromColor(localStorage.getItem("boy_color")) > 0.179 ? "#000000" : "#ffffff";
                    }
                    
                });
            }

            color_gui[index].style.backgroundColor = hex;

            pickr.hide();
        }).on('clear', instance => {
            console.log('Event: "clear"', instance);
        }).on('change', (color, source, instance) => {
            console.log('Event: "change"', color, source, instance);
        }).on('changestop', (source, instance) => {
            console.log('Event: "changestop"', source, instance);
        }).on('cancel', instance => {
            console.log('Event: "cancel"', instance);
        }).on('swatchselect', (color, instance) => {
            console.log('Event: "swatchselect"', color, instance);
        });

    });
    // color thing (end) --------------------------------------------------------------------------------------------
}
