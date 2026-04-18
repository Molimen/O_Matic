import { getStudentsData } from "../modules/person.js";

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

function showSeatDisplay(seatOrder) {
    const girlsColor = localStorage.getItem('girlsColor');
    const boysColor = localStorage.getItem('boysColor');
    let counter = 0;
    for (const el of document.querySelectorAll('.seat-item-L')) {
        if (counter < 16) {
            el.textContent = seatOrder[counter][0][0];
            if (seatOrder[counter][0][1] === 'L') {
                el.style.backgroundColor = boysColor;
            } else if (seatOrder[counter][0][1] === 'P') {
                el.style.backgroundColor = girlsColor;
            } 
            
            counter++;
        } else {
            el.textContent = "XX";
        }
    };

    counter = 0;
    for (const el of document.querySelectorAll('.seat-item-P')) {
        if (counter < 16) {
            el.textContent = seatOrder[counter][1][0];
            if (seatOrder[counter][1][1] === 'L') {
                el.style.backgroundColor = boysColor;
            } else if (seatOrder[counter][1][1] === 'P') {
                el.style.backgroundColor = girlsColor;
            } 
            
            counter++;
        } else {
            el.textContent = "XX";
        }
    };
}

// EY CEPLOX21, DONT FORGET ADD THIS INTO YO DATABASE, THANKS :>
// original name 'listStudentsThatStudentHateSittingRightBesideOnX6' is too long, so i change it to 'blacklistedPartner' :>
let blacklistedPartner = {  
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
    13: [3, 5, 6, 7, 9, 10, 15, 20, 23, 28, 29],
    // 14: [],
    // 15: [],
    // 16: [],
    // 17: [],
    18: [3, 5, 6, 7, 9, 10, 15, 20, 23, 28, 29],
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
    30: [3, 5, 7, 9, 10, 15, 20, 23, 28, 29],
    // 31: [],
    // 32: []
};

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
    if (classSelected === '6') {
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

    showSeatDisplay(seatOrder);

    // console.log('studentsGirls: ', studentsGirls);
    // console.log('studentsBoys: ', studentsBoys);
    // console.log('biasTowards: ', biasTowards);
    // console.log('seatOrder: ', seatOrder);
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
    });

    document.querySelector('.process-button').addEventListener('click', () => {
        generateSeats();
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
}

function initColorPicker() {
    if (localStorage.getItem('girlsColor') === null) {
        localStorage.setItem('girlsColor', '#FFFA9F');
    }

    if (localStorage.getItem('boysColor') === null) {
        localStorage.setItem('boysColor', '#9FFFA5');
    }

    document.querySelectorAll('.color-input').forEach((el, idx) => {
        const pickr = Pickr.create({
            el: el, 
            theme: 'nano',
            default: localStorage.getItem(idx === 0 ? 'girlsColor' : 'boysColor'),

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
    initInput();
    initDetectInput();
    initColorPicker();
    
    if (typeof resumeSeat !== 'undefined') {
        showSeatDisplay(resumeSeat);
    }

    document.querySelector('.indicator-modified').style.display = resumeIndicator;
}