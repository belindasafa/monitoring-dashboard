// ============================
// GENERATOR DATA RANDOM
// ============================

const randomNIK = () =>
  (Math.floor(Math.random() * 9e15) + 1e15).toString();

// RANDOM UTILITY
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// HITUNG REKOMENDASI SISTEM
const getSystemRecommendation = (score, history) => {
  if (score >= 750 && history === "Baik") return "Approve";
  if (score >= 600) return "Review";
  return "Reject";
};

// RANDOM METRIC (green = bagus, yellow = cukup, red = buruk)
const randomMetric = () => pick(["green", "yellow", "red"]);


// ============================
//  BUAT 1000 DATA DUMMY
// ============================

const leaderUsers = Array.from({ length: 1000 }).map((_, i) => {
  const creditScore = Math.floor(Math.random() * 400 + 400); // 400–800
  const creditHistory = pick(["Baik", "Cukup", "Kurang"]);
  const systemRecommendation = getSystemRecommendation(creditScore, creditHistory);

  return {
    id: i + 1,
    name: `Nasabah ${i + 1}`,
    nik: randomNIK(),

    assignedBy: pick(["RBK A", "RBK B", "RBK C"]),

    // ======================= DATA DETAIL KREDIT =======================
    income: Math.floor(Math.random() * 12_000_000 + 4_000_000), // gaji 4–16 juta
    job: pick(["Karyawan Swasta", "PNS", "Wirausaha", "Freelancer"]),
    workLength: Math.floor(Math.random() * 20 + 1), // lama kerja 1–20 tahun
    dependents: Math.floor(Math.random() * 4), // 0–3 tanggungan
    creditHistory, // Baik / Cukup / Kurang
    outstandingLoan: Math.floor(Math.random() * 80_000_000 + 5_000_000), // 5–85 juta
    savingBalance: Math.floor(Math.random() * 40_000_000 + 2_000_000), // 2–42 juta
    creditScore, // 400–800 internal score
    systemRecommendation,

    // ======================= KATEGORI METRICS =======================
    metrics: {
      tabAll: randomMetric(),
      giroAll: randomMetric(),
      depoAll: randomMetric(),
      flexi: randomMetric(),
      griya: randomMetric(),
      praNplP: randomMetric(),
      praNplK: randomMetric(),
      newCIF: randomMetric(),
      casa: randomMetric(),
    },

    // ======================= STATUS APPROVAL =======================
    status: "Pending",
    rejectReason: "",
  };
});

export default leaderUsers;
