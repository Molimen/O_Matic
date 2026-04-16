let isCacheLoaded = false;
let studentsCache = null;
let studentsCacheClass = null;

export async function getStudentsData(idx) {
    isCacheLoaded = true;

    if (isCacheLoaded && studentsCache !== null && studentsCacheClass === idx) {
        return studentsCache;
    }

    try {
        const response = await fetch(`https://misty-haze-0c50b7xf9.ceplox021.workers.dev/?type=person&index=${idx-1}`);
        if (!response.ok) throw new Error("Failed to fetch student data");
        const rawdata = await response.json();
        studentsCache = rawdata["result"];
        studentsCacheClass = idx;
        return rawdata["result"];
    } catch {
        if (!navigator.onLine) throw new Error("No internet connection");
        throw new Error("Connection issue, please try again later :>");
    }
}