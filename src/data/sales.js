const firstNames = [
  "Budi", "Siti", "Andi", "Dewi", "Rizky", "Nur", "Agus", "Wulan", "Joko",
  "Fitri", "Tono", "Maya", "Hendra", "Salsa", "Daniel", "Oktaviani",
  "Tegar", "Rina", "Fauzan", "Melati", "Rudi", "Adit", "Putri", "Galih",
  "Rara", "Bambang", "Indah", "Lukman", "Vina", "Dian", "Arif", "Fajar",
  "Nia", "Restu", "Yoga", "Imam", "Nanda", "Yuni", "Gilang", "Ayu"
];

const lastNames = [
  "Santoso", "Aminah", "Pratama", "Lestari", "Hidayat", "Aisyah", "Firmansyah",
  "Sari", "Purwanto", "Ramadhani", "Surya", "Putri", "Wijaya", "Bela",
  "Prasetyo", "Mahendra", "Safitri", "Nur", "Ayu", "Saputra", "Setiawan",
  "Handayani", "Sungkono", "Maulana", "Kurniawan", "Saputri"
];

const salesNames = [
  "Ulian Faradiba", "Adit Nugraha", "Siska Pramesti", "Rendy Saputra",
  "Dewi Kartika", "Bagus Pratomo", "Yudha Saputra", "Nanda Putri"
];
function randomNIK() {
  let nik = "";
  for (let i = 0; i < 16; i++) {
    nik += Math.floor(Math.random() * 10);
  }
  return nik;
}

const customersDummy = Array.from({ length: 1000 }, (_, i) => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  const sales = salesNames[Math.floor(Math.random() * salesNames.length)];

  return {
    id: i + 1,
    name: `${first} ${last}`,
    nik: randomNIK(),
    sales: sales
  };
});

export default customersDummy;
