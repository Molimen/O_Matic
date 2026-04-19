let studentsCache = null;
let studentsCacheClass = null;

export async function getStudentsData(idx) {
    if (studentsCache !== null && studentsCacheClass === idx) {
        return studentsCache;
    }

    try {
        const response = await fetch('https://o-matic-person.molimen.workers.dev/?type=students');
        if (!response.ok) throw new Error("Failed to fetch student data");

        const rawdata = await response.json();

        studentsCache = rawdata[idx-1];
        studentsCacheClass = idx;

        return rawdata[idx-1];
    } catch {
        if (!navigator.onLine) throw new Error("No internet connection");
        throw new Error("Connection issue, please try again later :>");
    }
}

let blacklistedCache = null;

export async function getBlacklistedData() {
    if (blacklistedCache !== null) {
        return blacklistedCache;
    }

    try {
        const response = await fetch('https://o-matic-person.molimen.workers.dev/?type=blacklistpartner');
        if (!response.ok) throw new Error("Failed to fetch blacklisted data");
        
        const rawdata = await response.json();

        blacklistedCache = rawdata;

        return rawdata;
    } catch {
        if (!navigator.onLine) throw new Error('No internet connection');
        throw new Error('Connection issue, pls try again later');
    }
}