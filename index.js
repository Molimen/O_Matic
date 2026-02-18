/*
TO-DO:
- added more footer info
*/

const PERSON = [
    //# kelas x-1
    [[1, 'L', 0.0], 
     [2, 'L', 0.0], 
     [3, 'L', 0.0], 
     [4, 'P', 0.0], 
     [5, 'P', 0.0], 
     [6, 'L', 0.0], 
     [7, 'P', 0.0], 
     [8, 'P', 0.0], 
     [9, 'L', 0.0], 
     [10, 'L', 0.0], 
     [11, 'L', 0.0], 
     [12, 'P', 0.0], 
     [13, 'L', 0.0], 
     [14, 'L', 0.0], 
     [15, 'P', 0.0], 
     [16, 'P', 0.0], 
     [17, 'P', 0.0], 
     [18, 'L', 0.0], 
     [19, 'P', 0.0], 
     [20, 'L', 0.0], 
     [21, 'L', 0.0], 
     [22, 'L', 0.0], 
     [23, 'P', 0.0], 
     [24, 'P', 0.0], 
     [25, 'L', 0.0], 
     [26, 'P', 0.0], 
     [27, 'L', 0.0], 
     [28, 'L', 0.0], 
     [29, 'P', 0.0], 
     [30, 'P', 0.0], 
     [31, 'P', 0.0], 
     [32, 'L', 0.0]], 
    // kelas x-2
    [[1, 'L', 0.0], 
     [2, 'P', 0.0], 
     [3, 'P', 0.0], 
     [4, 'L', 0.0], 
     [5, 'L', 0.0], 
     [6, 'P', 0.0], 
     [7, 'L', 0.0], 
     [8, 'P', 0.0], 
     [9, 'P', 0.0], 
     [10, 'P', 0.0], 
     [11, 'P', 0.0], 
     [12, 'P', 0.0], 
     [13, 'P', 0.0], 
     [14, 'P', 0.0], 
     [15, 'L', 0.0], 
     [16, 'P', 0.0], 
     [17, 'L', 0.0], 
     [18, 'L', 0.0], 
     [19, 'L', 0.0], 
     [20, 'L', 0.0], 
     [21, 'L', 0.0], 
     [22, 'P', 0.0], 
     [23, 'L', 0.0], 
     [24, 'P', 0.0], 
     [25, 'L', 0.0], 
     [26, 'L', 0.0], 
     [27, 'P', 0.0], 
     [28, 'L', 0.0], 
     [29, 'P', 0.0], 
     [30, 'L', 0.0], 
     [31, 'L', 0.0], 
     [32, 'L', 0.0]], 
    // kelas x-3
    [[1, 'L', 0.0], 
     [2, 'L', 0.0], 
     [3, 'L', 0.0], 
     [4, 'L', 0.0], 
     [5, 'L', 0.0], 
     [6, 'L', 0.0], 
     [7, 'L', 0.0], 
     [8, 'P', 0.0], 
     [9, 'P', 0.0], 
     [10, 'P', 0.0], 
     [11, 'P', 0.0], 
     [12, 'L', 0.0], 
     [13, 'L', 0.0], 
     [14, 'P', 0.0], 
     [15, 'L', 0.0], 
     [16, 'L', 0.0], 
     [17, 'P', 0.0], 
     [18, 'L', 0.0], 
     [19, 'L', 0.0], 
     [20, 'L', 0.0], 
     [21, 'P', 0.0], 
     [22, 'P', 0.0], 
     [23, 'L', 0.0], 
     [24, 'P', 0.0], 
     [25, 'P', 0.0], 
     [26, 'P', 0.0], 
     [27, 'L', 0.0], 
     [28, 'P', 0.0], 
     [29, 'P', 0.0], 
     [30, 'P', 0.0], 
     [31, 'L', 0.0], 
     [32, 'P', 0.0]], 
    // kelas x-4
    [[1, 'L', 0.0], 
     [2, 'P', 0.0], 
     [3, 'L', 0.0], 
     [4, 'P', 0.0], 
     [5, 'P', 0.0], 
     [6, 'L', 0.0], 
     [7, 'L', 0.0], 
     [8, 'L', 0.0], 
     [9, 'P', 0.0], 
     [10, 'L', 0.0], 
     [11, 'L', 0.0], 
     [12, 'P', 0.0], 
     [13, 'P', 0.0], 
     [14, 'P', 0.0], 
     [15, 'P', 0.0], 
     [16, 'P', 0.0], 
     [17, 'L', 0.0], 
     [18, 'P', 0.0], 
     [19, 'P', 0.0], 
     [20, 'L', 0.0], 
     [21, 'L', 0.0], 
     [22, 'L', 0.0], 
     [23, 'L', 0.0], 
     [24, 'P', 0.0], 
     [25, 'L', 0.0], 
     [26, 'L', 0.0], 
     [27, 'L', 0.0], 
     [28, 'L', 0.0], 
     [29, 'P', 0.0], 
     [30, 'P', 0.0], 
     [31, 'L', 0.0], 
     [32, 'P', 0.0]], 
    // kelas x-5
    [[1, 'P', 0.0], 
     [2, 'L', 0.0], 
     [3, 'L', 0.0], 
     [4, 'P', 0.0], 
     [5, 'P', 0.0], 
     [6, 'P', 0.0], 
     [7, 'L', 0.0], 
     [8, 'P', 0.0], 
     [9, 'L', 0.0], 
     [10, 'P', 0.0], 
     [11, 'L', 0.0], 
     [12, 'P', 0.0], 
     [13, 'L', 0.0], 
     [14, 'P', 0.0], 
     [15, 'P', 0.0], 
     [16, 'L', 0.0], 
     [17, 'L', 0.0], 
     [18, 'L', 0.0], 
     [19, 'P', 0.0], 
     [20, 'L', 0.0], 
     [21, 'L', 0.0], 
     [22, 'L', 0.0], 
     [23, 'L', 0.0], 
     [24, 'L', 0.0], 
     [25, 'P', 0.0], 
     [26, 'L', 0.0], 
     [27, 'L', 0.0], 
     [28, 'P', 0.0], 
     [29, 'P', 0.0], 
     [30, 'P', 0.0], 
     [31, 'L', 0.0], 
     [32, 'P', 0.0]], 
    // kelas x-6
    [[1, 'P', 0.0], 
     [2, 'P', 0.0], 
     [3, 'L', 0.0], 
     [4, 'L', 0.0], 
     [5, 'L', 0.0], 
     [6, 'P', 0.0], 
     [7, 'L', 0.0], 
     [8, 'L', 0.0], 
     [9, 'L', 0.0], 
     [10, 'P', 0.0], 
     [11, 'P', 0.0], 
     [12, 'L', 0.0], 
     [13, 'L', 0.0], 
     [14, 'L', 0.0], 
     [15, 'P', 0.0], 
     [16, 'P', 0.0], 
     [17, 'L', 0.0], 
     [18, 'L', 0.0], 
     [19, 'P', 0.0], 
     [20, 'P', 0.0], 
     [21, 'P', 0.0], 
     [22, 'P', 0.0], 
     [23, 'L', 0.0], 
     [24, 'L', 0.0], 
     [25, 'L', 0.0], 
     [26, 'L', 0.0], 
     [27, 'P', 0.0], 
     [28, 'P', 0.0], 
     [29, 'P', 0.0], 
     [30, 'P', 0.0], 
     [31, 'L', 0.0], 
     [32, 'P', 0.0]]];



function updateNumberSelector(type) {
    const number = document.getElementById("group-number");
    if (type === 0) {
        number.setAttribute("max",10);
        if (number.value > 10) {
            number.value = Math.min(number.value, number.max);
            localStorage.setItem("GroupNumber", Math.min(number.value, number.max));
        }
    } else if (type === 1) {
        number.setAttribute("max",10);
        if (number.value > 10) {
            number.value = Math.min(number.value, number.max);
            localStorage.setItem("GroupNumber", Math.min(number.value, number.max));
        }
    }
}

function checkSmartFinder(type) {
    const button = document.getElementById("toggle");
    const slider = document.getElementById("slider");
    if (type === 6) {
        button.disabled = false;
        slider.style.cursor = "pointer";
        slider.style.filter = "";
    } else {
        slider.style.cursor = "default";
        slider.style.filter = "brightness(.6)";
        button.disabled = true;
        button.checked = false;
    }
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
}

let classSelectOutput = 0;
/*
type 0 = empty type search (groupTypeOutput NaN);
type 1 = too much group inputed (totalGroup > 10);
type 2 = too litte group inputed (totalGroup < 3);
type 3 = too much member inputed (totalMember > 10);
type 4 = too much little inputed (totalMember < 3);
*/
async function errorMessageGroup(type, skip) {
    enableButtonResult()

    if (skip) {
        return;
    }

    const text = document.getElementById("group-error-text");

    await new Promise(resolve => setTimeout(resolve, 180));
    document.getElementById("group-error-container").style.display = "inline";
    setTimeout(() => {
        document.getElementById("group-error-container").style.opacity = "1";
        document.getElementById("group-error-container").style.transform = "scale(1)";
        document.getElementById("group-error-container").style.visibility = "visible";
    }, 10);

    switch (type) {
        case 0:
            text.textContent = 'Please Selected "Type search"!';
            break;
        case 1:
            text.textContent = 'Group exceeding allowed total!';
            break;
        case 2:
            text.textContent = 'Group unexceeding allowed total!';
            break;
        case 3:
            text.textContent = 'Member exceeding allowed total!';
            break;
        case 4:
            text.textContent = 'Member unexceeding allowed total!';
            break;
        default:
            text.textContent = 'Error!';
            break;
    }
}

function enableButtonResult() {
    setTimeout(() => {
        document.getElementById("group-result-button").disabled = false;
    }, 180);
}

let globalGroup = [];
let globalTotalGroup = 0;

// min 3 group!
async function writeGroup(isWrite) {
    document.getElementById("group-result-button").disabled = true;
    document.getElementById("group-error-container").style.opacity = "0";
    document.getElementById("group-error-container").style.transform = "scale(0.9)";
    document.getElementById("group-result-container").style.opacity = "0";
    document.getElementById("group-result-container").style.transform = "scale(0.9)";
    setTimeout(() => {
        document.getElementById("group-result-container").style.display = "none";
        document.getElementById("group-result-container").style.visibility = "collapse";
        document.getElementById("group-error-container").style.display = "none";
        document.getElementById("group-error-container").style.visibility = "collapse";
    }, isWrite == true ? 100 : 0);
    // Input
    let groupTypeOutput = Number(document.querySelector('input[name="group-type"]:checked')?.value);
    let smartCheckerOutput = document.getElementById("toggle").checked;
    let totalGroup = -1;
    let totalMember = -1;

    let groupNumberOutput = (Number(document.getElementById("group-number").value) || 0);

    // Setup + error check
    let group = [];
    let person = structuredClone(PERSON[classSelectOutput]);
    let totalPerson = person.length;

    if (Number.isNaN(groupTypeOutput)) {
        errorMessageGroup(0, !isWrite);
        return;
    }

    if (groupTypeOutput === 0) {
        totalGroup = groupNumberOutput;
        totalMember = -1;
    } else if (groupTypeOutput === 1) {
        totalGroup = -1;
        totalMember = groupNumberOutput;
    }

    if (totalGroup > 10) {
        errorMessageGroup(1, !isWrite);
        return;
    }

    if (totalMember > 10) {
        errorMessageGroup(3, !isWrite);
        return;
    }

    if (totalMember < 3 && totalMember !== -1) {
        errorMessageGroup(4, !isWrite);
        return;
    }

    if ((totalGroup > 0 && totalMember > 0) || (totalGroup < 0 && totalMember < 0)) {
        enableButtonResult()
        throw new Error("Invalid Data!");
    }

    if (totalMember > 0) {
        totalGroup = Math.floor(totalPerson/totalMember);
        totalMember = -1;
    }

    if (totalGroup < 3) {
        errorMessageGroup(2, !isWrite);
        return;
    }

    if ((totalGroup <= 0) || (totalGroup > 10)) {
        enableButtonResult()
        throw new Error("Invalid total Group!");
    }

    globalTotalGroup = totalGroup;

    // Proses
    if (isWrite) {
        let complete = false;

        for (let i = 0; i < totalGroup; i++) {
            let selected = [];
            for (let j = 0; j < Math.floor(totalPerson / totalGroup); j++) {
                const Group = person;

                if (Group.length === 0) {
                    complete = true;
                    break;
                }
                const index = Math.floor(Math.random() * Group.length);

                selected.push(Group[index]);
                Group.splice(index, 1);
            }
            group.push(selected);
            if (complete) break;
        }
        
        totalPerson = person.length;
        let groupIndex = 0;
        let groupIndexDone = [];
        for (let i = 0; i < totalPerson; i++) {
            const Group = person;

            while (true) {
                groupIndex = Math.floor(Math.random() * totalGroup);
                if (!groupIndexDone.includes(groupIndex)) {
                    break;
                }
            }
            const index = Math.floor(Math.random() * Group.length);

            let selected = Group[index];
            person.splice(index, 1);

            group[groupIndex].push(selected);
            groupIndexDone.push(groupIndex);
        }

        const flat = [];
        for (const row of group) {
            for (const item of row) {
                flat.push(item);
            }
        }
        const girl = flat.filter(x => x[1] === 'P');
        const boy = flat.filter(x => x[1] === 'L');


        const newData = [];
        for (let i = 0; i < group.length; i++) {
            let rowSize = group[i].length;
            let numGirlNeeded = Math.round((girl.length / (girl.length + boy.length))*rowSize);
            let numBoyNeeded = rowSize - numGirlNeeded;

            const newRow = [];
            for (let j = 0; j < numGirlNeeded; j++) {
                if (girl.length !== 0) {
                    newRow.push(girl.pop());
                }
            }
            for (let j = 0; j < numBoyNeeded; j++) {
                if (boy.length !== 0) {
                    newRow.push(boy.pop());
                }
            }

            newData.push(newRow);
        }
        group = structuredClone(newData);
        globalGroup = structuredClone(group);
    } else {
        group = structuredClone(globalGroup);
        if (group.length === 0) {
            enableButtonResult()
            return;
        }
    }

    // display
    await new Promise(resolve => setTimeout(resolve, isWrite == true ? 180 : 0));
    let num = 0;
    if (totalGroup >= 1) {
        document.getElementById("group-result-wraper-1").style.display = "flex";
        document.querySelectorAll('.group-result-item-1').forEach(el => {
            if (num < group[0].length) {
                el.textContent = group[0][num][0];
                if (group[0][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[0][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-1").style.display = "none";
        document.querySelectorAll('.group-result-item-1').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 2) {
        document.getElementById("group-result-wraper-2").style.display = "flex";
        document.querySelectorAll('.group-result-item-2').forEach(el => {
            if (num < group[1].length) {
                el.textContent = group[1][num][0];
                if (group[1][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[1][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-2").style.display = "none";
        document.querySelectorAll('.group-result-item-2').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 3) {
        document.getElementById("group-result-wraper-3").style.display = "flex";
        document.querySelectorAll('.group-result-item-3').forEach(el => {
            if (num < group[2].length) {
                el.textContent = group[2][num][0];
                if (group[2][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[2][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-3").style.display = "none";
        document.querySelectorAll('.group-result-item-3').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 4) {
        document.getElementById("group-result-wraper-4").style.display = "flex";
        document.querySelectorAll('.group-result-item-4').forEach(el => {
            if (num < group[3].length) {
                el.textContent = group[3][num][0];
                if (group[3][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[3][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-4").style.display = "none";
        document.querySelectorAll('.group-result-item-4').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 5) {
        document.getElementById("group-result-wraper-5").style.display = "flex";
        document.querySelectorAll('.group-result-item-5').forEach(el => {
            if (num < group[4].length) {
                el.textContent = group[4][num][0];
                if (group[4][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[4][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-5").style.display = "none";
        document.querySelectorAll('.group-result-item-5').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 6) {
        document.getElementById("group-result-wraper-6").style.display = "flex";
        document.querySelectorAll('.group-result-item-6').forEach(el => {
            if (num < group[5].length) {
                el.textContent = group[5][num][0];
                if (group[5][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[5][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-6").style.display = "none";
        document.querySelectorAll('.group-result-item-6').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 7) {
        document.getElementById("group-result-wraper-7").style.display = "flex";
        document.querySelectorAll('.group-result-item-7').forEach(el => {
            if (num < group[6].length) {
                el.textContent = group[6][num][0];
                if (group[6][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[6][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-7").style.display = "none";
        document.querySelectorAll('.group-result-item-7').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 8) {
        document.getElementById("group-result-wraper-8").style.display = "flex";
        document.querySelectorAll('.group-result-item-8').forEach(el => {
            if (num < group[7].length) {
                el.textContent = group[7][num][0];
                if (group[7][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[7][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-8").style.display = "none";
        document.querySelectorAll('.group-result-item-8').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 9) {
        document.getElementById("group-result-wraper-9").style.display = "flex";
        document.querySelectorAll('.group-result-item-9').forEach(el => {
            if (num < group[8].length) {
                el.textContent = group[8][num][0];
                if (group[8][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[8][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-9").style.display = "none";
        document.querySelectorAll('.group-result-item-9').forEach(el => {
            el.textContent = '';
        });
    }

    num = 0;
    if (totalGroup >= 10) {
        document.getElementById("group-result-wraper-10").style.display = "flex";
        document.querySelectorAll('.group-result-item-10').forEach(el => {
            if (num < group[9].length) {
                el.textContent = group[9][num][0];
                if (group[9][num][1] === "P") {
                    el.style.color = "#ff00ea";
                } else if (group[9][num][1] === "L") {
                    el.style.color = "#2200ff";
                }
                num += 1;
            } else {
                el.textContent = '';
            }
        });
    } else {
        document.getElementById("group-result-wraper-10").style.display = "none";
        document.querySelectorAll('.group-result-item-10').forEach(el => {
            el.textContent = '';
        });
    }

    document.getElementById("group-result-container").style.display = "grid";
    setTimeout(() => {
        document.getElementById("group-result-container").style.opacity = "1";
        document.getElementById("group-result-container").style.transform = "scale(1)";
        document.getElementById("group-result-container").style.visibility = "visible";
    }, 10);

    document.getElementById("group-result-container").style.gridTemplateColumns = window.innerWidth > 768 ? "repeat(5, 1fr)" : "repeat(2, 1fr)";
    document.getElementById("group-result-container").style.gridTemplateRows = window.innerWidth > 768 ? "repeat(1, 1fr)" : `repeat(${Math.ceil(totalGroup/2)}, 1fr)`;


    enableButtonResult()
}

function resetSeat() {
    document.querySelectorAll('.seat-item-L').forEach(el => {
        el.textContent = '??';
        el.style.color = "var(--text-inverted-color)";
        el.style.backgroundColor = "#9FFFA5";
    });
    document.querySelectorAll('.seat-item-P').forEach(el => {
        el.textContent = '??';
        el.style.color = "var(--text-inverted-color)";
        el.style.backgroundColor = "#FFFA9F";
    });
}

function writeSeat() {
    resetSeat();
    //let classSelectOutput = Number(document.getElementById("class-select").value);
    let person = structuredClone(PERSON[classSelectOutput]);
    let man = [];
    let woman = [];

    for (let i = 0; i < person.length; i++) {
        if (person[i][1] === "L") {
            man.push(person[i]);
        } else if (person[i][1] === "P") {
            woman.push(person[i]);
        }
    }

    let manRandom = shuffle(man);
    let womanRandom = shuffle(woman);
    let checkBalanced;
    if (manRandom.length === womanRandom.length) {
        checkBalanced = 0;
    } else if (manRandom.length > womanRandom.length) {
        checkBalanced = 1;
    } else if (manRandom.length < womanRandom.length) {
        checkBalanced = 2;
    }

    let seatOrder = [];
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
            break
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
    console.log(seatOrder);

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

/////// PAGE STUF ///////

function doSomethingAfterMenuChange(type,skip) {
    if (type === 0) {
        setTimeout(() => {
            if (localStorage.getItem("classSelect") !== null) {
                classSelectOutput = Number(localStorage.getItem("classSelect"));

                checkSmartFinder(Number(localStorage.getItem("classSelect")) + 1);
                switch (classSelectOutput) {
                    case 0:
                        document.getElementById("class-name").textContent = "X-1";
                        break;
                    case 1:
                        document.getElementById("class-name").textContent = "X-2";
                        break;
                    case 2:
                        document.getElementById("class-name").textContent = "X-3";
                        break;
                    case 3:
                        document.getElementById("class-name").textContent = "X-4";
                        break;
                    case 4:
                        document.getElementById("class-name").textContent = "X-5";
                        break;
                    case 5:
                        document.getElementById("class-name").textContent = "X-6";
                        break;
                    default:
                        break;
                }
            }

            if (localStorage.getItem("GroupType") !== null) {
                document.querySelector(`input[name="group-type"][value="${Number(localStorage.getItem("GroupType"))}"]`).checked = true;
            } else {
                document.querySelector('input[name="group-type"][value="0"]').checked = true;
            }

            if (localStorage.getItem("GroupNumber") !== null) {
                document.getElementById("group-number").value = Number(localStorage.getItem("GroupNumber"));
            }

            document.getElementById("class-selector").addEventListener("click", () => {
                document.getElementById("class-container").classList.toggle("open");
            });

            document.querySelectorAll(".class-option").forEach(option => {
                option.addEventListener("click", () => {
                    document.getElementById("class-name").textContent = option.textContent;
                    classSelectOutput = Number(option.dataset.value);
                    localStorage.setItem("classSelect", classSelectOutput);
                    checkSmartFinder(classSelectOutput+1);
                    document.getElementById("class-container").classList.remove("open");
                });
            });

            document.querySelectorAll('input[name="group-type"]').forEach(radio => {
                radio.addEventListener("change", function () {
                    const value = Number(this.value);
                    if (this.checked) {
                        updateNumberSelector(value);
                        localStorage.setItem("GroupType", value);
                    }
                });
            });

            document.getElementById("group-number").addEventListener("input", function () {
                const value = Number(this.value);
                localStorage.setItem("GroupNumber", value);
            });

            try {
                writeGroup(false);
            } catch (error) {
            }
        }, skip === false ? 650 : 100);
    } else if (type === 1) {
        setTimeout(() => {
            if (localStorage.getItem("classSelect") !== null) {
                classSelectOutput = Number(localStorage.getItem("classSelect"));

                switch (classSelectOutput) {
                    case 0:
                        document.getElementById("class-name").textContent = "X-1";
                        break;
                    case 1:
                        document.getElementById("class-name").textContent = "X-2";
                        break;
                    case 2:
                        document.getElementById("class-name").textContent = "X-3";
                        break;
                    case 3:
                        document.getElementById("class-name").textContent = "X-4";
                        break;
                    case 4:
                        document.getElementById("class-name").textContent = "X-5";
                        break;
                    case 5:
                        document.getElementById("class-name").textContent = "X-6";
                        break;
                    default:
                        break;
                }
            }

            document.getElementById("class-selector").addEventListener("click", () => {
                document.getElementById("class-container").classList.toggle("open");
            });

            document.querySelectorAll(".class-option").forEach(option => {
                option.addEventListener("click", () => {
                    document.getElementById("class-name").textContent = option.textContent;
                    classSelectOutput = Number(option.dataset.value);
                    localStorage.setItem("classSelect", classSelectOutput);
                    document.getElementById("class-container").classList.remove("open");
                });
            });
        }, skip === false ? 650 : 100);
    }
}

async function pageChange(page, skip, moveType) {
    const content = document.getElementById("content");
    const mainPage = document.getElementById("main-container");

    if (!skip) {
        if (moveType === 0) {
        content.style.transition = "transform 500ms ease";
        content.style.transform = "translateX(-200%)";
        await new Promise(resolve => setTimeout(resolve, 500));
        content.style.transition = "none";
        content.style.transform = "translateX(200%)";
        await new Promise(resolve => setTimeout(resolve, 20));
        } else if (moveType === 1) {
        content.style.transition = "transform 500ms ease";
        content.style.transform = "translateX(200%)";
        await new Promise(resolve => setTimeout(resolve, 500));
        content.style.transition = "none";
        content.style.transform = "translateX(-200%)";
        await new Promise(resolve => setTimeout(resolve, 20));
        } else if (moveType === 2) {
        content.style.transition = "transform 500ms ease";
        content.style.transform = "translateY(-200%)";
        await new Promise(resolve => setTimeout(resolve, 520));
        }

    }

    await fetch(`pages/${page}.html`)
    .then(res => {
        if (!res.ok) throw new Error("Page not found");
        return res.text();
    })
    .then(html => {
        content.innerHTML = html;
        history.pushState({ page }, "", `#${page}`);
    })
    .catch(() => {
        fetch(`pages/404.html`)
        .then(res => {
            if (!res.ok) throw new Error("404 Page not found. womp womp.");
            return res.text();
        })
        .then(html => {
            content.innerHTML = html;
            history.pushState({ page: "404" }, "", `#${"404"}`);
        })
        .catch(() => {
            content.innerHTML = '<div id="main-container">500 Internal Error</div>';
            history.pushState({ page }, "", `#${page}`);
        });
    });

    if (!skip) {
        content.style.transition = "transform 500ms ease";
        content.style.transform = "translateX(0) translateY(0)";
        await new Promise(resolve => setTimeout(resolve, 500));
        content.style.transition = "none";
    }
}

let typeBuff;
let pageBefore;
let menuChangeSpamCheck = false;
async function menuChange(page, skip=false) {
    if (pageBefore === page) {
        return;
    }

    if (menuChangeSpamCheck) {
        return;
    }

    pageBefore = page;
    let type;
    menuChangeSpamCheck = true;
    switch (page) {
        case "":
        case "home":
            type = -1;
            break;
        case "kel-o-matic":
            type = 0;
            break;
        case "seat-o-matic":
            type = 1;
            break;
        case "settings":
            type = 2;
            break;
        case "about":
            type = 3;
            break;
        default:
            type = -2;
            typeBuff = -2;
            break;
    }


    if (typeBuff === undefined) {
        typeBuff = type;
    }


    let moveType = 0;
    if (typeBuff > type) {
        moveType = 0;
    } else if (typeBuff < type) {
        moveType = 1;
    } else if (typeBuff === type) {
        moveType = 2;
    }


    typeBuff = type;

    if (type >= 0) {
        let cor = document.getElementById(`menu-item-container-${type+1}`).offsetLeft;

        document.getElementById("menu-item-select-container").style.left = `${Math.round(cor-6)}px`;

        document.getElementById("menu-item-select-container").style.width = window.innerWidth > 768 ? "136px" : "72px";
        setTimeout(() => {
            document.getElementById("menu-item-select-container").style.transition = "all 1s cubic-bezier(0.2, 1.3, 0.3, 1)";
        }, 10);

        pageChange(page,skip,moveType);

        await new Promise(resolve => setTimeout(resolve, 100));
        doSomethingAfterMenuChange(type,skip);
    } else if (type <= -1) {
        let cor;
        if (window.innerWidth > 768) {
            cor = document.getElementById(`menu-icon-container`).offsetLeft+100;
        } else {
            cor = -100;
        }
        document.getElementById("menu-item-select-container").style.transition = "all 1s cubic-bezier(0.2, 1, 0.3, 1)";

        document.getElementById("menu-item-select-container").style.left = `${Math.round(cor+6)}px`;

        setTimeout(() => {
            document.getElementById("menu-item-select-container").style.width = window.innerWidth > 768 ? "0" : "72px";
            document.getElementById("menu-item-select-container").style.transition = "all 1s cubic-bezier(0.2, 1.3, 0.3, 1)";
        }, 10);

        pageChange(page !== "" ? page : "home",skip,moveType);
    }

    const body = document.getElementById("body-content");

    if (skip) {
        body.style.transition = "none";
    }

    if (type === -1) {
        body.style.backgroundPosition = "0 4%";
    } else {
        body.style.backgroundPosition = "0 6%";
    }

    setTimeout(() => {
        body.style.transition = "background-position 1s";
    }, 200);

    setTimeout(() => {
        menuChangeSpamCheck = false;
    }, skip === false ? 1000 : 100);
}

window.addEventListener("DOMContentLoaded", () => {
    menuChange(location.hash.replace("#", ""),true);
});

window.addEventListener("popstate", () => {
    menuChange(location.hash.replace("#", ""));
});

window.matchMedia("(max-width: 768px)").addEventListener("change", e => {
    if (document.getElementById("menu-container")) {
        let type;
        switch (location.hash.replace("#", "")) {
            case "":
            case "home":
                type = -1;
                break;
            case "kel-o-matic":
                type = 0;
                break;
            case "seat-o-matic":
                type = 1;
                break;
            case "settings":
                type = 2;
                break;
            case "about":
                type = 3;
                break;
            default:
                type = -2;
                typeBuff = -2;
                break;
        }
        document.getElementById("menu-item-select-container").style.transition = "none";
        if (type >= 0) {
            let cor = document.getElementById(`menu-item-container-${type+1}`).offsetLeft;

            document.getElementById("menu-item-select-container").style.left = `${Math.round(cor-6)}px`;

            document.getElementById("menu-item-select-container").style.width = window.innerWidth > 768 ? "136px" : "72px";
            setTimeout(() => {
                document.getElementById("menu-item-select-container").style.transition = "all 1s cubic-bezier(0.2, 1.3, 0.3, 1)";
            }, 1000);
        } else if (type <= -1) {
            let cor;
            if (window.innerWidth > 768) {
                cor = document.getElementById(`menu-icon-container`).offsetLeft+100;
            } else {
                cor = -100;
            }

            document.getElementById("menu-item-select-container").style.left = `${Math.round(cor+6)}px`;

            setTimeout(() => {
                document.getElementById("menu-item-select-container").style.width = window.innerWidth > 768 ? "0" : "72px";
            }, 10);
            setInterval(() => {
                document.getElementById("menu-item-select-container").style.transition = "all 1s cubic-bezier(0.2, 1.3, 0.3, 1)";
            }, 1000);
        }
    }

    if (document.getElementById("group-result-container")) {
        document.getElementById("group-result-container").style.gridTemplateColumns = window.innerWidth > 768 ? "repeat(5, 1fr)" : "repeat(2, 1fr)";
        document.getElementById("group-result-container").style.gridTemplateRows = window.innerWidth > 768 ? "repeat(1, 1fr)" : `repeat(${Math.ceil(globalGroup/2)}, 1fr)`;
    }

    if (e.matches) {
    } else {
    }
});
