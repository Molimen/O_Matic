import { getStudentsData, getBlacklistedData } from "../modules/person.js";
import '../modules/pickr/pickr.min.js';
import '../modules/snapdom/snapdom.min.js';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function hexToBrightness(hex) {
    // remove #
    hex = hex.replace('#', '');

    // handle shorthand (#abc → #aabbcc)
    if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
    }

    // parse RGB
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // gamma correction (this is the important part you skipped earlier)
    const toLinear = (v) =>
    v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);

    r = toLinear(r);
    g = toLinear(g);
    b = toLinear(b);

    // luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// START of 5-3 separator functions ---------------------------------------------

function findFlatIndex(seatOrder, absen) {
    for (let i = 0; i < seatOrder.length; i++) {
      for (let j = 0; j < seatOrder[i].length; j++) {
        if (seatOrder[i][j][0] === absen) return i * 2 + j;
      }
    }
    return -1;
}
  
function getPos(flatIndex) {
    return {
        col: Math.floor(flatIndex / 8) * 2 + (flatIndex % 2),
        row: Math.floor((flatIndex % 8) / 2)
    };
}
  
function manhattan(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}
  
function ensureFar(seatOrder, absenA, absenB, minDist = 3) {
    const idxA = findFlatIndex(seatOrder, absenA);
    const idxB = findFlatIndex(seatOrder, absenB);

    if (manhattan(getPos(idxA), getPos(idxB)) >= minDist) return;

    const genderB = seatOrder[Math.floor(idxB / 2)][idxB % 2][1];

    for (let i = 0; i < seatOrder.length * 2; i++) {
        if (i === idxA || i === idxB) continue;

        const candidate = seatOrder[Math.floor(i / 2)][i % 2];

        if (candidate[1] !== genderB) continue; 
        if (manhattan(getPos(idxA), getPos(i)) < minDist) continue;

        const bi = Math.floor(idxB / 2), bj = idxB % 2;
        const ci = Math.floor(i / 2), cj = i % 2;

        [seatOrder[bi][bj], seatOrder[ci][cj]] = [seatOrder[ci][cj], seatOrder[bi][bj]];
        return;
    }
}
  
// END of 5-3 separator functions-----------------------------------------------

function seatsMessageInfo(message, type = 'info') {
    document.querySelector('.message-item').textContent = message;
    if (type === 'error') {
        document.querySelector('.message-item').classList.remove('text-neon-green');
        document.querySelector('.message-item').classList.add('text-error');
    } else {
        document.querySelector('.message-item').classList.remove('text-error');
        document.querySelector('.message-item').classList.add('text-neon-green');
    }
}

function resetSeatsDisplay() {
    document.querySelector('.indicator-modified').style.display = 'none';

    if (document.querySelector('.class-select').value !== '6') {
        document.querySelector('.seat-result-info').style.display = 'none';
    } else {
        document.querySelector('.seat-result-info').style.display = 'inline';
    }

    document.querySelectorAll('.seat-item-L').forEach(el => {
        el.textContent = '??';
    });
    document.querySelectorAll('.seat-item-P').forEach(el => {
        el.textContent = '??';
    });
}

function showSeatDisplay(seatOrder, classSelected) {
    document.querySelector(".extra-student").style.display = classSelected === "2" ? "flex" : "none";

    const girlsColor = localStorage.getItem('girlsColor');
    const boysColor = localStorage.getItem('boysColor');
    let counter = 0;
    for (const el of document.querySelectorAll('.seat-item-L')) {
        if (counter < 16) {
            el.textContent = seatOrder[counter][0][0];
            if (seatOrder[counter][0][1] === 'L') {
                el.style.backgroundColor = boysColor;
                el.style.color = hexToBrightness(boysColor) > 0.179 ? 'black' : 'white';
            } else if (seatOrder[counter][0][1] === 'P') {
                el.style.backgroundColor = girlsColor;
                el.style.color = hexToBrightness(girlsColor) > 0.179 ? 'black' : 'white';
            } 
            
            counter++;
        } else {
            if (classSelected === "2") {
                el.textContent = seatOrder[counter][0][0];
            } else {
                el.textContent = "XX"
            }          
        }
    };

    counter = 0;
    for (const el of document.querySelectorAll('.seat-item-P')) {
        if (counter < 16) {
            el.textContent = seatOrder[counter][1][0];
            if (seatOrder[counter][1][1] === 'L') {
                el.style.backgroundColor = boysColor;
                el.style.color = hexToBrightness(boysColor) > 0.179 ? 'black' : 'white';
            } else if (seatOrder[counter][1][1] === 'P') {
                el.style.backgroundColor = girlsColor;
                el.style.color = hexToBrightness(girlsColor) > 0.179 ? 'black' : 'white';
            } 
            
            counter++;
        } else {
            el.textContent = "XX";
        }
    };
}

let seatsImage;

async function generateSeatsImage() {
    await new Promise(resolve => requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
    ));

    const result = await snapdom(document.querySelector('.seat-result-container'), { scale:2, embedFonts: true, backgroundColor: '#000000' });
    const canvas = await result.toCanvas();
    
    const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    seatsImage = new File([pngBlob], 'seats-image.png', {type: 'image/png'});
}

let blacklistedPartner = await getBlacklistedData();

// coming soon!
let favoritePartner = {
    // 1: [],
    // 2: [],
    // 3: [],
    // 4: [],
    // 5: [],
    // 6: [],
    // 7: [],
    // 8: [],
    // 9: [],
    // 10: [],
    // 11: [],
    // 12: [],
    // 13: [],
    // 14: [],
    // 15: [],
    // 16: [],
    // 17: [],
    // 18: [],
    // 19: [],
    // 20: [],
    // 21: [],
    // 22: [],
    // 23: [],
    // 24: [],
    // 25: [],
    // 26: [],
    // 27: [],
    // 28: [],
    // 29: [],
    // 30: [],
    // 31: [],
    // 32: []
}

let resumeSeat;
let resumeIndicator = 'none';

async function generateSeats() {
    const classSelected = document.querySelector('.class-select').value;

    let seatOrder = []; 

    let students = structuredClone(await getStudentsData(classSelected));

    let studentsGirls = [];
    let studentsBoys = [];

    for (let student of students) {
        if (student[1] === 'P') studentsGirls.push(student);
        else if (student[1] === 'L') studentsBoys.push(student);
    }

    studentsGirls = shuffle(studentsGirls);
    studentsBoys = shuffle(studentsBoys);

    let biasTowards = 'none';
    if (studentsGirls.length > studentsBoys.length) biasTowards = 'P';
    else if (studentsBoys.length > studentsGirls.length) biasTowards = 'L';

    while (true) {
        if (studentsGirls.length === 0 || studentsBoys.length === 0) {
            while (true) {
                if (studentsGirls.length === 1) {
                    seatOrder.push(['??', studentsGirls.pop()]);
                    break;
                } else if (studentsBoys.length === 1) {
                    seatOrder.push([studentsBoys.pop(), '??']);
                    break;
                }

                if (studentsGirls.length > 1) {
                    seatOrder.push([studentsGirls.pop(), studentsGirls.pop()]);
                } 
                if (studentsBoys.length > 1) {
                    seatOrder.push([studentsBoys.pop(), studentsBoys.pop()]);
                }

                if (studentsGirls.length === 0 && studentsBoys.length === 0) {
                    seatOrder.splice(Math.floor(Math.random() * seatOrder.length), 0, seatOrder.pop());
                    break;
                }
            }
            break;
        }

        seatOrder.push([studentsBoys.pop(), studentsGirls.pop()]);
    }

    // this only and only FOR x6, because x6 is the only class that has a lot of students that hate each other :>
    // and i too lazy to make this work for other class, so yeah, this is only for x6 <3
    let isThereAnyChange = false;
    if (classSelected === "5") {
        ensureFar(seatOrder, 3, 5);
    } else if (classSelected === '6') {
        for (let seat of seatOrder) {
            if (blacklistedPartner[seat[0][0]] !== undefined && blacklistedPartner[seat[0][0]] .includes(seat[1][0])) {
                for (let swap of seatOrder) {
                    if (!blacklistedPartner[seat[0][0]].includes(swap[1][0])) {
                        const temp = seat[1];

                        seatOrder[seatOrder.indexOf(seat)][1] = swap[1];
                        seatOrder[seatOrder.indexOf(swap)][1] = temp;

                        isThereAnyChange = true;
                        break;
                    }
                }
            }

            if (blacklistedPartner[seat[1][0]] !== undefined && blacklistedPartner[seat[1][0]].includes(seat[0][0])) {
                for (let swap of seatOrder) {
                    if (!blacklistedPartner[seat[1][0]].includes(swap[0][0])) {
                        const temp = seat[0];

                        seatOrder[seatOrder.indexOf(seat)][0] = swap[0];
                        seatOrder[seatOrder.indexOf(swap)][0] = temp;

                        isThereAnyChange = true;
                        break;
                    }
                }
            }
        }
    }

    resumeSeat = structuredClone(seatOrder);

    resetSeatsDisplay();

    if (isThereAnyChange) {
        document.querySelector('.indicator-modified').style.display = 'inline';
        resumeIndicator = 'inline';
    } else {
        resumeIndicator = 'none';
    }

    showSeatDisplay(seatOrder, classSelected);

    generateSeatsImage();

    seatsMessageInfo('Seats generated successfully!');

    // console.log('studentsGirls: ', studentsGirls);
    // console.log('studentsBoys: ', studentsBoys);
    // console.log('biasTowards: ', biasTowards);
    // console.log('seatOrder: ', seatOrder);
}

async function downloadSeats() {
    if (typeof seatsImage === 'undefined') {
        return;
    }

    if (navigator.share && navigator.canShare?.({files: [seatsImage]})) {
        await navigator.share({
            files: [seatsImage],
            title: 'seat-chart baru'
        });
        seatsMessageInfo('The groups has been shared!');
    } else {
        const url = URL.createObjectURL(seatsImage);

        const a = document.createElement('a');
        a.href = url;
        a.download = seatsImage.name;
        a.click();

        URL.revokeObjectURL(url);

        seatsMessageInfo('The groups has been shared trough download!');
    }
}

function initInput() {
    if (localStorage.getItem('classSelected') !== null) {
        document.querySelector('.class-select').value = localStorage.getItem('classSelected');
        resetSeatsDisplay();
    };
}

function initDetectInput() {
    document.querySelector('.class-select').addEventListener('change', (e) => {
        localStorage.setItem('classSelected', e.target.value);
        localStorage.setItem('prevClassSelected', e.target.value);
    });

    document.querySelector('.process-button').addEventListener('click', () => {
        generateSeats();
    });

    document.querySelector('.download-button').addEventListener('click', () => {
        downloadSeats();
    });
}

function updateSeatsColor(gender, color) {
    let textColor = hexToBrightness(color) > 0.179 ? 'black' : 'white';
    if (gender === 0) {
        document.querySelectorAll('.seat-item-P').forEach(el => {
            el.style.backgroundColor = color;
            el.style.color = textColor;
        });
    } else if (gender === 1) {
        document.querySelectorAll('.seat-item-L').forEach(el => {
            el.style.backgroundColor = color;
            el.style.color = textColor;
        });
    }

    document.querySelectorAll('.seat-result-color-type').forEach((el, idx) => {
        if (idx === gender) {
            el.style.backgroundColor = color;
        }
    });

     document.querySelectorAll(".color-input-label").forEach((el, idx) => {
        el.style.backgroundColor = localStorage.getItem(idx === 0 ? 'girlsColor' : 'boysColor');
     });
}

function initColorPicker() {
    if (localStorage.getItem('girlsColor') === null) {
        localStorage.setItem('girlsColor', '#FFFA9F');
    }

    if (localStorage.getItem('boysColor') === null) {
        localStorage.setItem('boysColor', '#9FFFA5');
    }

    document.querySelectorAll('.color-input').forEach((el, idx) => {
        document.querySelectorAll(".color-input-label")[idx].style.backgroundColor = localStorage.getItem(idx === 0 ? 'girlsColor' : 'boysColor');

        const pickr = Pickr.create({
            el: el, 
            theme: 'nano',
            default: localStorage.getItem(idx === 0 ? 'girlsColor' : 'boysColor'),

            swatches: [
                '#FFFA9F',
                '#9FFFA5',
                '#FF48C4',
                '#2196F3',
                '#FDA4AF',
                '#84A98C',
                '#F59E0B',
                '#733BD9'
            ],

            components: {
                preview: true,
                hue: true,
                interaction: {
                    hex: true,
                    input: true,
                    clear: true,
                    save: true,
                }
            }
        });

        pickr.on('save', (color, instance) => {
            const hexColor = color.toHEXA().toString();
            localStorage.setItem(idx === 0 ? 'girlsColor' : 'boysColor', hexColor);
            updateSeatsColor(idx, hexColor);
            pickr.hide();
        });
    });

    if (localStorage.getItem('girlsColor') !== null) {
        updateSeatsColor(0, localStorage.getItem('girlsColor'));
    }

    if (localStorage.getItem('boysColor') !== null) {
        updateSeatsColor(1, localStorage.getItem('boysColor'));
    }
}

export function init() {
    if ( localStorage.getItem("prevClassSelected") === null ) {
        localStorage.setItem("prevClassSelected", document.querySelector('.class-select').value);
    };

    initInput();
    initDetectInput();
    initColorPicker();
    
    if (typeof resumeSeat !== 'undefined') {
        showSeatDisplay(resumeSeat, localStorage.getItem("prevClassSelected"));
        seatsMessageInfo('showing last seats result!');
    }

    document.querySelector('.indicator-modified').style.display = resumeIndicator;
}