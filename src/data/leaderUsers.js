const randomNIK = () =>
  (Math.floor(Math.random() * 9e15) + 1e15).toString();

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getSystemRecommendation = (score, history) => {
  if (score >= 750 && history === "Baik") return "Approve";
  if (score >= 600) return "Review";
  return "Reject";
};

const randomMetric = () => pick(["green", "yellow", "red"]);

const leaderUsers = Array.from({ length: 1000 }).map((_, i) => {
  const creditScore = Math.floor(Math.random() * 400 + 400);
  const creditHistory = pick(["Baik", "Cukup", "Kurang"]);
  const systemRecommendation = getSystemRecommendation(
    creditScore,
    creditHistory
  );

  return {
    id: i + 1,
    name: `Nasabah ${i + 1}`,
    nik: randomNIK(),
    assignedBy: pick(["RBK A", "RBK B", "RBK C"]),

    income: Math.floor(Math.random() * 12_000_000 + 4_000_000),
    job: pick(["Karyawan Swasta", "PNS", "Wirausaha", "Freelancer"]),
    workLength: Math.floor(Math.random() * 20 + 1),
    dependents: Math.floor(Math.random() * 4),
    creditHistory,
    outstandingLoan: Math.floor(Math.random() * 80_000_000 + 5_000_000),
    savingBalance: Math.floor(Math.random() * 40_000_000 + 2_000_000),
    creditScore,
    systemRecommendation,

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

    status: "Pending",
    rejectReason: "",

    progress: {
      salesInput: true,
      rbkVerif: false,
      leaderApprove: false,
      adcProcess: false,
    },

    timeline: {
      salesInputAt: new Date().toISOString(),
      rbkVerifAt: null,
      leaderApproveAt: null,
      adcCompletedAt: null,
    },
    notifications: [],
  };
});

export default leaderUsers;
