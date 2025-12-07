function randomNIK() {
  let nik = "";
  for (let i = 0; i < 16; i++) {
    nik += Math.floor(Math.random() * 10);
  }
  return nik;
}

const firstNames = [
  "Budi", "Siti", "Agus", "Dewi", "Rina", "Fauzan", "Citra", "Andi", "Galih", "Salsa",
  "Maya", "Putri", "Rizky", "Fajar", "Dian", "Oktaviani", "Daniel", "Bagus", "Nanda", "Farhan"
];

const lastNames = [
 "Saputra", "Rahmawati", "Kurniawan", "Pratama", "Wijaya", "Santoso",
 "Aulia", "Nugraha", "Lestari", "Mahendra", "Firmansyah", "Hidayat", "Ramadhan"
];

const rbkUsers = Array.from({ length: 1000 }, (_, index) => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    id: index + 1,
    name: `${first} ${last}`,
    nik: randomNIK(),
    callVerif: false,
    sdmVerif: false,
    dukcapilVerif: false,
    sentToLeader: false,
    sales: sessionStorage.getItem("username") || "Sales A",
  };
});

export default rbkUsers;
