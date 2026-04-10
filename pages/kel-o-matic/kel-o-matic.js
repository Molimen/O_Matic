import { returnPerson } from '../modules/person.js';

async function getPersonData(idx) {
    const response = await fetch(`https://misty-haze-0c50b7xf9.ceplox021.workers.dev/?type=person&index=${idx}`, {
        cache: "force-cache"
    });
    
    if (!response.ok) {
        throw new Error("Gagal mengambil data");
    }

    const rawdata = await response.json();
    return rawdata["result"];
}


/*
type 0 = empty type search (groupSearchTypeOutput NaN);
type 1 = too much group inputed (totalGroup > totalPerson);
type 2 = too litte group inputed (totalGroup < 1);
type 3 = too much member inputed (totalMember > totalPerson);
type 4 = too much little inputed (totalMember < 1);
type 5 = negative input NOT allowed! (totalMember < 0 || totalGroup < 0);
type 6 = Number field MUST not be empty! (groupNumberOutput === '')
*/
async function errorMessageGroup(type) {
    await new Promise(resolve => setTimeout(resolve, 180));
    const errorContainer = document.getElementById("group-error-container");
    errorContainer.style.display = "inline";
    setTimeout(() => {
        errorContainer.style.opacity = "1";
        errorContainer.style.transform = "scale(1)";
        errorContainer.style.visibility = "visible";
    }, 10);

    const text = document.getElementById("group-error-text");

    switch (type) {
        case 0:
            text.textContent = 'Please Select "Type search"!';
            break;
        case 1:
            text.textContent = 'Group exceeded allowed total!';
            break;
        case 2:
            text.textContent = 'Too little amount of group!';
            break;
        case 3:
            text.textContent = 'Member exceeded allowed total!';
            break;
        case 4:
            text.textContent = 'Too little amount of Member(s)';
            break;
        case 5:
            text.textContent = 'Negative input is NOT allowed!';
            break;
        case 6:
            text.textContent = 'Number field must NOT be empty!';
            break;
        default:
            text.textContent = 'Error!';
            break;
    }
}

function resetGroup(isWrite) {
    document.querySelector(".group-error-container").style.opacity = "0";
    document.querySelector(".group-error-container").style.transform = "scale(0.9)";
    document.querySelector(".group-result-container").style.opacity = "0";
    document.querySelector(".group-result-container").style.transform = "scale(0.9)";
    setTimeout(() => {
        document.querySelector(".group-result-container").style.display = "none";
        document.querySelector(".group-result-container").style.visibility = "collapse";
        document.querySelector(".group-error-container").style.display = "none";
        document.querySelector(".group-error-container").style.visibility = "collapse";
        document.querySelector(".group-result-container").innerHTML = "";
    }, isWrite == true ? 100 : 0);
}

let globalGroup;
async function writeKel(isWrite) {
    resetGroup(isWrite);
    // Input User
    let classOutput = Number(localStorage.getItem(localStorage.getItem("classSelect") !== localStorage.getItem("groupLatestClassSelect") ? "groupLatestClassSelect" : "classSelect"));
    let groupSearchTypeOutput = localStorage.getItem("GroupType");
    let groupNumberOutput = Number(localStorage.getItem("GroupNumber"));
    let groupGenTypeOutput = localStorage.getItem("GroupGenType");

    let totalGroup = null;
    let totalMember = null;

    let groupNameOutputType;
    switch (classOutput) {
        case 4:
        case 5:
            groupNameOutputType = groupGenTypeOutput;
            break;
        default:
            groupNameOutputType = "absent";
            break;
    }

    // Pre-Check
    let group = [];
    let person = structuredClone(returnPerson()[classOutput]);
    let totalPerson = person.length;

    if (localStorage.getItem("GroupNumber") === '') {
        errorMessageGroup(6);
        return;
    }

    if (groupSearchTypeOutput === "group") {
        totalGroup = groupNumberOutput;
        totalMember = null;
    } else if (groupSearchTypeOutput === "member") {
        totalGroup = null;
        totalMember = groupNumberOutput;
    }

    if (totalGroup > totalPerson) {
        errorMessageGroup(1);
        return;
    }
    if (totalMember > totalPerson) {
        errorMessageGroup(3);
        return;
    }
    if (totalGroup < 0 || totalMember < 0) {
        errorMessageGroup(5);
        return;
    }
    if (totalMember < 1 && totalMember !== null) {
        errorMessageGroup(4);
        return;
    }
    if ((totalGroup > 0 && totalMember > 0) || (totalGroup < 0 && totalMember < 0)) {
        throw new Error("Invalid Data!");
    }

    if (totalMember > 0) {
        totalGroup = Math.floor(totalPerson/totalMember);
        totalMember = null;
    }

    if (totalGroup < 1) {
        errorMessageGroup(2);
        return;
    }

    // proses
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
        if (typeof group === "undefined") return;
    }

    await new Promise(resolve => setTimeout(resolve, isWrite == true ? 180 : 0));

    document.querySelector(".group-input-downloadnshare-button").disabled = false;

    for (let i = 0; i < totalGroup; i++) {
        const wraper = document.createElement('div');
        wraper.className = 'group-result-wraper';

        document.querySelector(".group-result-container").appendChild(wraper);
    }


    let counter = 0;
    document.querySelectorAll(".group-result-wraper").forEach(wraper => {
        const title = document.createElement("span");
        const line = document.createElement("span");

        title.className = "group-result-title";
        title.textContent = `KEL ${counter+1}`;
        line.className = "group-result-line";
        wraper.appendChild(title);
        wraper.appendChild(line);

        for (let i = 0; i < group[counter].length; i++) {
            const item = document.createElement("span");
            item.className = "group-item";
            item.textContent = `${group[counter][i][groupNameOutputType === "name" ? 3 : 0]}`;
            if (group[counter][i][1] === "L") {
                item.style.color = "royalblue";
            } else {
                item.style.color = "hotpink";
            }
            wraper.appendChild(item);
        }
        counter++;
    });

    document.querySelector(".group-result-container").style.display = "grid";

    setTimeout(() => {
        document.querySelector(".group-result-container").style.opacity = "1";
        document.querySelector(".group-result-container").style.transform = "scale(1)";
        document.querySelector(".group-result-container").style.visibility = "visible";
    }, 10);
}

function checkGroupGentype(type) {
    const radio = document.querySelectorAll('input[name="group-gen-type"]');
    const option = document.querySelectorAll('.group-gen-type-option');
    switch (Number(type)) {
        case 4:
        case 5:
            radio.forEach(input => {
                input.disabled = false;
                input.style.cursor = "pointer";
            });
            option.forEach(label => {
                label.style.cursor = "pointer";
            });
            break;
        default:
            radio.forEach(input => {
                input.disabled = true;
                input.style.cursor = "not-allowed";
            });
            option.forEach(label => {
                label.style.cursor = "not-allowed";
            });
            break;
    }
}

async function downloadGroup() {
    if (typeof globalGroup === "undefined") {
        return;
    }

    const module = await import("../modules/html2canvas.esm.js");
    const html2canvas = module.default;

    const element_target = document.querySelector('.group-result-container');
    element_target.style.borderRadius = "0px";
    const canvas = await html2canvas(element_target,{scale : 2});

    canvas.toBlob(async (blob) => {
        const file = new File([blob], "hasil.png", {type: "image/png"});

        //firefox kaga support share
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "Group-chart baru"
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
    element_target.style.borderRadius = "21px";
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

    if (localStorage.getItem("GroupType") !== null && localStorage.getItem("GroupType") !== "0" && localStorage.getItem("GroupType") !== "1") {
        document.querySelector(`input[name="group-type"][value="${localStorage.getItem("GroupType")}"]`).checked = true;
    } else {
        localStorage.setItem("GroupType", "group");
        document.querySelector('input[name="group-type"][value="group"]').checked = true;
    }

    if (localStorage.getItem("GroupNumber") !== null) {
        document.querySelector('input[name="group-number"]').value = localStorage.getItem("GroupNumber");
    } else {
        localStorage.setItem("GroupNumber", 3);
    }

    if (localStorage.getItem("GroupGenType") !== null) {
        document.querySelector(`input[name="group-gen-type"][value="${localStorage.getItem("GroupGenType")}"]`).checked = true;
    } else {
        localStorage.setItem("GroupGenType", "absent");
        document.querySelector('input[name="group-gen-type"][value="absent"]').checked = true;
    }

    document.querySelector(".multiselect-selector").addEventListener("click", () => {
        document.querySelector(".multiselect-container").classList.toggle("open");
    });

    document.querySelectorAll(".multiselect-options-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelector(".multiselect-selector-name").textContent = option.textContent;
            localStorage.setItem("classSelect", option.dataset.value);
            checkGroupGentype(option.dataset.value);
            document.querySelector(".multiselect-container").classList.remove("open");
        });
    });

    document.querySelectorAll('input[name="group-type"]').forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.checked) {
                localStorage.setItem("GroupType", this.value);
            }
        });
    });

    document.querySelector('input[name="group-number"]').addEventListener("input", function () {
        localStorage.setItem("GroupNumber", this.value);
    });

    document.querySelectorAll('input[name="group-gen-type"]').forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.checked) {
                localStorage.setItem("GroupGenType", this.value);
            }
        });
    });

    document.querySelector(".group-input-button").addEventListener("click", () => {
        localStorage.setItem("groupLatestClassSelect", localStorage.getItem("classSelect"));
        writeKel(true);
    });

    checkGroupGentype(localStorage.getItem("classSelect"));

    try {
        writeKel(false);
    } catch {
    }

    if (typeof globalGroup !== "undefined") document.querySelector(".group-input-downloadnshare-button").disabled = false;
    else document.querySelector(".group-input-downloadnshare-button").disabled = true;

    document.querySelector('.group-input-downloadnshare-button').addEventListener("click", () => {
        downloadGroup();
    })
}