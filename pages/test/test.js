export function init() {
    async function SHA256converter(message) {
        // 1. Encode pesan menjadi Uint8Array
        const msgBuffer = new TextEncoder().encode(message);
    
        // 2. Hash pesan menggunakan SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
        // 3. Konversi buffer ke Array (hex string)
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
    
    // Cara penggunaan:
    // SHA256converter("C7Mfv2Ox").then(hash => console.log(hash));
}