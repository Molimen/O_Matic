const language = [{ //en
    homeTitle: "UTILITIES-CLASS<br>O-MATIC",
    homeSeatDesc: "Confused about finding a good seat order??? Here's the solution! With cutting-edge technology from the 22nd century!",
    homeSeatButton: "Create a New Seat Chart!",
    homekelDesc: "Ever had a bad group in group work?? Want to know the solution? The solution is below, click it!",
    homeKelButton: "Create a New Group!",
    selectClass: "Select<br>Class:",
    kelTypeSearch: "Type<br>Search:",
    kelTSGroup: "Group",
    kelTSMember: "Member",
    kelNumber: "How<br>Much:",
    kelSmrtFind: "Smart<br>Finder:",
    kelGenerate: "Generate",
    seatGenerate: "Generate",
    setTitleAppearance: "🎀 Appearance",
    setSubAppearance: "Theme",
    setDescAppearance: "Want super bright 3000 theme or dark...",
    setBtnAppearanceLight: "Light",
    setBtnAppearanceDark: "Dark",
    setSubEffect: "Effect",
    setDescEffect: "Want animated or nahh?",
    setBtnEffectEnable: "Enable",
    setBtnEffectDisable: "Disable",
    setSubLang: "Language",
    setDescLang: "Select Language",
    },
    { //id
    homeTitle: "UTILITAS-KELAS<br>O-MATIC",
    homeSeatDesc: "Bingung mencari urutan kursi yang bagus??? Ini solusinya! Dengan teknologi cangih dari abad 22!",
    homeSeatButton: "Buatlah SeatChart baru!",
    homekelDesc: "Setiap kerja kelompok pernah dapat kelompok jelek?? Mau tau solusinya? Solusinya ada dibawah bisa dipencet!",
    homeKelButton: "Bikin Kelompok baru!",
    selectClass: "Pilih<br>Kelas:",
    kelTypeSearch: "Cari<br>dgn:",
    kelTSGroup: "Kelompok",
    kelTSMember: "Anggota",
    kelNumber: "Jumlah:",
    kelSmrtFind: "Pencari<br>Pintar:",
    kelGenerate: "Buat",
    seatGenerate: "Buat",
    setTitleAppearance: "🎀 Tampilan",
    setSubAppearance: "Tema",
    setDescAppearance: "Ingin tema super cerah 3000 atau gelap...",
    setBtnAppearanceLight: "Cerah",
    setBtnAppearanceDark: "Gelap",
    setSubEffect: "Efek",
    setDescEffect: "Ingin animasi atau tidak?",
    setBtnEffectEnable: "Aktifkan",
    setBtnEffectDisable: "Nonaktifkan",
    setSubLang: "Bahasa",
    setDescLang: "Pilih Bahasa",
    }
];

export function getLang(type) {
    let langID = NaN;

    switch (type) {
        case "en":
            langID = 0;
            break;
        case "id":
            langID = 1;
            break;
        default:
            break;
    }

    return language[langID];
}

export function currentLang() {
    if (localStorage.getItem("lang") !== null) return localStorage.getItem("lang");
    else localStorage.setItem("lang", "en");

    return "en";
}

export function currentLangFull() {
    if (localStorage.getItem("lang") !== null) {
        switch (localStorage.getItem("lang")) {
            case "en":
                return "English";
            case "id":
                return "Indonesia";
            default:
                break;
        }
    } else localStorage.setItem("lang", "en");
    
    return "English";
}

export function init() {

}