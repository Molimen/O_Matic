import { getStudentsData, getBlacklistedData } from "../modules/person.js";
import { showNotification } from '../modules/notification.js';
import '../modules/snapdom/snapdom.min.js';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function groupsMessageInfo(message, type = 'info') {
    document.querySelector('.message-item').textContent = message;
    if (type === 'error') {
        document.querySelector('.message-item').classList.remove('text-neon-green');
        document.querySelector('.message-item').classList.add('text-error');
    } else {
        document.querySelector('.message-item').classList.remove('text-error');
        document.querySelector('.message-item').classList.add('text-neon-green');
    }
}

function resetGroupsDisplay(hidden = true) {
    document.querySelector('.result-grid').innerHTML = '';
    if (hidden) document.querySelector('.result-container').classList.add('hidden');
}

function showGroupsDisplay(groups) {
    const generationType = document.querySelector('.generation-type').value;

    for (let group of groups) {
        let groupElement = document.createElement('div');
        groupElement.classList.add('p-2', 'pb-4', 'glass-panel', 'rounded-lg', 'border', 'border-outline-variant/10', 'flex', 'flex-col', 'items-center');
        
        const groupTitle = document.createElement('span');
        const groupLine = document.createElement('div');
        const groupMembers = document.createElement('div');

        groupTitle.textContent = `Group ${groups.indexOf(group) + 1}`;
        groupTitle.classList.add('text-xl');
        groupLine.classList.add('bg-white', 'h-[3px]', 'w-[80%]', 'mb-1');
        groupMembers.classList.add('flex', 'flex-col', 'items-center');

        groupElement.appendChild(groupTitle);
        groupElement.appendChild(groupLine);
        
        for (let member of group) {
            const memberElement = document.createElement('span');
            if (generationType === 'absent') {
                memberElement.textContent = member[0];
            } else if (generationType === 'name') {
                memberElement.textContent = member[3];
            }
            
            if (member[1] === 'P') {
                memberElement.classList.add('text-pink-500');
            } else if (member[1] === 'L') {
                memberElement.classList.add('text-blue-500');
            }
            groupMembers.appendChild(memberElement);
        }

        groupElement.appendChild(groupMembers);

        document.querySelector('.result-grid').appendChild(groupElement);
    }

    document.querySelector('.result-container').classList.remove('hidden');
}

let GroupsImage;

async function generateGroupsImage() {
    await new Promise(resolve => requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
    ));

    const result = await snapdom(document.querySelector('.result-container'), { scale:2, embedFonts: true, backgroundColor: '#000000' });
    const canvas = await result.toCanvas();
    
    const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    GroupsImage = new File([pngBlob], 'groups-image.png', {type: 'image/png'});
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

let resumeGroup;

async function generateGroups() {
    const classSelected = document.querySelector('.class-select').value;
    const typeSearch = document.querySelector('.type-search').value;
    const totalItem = parseInt(document.querySelector('.total-item').value);

    let totalGroups = null;
    let totalMembers = null;

    let groups = [];
    let students = structuredClone(await getStudentsData(classSelected));
    let totalStudents = students.length;

    if (isNaN(totalItem)) {
        groupsMessageInfo('Total item must not be empty.', 'error');
        resetGroupsDisplay();
        return;
    }

    if (typeSearch === 'group') {
        totalGroups = totalItem;
        totalMembers = null;
    } else if (typeSearch === 'member') {
        totalGroups = null;
        totalMembers = totalItem;
    }

    if (totalGroups > students.length) {
        groupsMessageInfo('Total groups cannot be more than total students.', 'error');
        resetGroupsDisplay();
        return;
    }

    if (totalMembers > students.length) {
        groupsMessageInfo('Total members cannot be more than total students.', 'error');
        resetGroupsDisplay();
        return;
    }

    if (totalGroups < 0 || totalMembers < 0) {
        groupsMessageInfo('Total item must be greater than 0.', 'error');
        resetGroupsDisplay();
        return;
    }

    if (totalMembers < 1 && totalGroups === null) {
        groupsMessageInfo('Total members must be at least 1.', 'error');
        resetGroupsDisplay();
        return;
    }

    if ((totalGroups > 0 && totalMembers > 0) || (totalGroups < 0 && totalMembers < 0)) {
        groupsMessageInfo('Invalid combination of total groups and members. and i dont expect this to happen. because it should be either groups or members.', 'error');
        resetGroupsDisplay();
        return;
    }

    if (totalMembers > 0) {
        totalGroups = Math.floor(totalStudents/totalMembers);
        totalMembers = null;
    }

    if (totalGroups <= 1) {
        groupsMessageInfo('Total groups must be greater than 1.', 'error');
        resetGroupsDisplay();
        return;
    }

    // shuffle students
    students = shuffle(students);

    // generate groups
    for (let i = 0; i < totalGroups; i++) {
        groups.push([]);
    }

    let groupIndex = 0;
    for (let student of students) {
        groups[groupIndex].push(student);
        groupIndex++;

        if (groupIndex >= totalGroups) {
            groupIndex = 0;
        }
    }

    const flattenGroups = groups.flat();

    const studentsGirls = flattenGroups.filter(student => student[1] === 'P');
    const studentsBoys = flattenGroups.filter(student => student[1] === 'L');

    const newGroups = [];
    for (let group of groups) {
        let rowSize = group.length;
        let numberOfGirls = Math.round((studentsGirls.length / (studentsGirls.length + studentsBoys.length)) * rowSize);
        let numberOfBoys = rowSize - numberOfGirls;

        const row = [];
        for (let j = 0; j < numberOfGirls; j++) {
            if (studentsGirls.length === 0) break;
            row.push(studentsGirls.pop());
        }
        for (let j = 0; j < numberOfBoys; j++) {
            if (studentsBoys.length === 0) break;
            row.push(studentsBoys.pop());
        }

        newGroups.push(row);
    }
    groups = newGroups;

    let groupCounter = 0;
    let blacklistedCounter = 0;
    let blacklistedCounterEachGroup = [];
    let isThereAnyChange = false;
    if (classSelected === '6') {
        for (let group of groups) {
            blacklistedCounter = null;
            let originStudentsInGroup = null;
            let listOfBlacklistedPartnerInGroup = [];
            for (let student of group) {
                if (blacklistedPartner[student[0]] !== undefined) {
                    originStudentsInGroup = student[0];
                    for (let partner of group) {
                        if (blacklistedPartner[student[0]].includes(partner[0])) {
                            blacklistedCounter++;
                            listOfBlacklistedPartnerInGroup.push(partner);
                        }
                    }
                    break;
                }
            }
            blacklistedCounterEachGroup.push([groups.indexOf(group), blacklistedCounter, listOfBlacklistedPartnerInGroup, originStudentsInGroup]);
            groupCounter++;
        }

        for (let blacklisted of blacklistedCounterEachGroup) {
            if (blacklisted[1] === null) continue;

            let ratio = (groups[blacklisted[0]].length - blacklisted[1])/blacklisted[1];

            console.log('Group:',blacklisted[0]+1, ratio);

            if (ratio < 2.5) {
                let whoIsSwapPartner = null;
                for (let i = 0; i < blacklisted[1]; i++) {
                    let parnerGroupIndex = Math.floor(Math.random() * groups.length);
                    for (let student of groups[parnerGroupIndex]) {
                        if (!blacklistedPartner[blacklisted[3]].includes(student[0]) && student[0] !== blacklisted[3] && student[1] === blacklisted[2][i][1]) {
                            whoIsSwapPartner = student;
                            break;
                        }
                    }

                    if (whoIsSwapPartner !== null) {
                        const temp = groups[blacklisted[0]][groups[blacklisted[0]].indexOf(blacklisted[2][i])];

                        groups[blacklisted[0]][groups[blacklisted[0]].indexOf(blacklisted[2][i])] = whoIsSwapPartner;
                        groups[parnerGroupIndex][groups[parnerGroupIndex].indexOf(whoIsSwapPartner)] = temp;

                        whoIsSwapPartner = null;

                        isThereAnyChange = true;
                    } else {
                        i--;
                    }
                }
            }
        }
    }

    resumeGroup = structuredClone(groups);

    resetGroupsDisplay(false);

    const groupNameInput = document.querySelector('.group-name-input');
    if (isThereAnyChange) {
        groupNameInput.placeholder = 'Group Name...';
    } else {
        groupNameInput.placeholder = 'Group Name';
    }

    showGroupsDisplay(groups);

    generateGroupsImage();

    groupsMessageInfo('Groups generated somewhat successfully!');

    // console.log('total students:', students.length);
    // console.log('students:', students);
    // console.log("Class Selected:", classSelected);
    // console.log("Generation Type:", generationType);
    // console.log("Type Search:", typeSearch);
    // console.log("Total Item:", totalItem);
    // console.log("Total Groups:", totalGroups);
    // console.log("Total Members:", totalMembers);
    // console.log('groups:', groups);
    // groupsMessageInfo('nothing to do');
}

function generationTypeChecker() {
    const classSelected = document.querySelector('.class-select').value;
    const generationType = document.querySelector('.generation-type');

    switch (classSelected) {
        case '5':
        case '6':
            generationType.disabled = false;
            break;
        default:
            generationType.disabled = true;
            generationType.value = 'absent';
            generationType.dispatchEvent(new Event('change'));
            break;
    }
}

function increase() {
    let GroupHowMuchNumber = document.querySelector(".total-item");

    let nextNumber = Number(GroupHowMuchNumber.value);
    nextNumber++;
    if (Number(GroupHowMuchNumber.value) < Number(GroupHowMuchNumber.max)) {
        GroupHowMuchNumber.value = String(nextNumber);
    };
    document.querySelector('.total-item').dispatchEvent(new Event('input'));
};

function decrease() {
    let GroupHowMuchNumber = document.querySelector(".total-item");

    let nextNumber = Number(GroupHowMuchNumber.value);
    nextNumber--;
    if (Number(GroupHowMuchNumber.value) > Number(GroupHowMuchNumber.min)) {
        GroupHowMuchNumber.value = String(nextNumber);
    };
    document.querySelector('.total-item').dispatchEvent(new Event('input'));
};

async function downloadGroups() {
    if (typeof GroupsImage === 'undefined') {
        groupsMessageInfo('The groups is has not been generated', 'error');
        return;
    }

    if (navigator.share && navigator.canShare?.({files: [GroupsImage]})) {
        await navigator.share({
            files: [GroupsImage],
            title: 'Group-chart baru'
        });
        groupsMessageInfo('The groups has been shared!');
    } else {
        const url = URL.createObjectURL(GroupsImage);

        const a = document.createElement('a');
        a.href = url;
        a.download = GroupsImage.name;
        a.click();

        URL.revokeObjectURL(url);

        groupsMessageInfo('The groups has been shared trough download!');
    }
}

function updateGroupsDisplayWhenGenerationTypeChanged() {
    if (typeof resumeGroup !== 'undefined') {
        resetGroupsDisplay(false);

        showGroupsDisplay(resumeGroup);
    }

    generateGroupsImage();
}

function initInput() {
    if (localStorage.getItem('classSelected') !== null) {
        document.querySelector('.class-select').value = localStorage.getItem('classSelected');
    };

    if (localStorage.getItem('generationType') !== null) {
        document.querySelector('.generation-type').value = localStorage.getItem('generationType');
    };

    if (localStorage.getItem('typeSearch') !== null) {
        document.querySelector('.type-search').value = localStorage.getItem('typeSearch');
    };

    if (localStorage.getItem('totalItem') !== null) {
        document.querySelector('.total-item').value = localStorage.getItem('totalItem');
    };
}

function initDetectInput() {
    generationTypeChecker();

    document.querySelector('.class-select').addEventListener('change', (e) => {
        localStorage.setItem('classSelected', e.target.value);

        generationTypeChecker();
        resetGroupsDisplay();
        groupsMessageInfo('nothing to do');
    });

    document.querySelector('.generation-type').addEventListener('change', (e) => {
        localStorage.setItem('generationType', e.target.value);

        updateGroupsDisplayWhenGenerationTypeChanged();
    });

    document.querySelector('.type-search').addEventListener('change', (e) => {
        localStorage.setItem('typeSearch', e.target.value);
    });

    document.querySelector('.total-item').addEventListener('input', (e) => {
        if (e.target.value !== '') {
            localStorage.setItem('totalItem', e.target.value);
        }
    });

    document.getElementById("decrement").addEventListener('click', decrease);
    document.getElementById("increment").addEventListener('click', increase);

    document.querySelector('.process-button').addEventListener('click', () => {
        generateGroups();
    });

    document.querySelector('.download-button').addEventListener('click', () => {
        downloadGroups();
    });

    document.querySelector(".group-hint-button").addEventListener('click', () => {
        const notificationContent = `                
        <div class="mb-8 flex justify-between items-center min-h-auto">
            <div class="text-[clamp(25px,5vw,30px)] leading-[clamp(1.5rem,1vw,0.2rem)] uppercase tracking-[0.15em] font-bold text-pink-400">Input explanation</div>
        </div>
        <div class="text-[16px] uppercase tracking-[0.2em] font-bold text-pink-500/80">Generation type</div>
        <div class="tracking-wide">Controls result format — <b><i>Student Absent</i></b> shows numbers, <b><i>Student Name</i></b> shows short names.</div>
        <div class="h-4"></div>

        <div class="text-[16px] uppercase tracking-[0.2em] font-bold text-pink-500/80">Type search</div>
        <div class="tracking-wide">Choose <b><i>Group</i></b> to set number of groups, or <b><i>Member</i></b> to set students per group.</div>
        <div class="h-4"></div>

        <div class="text-[16px] uppercase tracking-[0.2em] font-bold text-pink-500/80">How much</div>
        <div class="tracking-wide">The 'n' for Type Search. For example, <mark style="background-color: #743665; color: white;"><i>Member</i> + ${parseInt(document.querySelector('.total-item').value)}</mark> = ${parseInt(document.querySelector('.total-item').value)} students per group. <mark style="background-color: #743665; color: white;"><i>Group</i> + ${parseInt(document.querySelector('.total-item').value)}</mark> = ${parseInt(document.querySelector('.total-item').value)} groups (with <b>student amount</b> and <b>group's student gender ratio</b> spread evenly).</div>
        <div class="h-4"></div>

        <div class="text-[16px] uppercase tracking-[0.2em] font-bold text-pink-500/80">Smart finder</div>
        <div class="tracking-wide">Currently unavailable. because the dev is not in the mood to add this feature. this is a intensive feature and chalange dev moral to add this.</div>
        `;

        showNotification(notificationContent);
    });
}

export function init() {
    initInput();
    initDetectInput();

    if (typeof resumeGroup !== 'undefined') {
        showGroupsDisplay(resumeGroup);
        groupsMessageInfo('showing last groups result!');
    }
}