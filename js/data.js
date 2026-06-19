// ASA plan static data — edit schedule, exams, phases here
const STORAGE_KEY = "soa-asa-plan-v6";
    const TEMPLE_TOTAL_CREDITS = 30;

    const TEMPLE_COURSES = [
      { id:"tc-5001", name:"AS 5001 Actuarial Probability", credits:3, group:"Elective (1 of 2) · 2026 Fall", soa:"Exam P prep · UEC 아님" },
      { id:"tc-5101", name:"AS 5101 Theory of Interest", credits:3, group:"Core · 2026 Fall", soa:"FM UEC" },
      { id:"tc-5102", name:"AS 5102 Long-Term Actuarial Modeling", credits:3, group:"Core", soa:"FAM UEC" },
      { id:"tc-5104", name:"AS 5104 Short-Term Actuarial Modeling", credits:3, group:"Core · 2026 Fall", soa:"FAM UEC" },
      { id:"tc-5108", name:"AS 5108 Actuarial Analytics", credits:3, group:"Core", soa:"SRM UEC" },
      { id:"tc-rmi5051", name:"RMI 5051 Managing Risk", credits:3, group:"Core", soa:"—" },
      { id:"tc-ba5687", name:"BA 5687 MS Professional Development", credits:0, group:"Core (0 cr · 대부분 온라인)", soa:"0 cr" },
      { id:"tc-sel-rmi", name:"Selective: RMI 5101 or RMI 5104", credits:3, group:"Selective (1 of)", soa:"—" },
      { id:"tc-sel-1", name:"Selective: AS 5103 / 5114 / 5118 / 5190", credits:3, group:"Selective (1 of 2)", soa:"5114=ASTAM" },
      { id:"tc-sel-2", name:"Selective: AS 5103 / 5114 / 5118 / 5190", credits:3, group:"Selective (2 of 2)", soa:"—" },
      { id:"tc-hcm5101", name:"HCM 5101 Health Systems Organization", credits:3, group:"Elective (2 of 2) · 2026 Fall", soa:"Non-Fox elective" }
    ];

    // 2026 Fall 등록 시간표 (BA 5687 토요일 제외 — 학기 3회 중 1회만 대면)
    const DEFAULT_FALL_2026_SCHEDULE = [
      { name:"AS 5101 Theory of Interest", day:1, start:"09:30", end:"10:50", location:"", semester:"2026 Fall" },
      { name:"AS 5101 Theory of Interest", day:3, start:"09:30", end:"10:50", location:"", semester:"2026 Fall" },
      { name:"AS 5001 Actuarial Probability", day:1, start:"11:00", end:"12:20", location:"", semester:"2026 Fall" },
      { name:"AS 5001 Actuarial Probability", day:3, start:"11:00", end:"12:20", location:"", semester:"2026 Fall" },
      { name:"AS 5104 Short-Term Modeling", day:2, start:"09:30", end:"10:50", location:"", semester:"2026 Fall" },
      { name:"AS 5104 Short-Term Modeling", day:4, start:"09:30", end:"10:50", location:"", semester:"2026 Fall" },
      { name:"HCM 5101 Health Systems", day:3, start:"18:00", end:"20:30", location:"온라인", semester:"2026 Fall" }
    ];
    const CIRC = 2 * Math.PI * 30;
    const JOURNEY_START = "2026-01-01";
    const JOURNEY_END = "2028-03-01";

    const PHASES = [
      { id:"pre", name:"입학 전", period:"지금 ~ 2026년 6월", start:"2025-01-01", end:"2026-06-30", tasks:[
        { id:"fm-jun20", text:"6/20 Exam FM 응시", meta:"최우선 · Path C 시작", highlight:true },
        { id:"fm-retake", text:"떨어지면 8월 재응시", meta:"Plan B" }
      ]},
      { id:"summer26", name:"2026 여름", period:"2026년 7월 ~ 8월", start:"2026-07-01", end:"2026-08-31", tasks:[
        { id:"vee-econ", text:"VEE Economics 완료", meta:"온라인 · 이번 여름", highlight:true },
        { id:"vee-acct", text:"VEE Accounting & Finance 완료", meta:"온라인 · 이번 여름", highlight:true },
        { id:"prep-p", text:"Exam P 9월 대비 본격 공부", meta:"9월 시험", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 지원 준비", meta:"8/24 입학 전" }
      ]},
      { id:"sem1", name:"1학기 (Fall Y1 · Path C)", period:"2026년 8/24 ~ 12/15", start:"2026-08-24", end:"2026-12-15", tasks:[
        { id:"as-5001", text:"AS 5001 Actuarial Probability", meta:"Elective · P prep (UEC 아님)", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 바로 지원", meta:"입학 즉시" },
        { id:"vee-stats-check", text:"VEE Math Statistics — Purdue 학점 Temple 면제 확인", meta:"입학 직후!", highlight:true },
        { id:"exam-p", text:"9월 Exam P 응시 합격", meta:"시험", highlight:true },
        { id:"intern-fall", text:"가을 계리사 인턴 지원", meta:"커리어" },
        { id:"paf", text:"PAF Module", meta:"모듈" }
      ]},
      { id:"winter", name:"겨울방학", period:"2026년 12/16 ~ 2027년 1/10", start:"2026-12-16", end:"2027-01-10", tasks:[
        { id:"intern-confirm", text:"인턴 확정", meta:"커리어" },
        { id:"fap-12", text:"FAP Module 1 & 2", meta:"FAP" },
        { id:"winter-rest", text:"휴식", meta:"컨디션" }
      ]},
      { id:"sem2", name:"2학기 (Spring Y1 · Path C)", period:"2027년 1/11 ~ 5/4", start:"2027-01-11", end:"2027-05-04", tasks:[
        { id:"as-5101", text:"AS 5101 Theory of Interest", meta:"Path C Spring Y1" },
        { id:"as-5104", text:"AS 5104 Short-Term Modeling", meta:"Path C · FAM 일부" },
        { id:"as-5102-5104", text:"AS 5102 추가 → FAM UEC 완성", meta:"Advisor와 일정 확인", highlight:true },
        { id:"as-5108", text:"AS 5108 → SRM UEC", meta:"Fall Y2 또는 조기", highlight:true },
        { id:"cpt-pt", text:"CPT 파트타임 인턴", meta:"커리어" },
        { id:"asf", text:"ASF Module", meta:"모듈" },
        { id:"fap-34", text:"FAP Module 3 & 4", meta:"FAP" }
      ]},
      { id:"summer", name:"여름방학", period:"2027년 6월 ~ 8월", start:"2027-06-01", end:"2027-08-31", tasks:[
        { id:"cpt-ft", text:"CPT 풀타임 인턴", meta:"커리어", highlight:true },
        { id:"fap-5", text:"FAP Module 5", meta:"FAP" },
        { id:"atpa", text:"ATPA Assessment", meta:"Assessment" }
      ]},
      { id:"sem3", name:"3학기", period:"2027년 8월 ~ 12월", start:"2027-08-01", end:"2027-12-31", tasks:[
        { id:"as-5114", text:"AS 5114 → ASTAM UEC", meta:"UEC" },
        { id:"exam-pa", text:"10월 Exam PA 합격", meta:"SRM 기반", highlight:true },
        { id:"fap-final", text:"FAP 최종 평가", meta:"FAP" },
        { id:"graduate", text:"졸업", meta:"2027.12" }
      ]},
      { id:"post", name:"졸업 직후", period:"2028년 초", start:"2028-01-01", end:"2028-12-31", tasks:[
        { id:"apc", text:"APC 참석", meta:"마지막" },
        { id:"asa", text:"ASA 완성", meta:"목표", highlight:true }
      ]}
    ];

    const REQUIREMENTS = [
      { id:"fm-jun20", cat:"exam", name:"Exam FM", method:"6/20 응시 → 불합격 시 8월 재응시", when:"지금", order:0 },
      { id:"exam-p", cat:"exam", name:"Exam P", method:"9월 응시", when:"1학기", order:4 },
      { id:"exam-pa", cat:"exam", name:"Exam PA", method:"10월 (SRM 기반)", when:"3학기", order:11 },
      { id:"vee-stats-check", cat:"vee", name:"VEE Math Statistics", method:"Purdue 학점 Temple 면제 확인", when:"1학기", order:1 },
      { id:"vee-econ", cat:"vee", name:"VEE Economics", method:"2026 여름 온라인", when:"2026 여름", order:2 },
      { id:"vee-acct", cat:"vee", name:"VEE Accounting & Finance", method:"2026 여름 온라인", when:"2026 여름", order:3 },
      { id:"as-5102-5104", cat:"uec", name:"Exam FAM", method:"AS 5102 & 5104 UEC", when:"2학기", order:7 },
      { id:"as-5108", cat:"uec", name:"Exam SRM", method:"AS 5108 UEC", when:"2학기", order:6 },
      { id:"as-5114", cat:"uec", name:"Exam ASTAM", method:"AS 5114 UEC", when:"3학기", order:10 },
      { id:"paf", cat:"module", name:"PAF Module", method:"e-Learning", when:"1학기", order:5 },
      { id:"asf", cat:"module", name:"ASF Module", method:"e-Learning", when:"2학기", order:8 },
      { id:"fap-12", cat:"module", name:"FAP 1-2", method:"e-Learning", when:"겨울", order:12 },
      { id:"fap-34", cat:"module", name:"FAP 3-4", method:"e-Learning", when:"2학기", order:13 },
      { id:"fap-5", cat:"module", name:"FAP 5", method:"e-Learning", when:"여름", order:14 },
      { id:"fap-final", cat:"module", name:"FAP 최종 평가", method:"e-Learning", when:"3학기", order:15 },
      { id:"atpa", cat:"module", name:"ATPA Assessment", method:"SOA", when:"여름", order:9 },
      { id:"apc", cat:"module", name:"APC", method:"Professionalism", when:"졸업 후", order:16 },
      { id:"oncampus-job", cat:"career", name:"온캠퍼스 잡", method:"입학 즉시 지원", when:"1학기", order:20 },
      { id:"intern-fall", cat:"career", name:"가을 인턴 지원", method:"계리사 인턴 채용", when:"1학기", order:21 },
      { id:"intern-confirm", cat:"career", name:"인턴 확정", method:"겨울방학 전", when:"겨울", order:22 },
      { id:"cpt-pt", cat:"career", name:"CPT 파트타임", method:"2학기 인턴", when:"2학기", order:23 },
      { id:"cpt-ft", cat:"career", name:"CPT 풀타임", method:"여름 인턴", when:"여름", order:24 },
      { id:"graduate", cat:"career", name:"졸업", method:"Temple MS 완료", when:"2027.12", order:25 },
      { id:"asa", cat:"career", name:"ASA 완성", method:"모든 요건 + APC", when:"2028", order:26 },
      { id:"soa-join", cat:"admin", name:"SOA Candidate 등록", method:"soa.org 가입", when:"FM 전후", order:30 },
      { id:"fm-register", cat:"admin", name:"FM 시험 등록", method:"SOA registration deadline 확인", when:"지금", order:31 },
      { id:"fm-transcript", cat:"admin", name:"FM 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:32 },
      { id:"p-transcript", cat:"admin", name:"P 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:33 },
      { id:"vee-submit", cat:"admin", name:"VEE 학점 SOA 제출", method:"VEE 3개 완료 후 각각", when:"완료 시", order:34 },
      { id:"uec-grade", cat:"admin", name:"UEC 성적 요건 확인", method:"Temple AS과목 B 이상 등", when:"수강 전", order:35 },
      { id:"cpt-paperwork", cat:"admin", name:"CPT 서류", method:"국제학생실 + 고용주", when:"인턴 전", order:36 },
      { id:"pa-transcript", cat:"admin", name:"PA 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:37 }
    ];

    const DDAYS = [
      { date:"2026-06-20", label:"Exam FM", taskId:"fm-jun20" },
      { date:"2026-08-24", label:"Temple 입학", taskId:"oncampus-job" },
      { date:"2026-09-15", label:"Exam P", taskId:"exam-p" },
      { date:"2027-06-01", label:"CPT FT", taskId:"cpt-ft" },
      { date:"2027-10-15", label:"Exam PA", taskId:"exam-pa" },
      { date:"2027-12-15", label:"졸업", taskId:"graduate" },
      { date:"2028-03-01", label:"ASA", taskId:"asa" }
    ];

    const MILESTONES = DDAYS;
    const CAT_CLS = { exam:"cat-exam", vee:"cat-vee", module:"cat-module", uec:"cat-uec", career:"cat-career", admin:"cat-admin" };
    const EXAM_IDS = ["fm-jun20","exam-p","exam-pa"];
    const VEE_IDS = ["vee-stats-check","vee-econ","vee-acct"];
    const MOD_IDS = ["paf","asf","fap-12","fap-34","fap-5","fap-final","atpa","apc"];
    const UEC_IDS = ["as-5102-5104","as-5108","as-5114"];
    const CAREER_IDS = ["oncampus-job","intern-fall","intern-confirm","cpt-pt","cpt-ft","graduate","asa"];
    const ADMIN_IDS = ["soa-join","fm-register","fm-transcript","p-transcript","vee-submit","uec-grade","cpt-paperwork","pa-transcript"];
    const ASA_IDS = [...EXAM_IDS, ...VEE_IDS, ...UEC_IDS, ...MOD_IDS];

    const DAY_NAMES = ["일","월","화","수","목","금","토"];
    const DAY_ORDER = [1,2,3,4,5,6,0];
    const SOA_FEES = {
      source: "SOA 공식 · 2025.12.16",
      sourceUrl: "https://www.soa.org/education/exam-req/syllabus-study-materials/exam-and-module-fees/",
      exams: [
        { name: "Exam FM", fee: 275 },
        { name: "Exam P", fee: 275 },
        { name: "Exam PA", fee: 1234 }
      ],
      vee: [
        { name: "VEE Economics", fee: 92 },
        { name: "VEE Accounting & Finance", fee: 92 },
        { name: "VEE Math Statistics", fee: 92, optional: "Purdue 면제 가능" }
      ],
      modules: [
        { name: "PAF Module", fee: 224 },
        { name: "ASF Module", fee: 224 },
        { name: "FAP Modules + EMAs", fee: 551 },
        { name: "FAP Final Assessment", fee: 1316 },
        { name: "ATPA Assessment", fee: 1255 },
        { name: "APC (Virtual)", fee: 658 }
      ],
      uecNote: "FAM·SRM·ASTAM → Temple UEC (SOA 시험비 $0)"
    };

    const STUDY_PROVIDERS = [
      {
        name: "Coaching Actuaries (CA)",
        url: "https://www.coachingactuaries.com/",
        fmUrl: "https://www.coachingactuaries.com/exam-fm/pricing",
        pUrl: "https://www.coachingactuaries.com/exam-p/pricing",
        veeUrl: "https://www.coachingactuaries.com/vee",
        exams: "FM · P · PA · VEE",
        pricing: "Adapt $195 · Learn Complete + Practice $618 (180일, Pass Guarantee)",
        note: "Temple 학생/졸업 18개월 이내 최대 65% 할인"
      },
      {
        name: "The Infinite Actuary (TIA)",
        url: "https://www.theinfiniteactuary.com/",
        exams: "FM · P (무료) · PA",
        pricing: "P·FM 전체 코스 **무료** (영상·문제·formula sheet)",
        note: "PA·상위 시험은 유료 · ASM Manual 연동"
      },
      {
        name: "ACTEX",
        url: "https://www.actexlearning.com/",
        exams: "FM · P · VEE · Manual",
        pricing: "Manual $140–230 · VEE online",
        note: "SOA 승인 VEE · ASM sister brand"
      },
      {
        name: "ASM (Actuarial Study Materials)",
        url: "https://www.studymanuals.com/",
        exams: "FM · P · PA",
        pricing: "Study manual 전자/纸质",
        note: "TIA와 함께 쓰는 경우 많음"
      },
      {
        name: "Mahler",
        url: "https://www.theinfiniteactuary.com/mahler/",
        exams: "PA · upper exams",
        pricing: "PA 등 고급 시험 특화",
        note: "PA 전 Mahler + CA Adapt 조합 흔함"
      }
    ];

    const STUDY_RECOMMENDATIONS = [
      {
        when: "지금 · Exam FM (6/20)",
        tier: "best", tierLabel: "1순위",
        pick: "TIA FM (무료) + CA Adapt",
        cost: "~$245",
        costDetail: "Adapt $195 + BA II Plus ~$50",
        plan: "① TIA 영상으로 syllabus 전체 ② Adapt earned level 6+ 목표 ③ 계산기(BG/N/CLR 등) 매일 30분",
        links: [
          { text: "TIA FM", url: "https://www.theinfiniteactuary.com/exam-fm/" },
          { text: "CA Adapt FM", url: "https://www.coachingactuaries.com/exam-fm/pricing" }
        ],
        alt: "올인원: CA Learn+Practice — 학생 할인 ~$216 (영상+Adapt+Pass Guarantee)"
      },
      {
        when: "지금 · Exam FM",
        tier: "free", tierLabel: "무료만",
        pick: "TIA FM + SOA 공식 sample questions",
        cost: "$0",
        costDetail: "SOA sample: Candidate Central",
        plan: "예산 최소화 시 TIA만으로도 충분. 다만 Adapt 없으면 시험형 연습량 직접 확보 필요",
        links: [
          { text: "TIA FM", url: "https://www.theinfiniteactuary.com/exam-fm/" },
          { text: "SOA FM sample", url: "https://www.soa.org/education/exam-req/edu-exam-fm-detail/" }
        ],
        alt: null
      },
      {
        when: "2026 여름 · VEE 2개",
        tier: "best", tierLabel: "1순위",
        pick: "Coaching Actuaries VEE (Econ + Acct/Fin)",
        cost: "~$130–200",
        costDetail: "학생 65% off · SOA 제출 $92×2 별도",
        plan: "7–8월 Econ·Acct 병행 · 하루 2–3h · 완료 후 Candidate Central VEE 제출",
        links: [
          { text: "CA VEE", url: "https://www.coachingactuaries.com/vee" },
          { text: "ACTEX VEE", url: "https://www.actexlearning.com/search?q=VEE" }
        ],
        alt: "ACTEX VEE — CA와 비슷한 가격대, 승인 과정 동일"
      },
      {
        when: "여름~Fall · Exam P (9월)",
        tier: "best", tierLabel: "1순위",
        pick: "TIA P (무료) + CA Adapt + AS 5001",
        cost: "~$195",
        costDetail: "Adapt only · 5001은 tuition 포함",
        plan: "① 7월부터 TIA P 본격 ② Adapt EL 6+ ③ Fall AS 5001 수업으로 복습 · 350h 목표",
        links: [
          { text: "TIA P", url: "https://www.theinfiniteactuary.com/exam-p/" },
          { text: "CA Adapt P", url: "https://www.coachingactuaries.com/exam-p/pricing" }
        ],
        alt: "CA Learn+Practice P — 학생 ~$216, 여름에 FM·P Adapt 번들 검토"
      },
      {
        when: "Fall 2026 · Temple",
        tier: "budget", tierLabel: "수업=자료",
        pick: "AS 5101 / 5001 / 5104 교재 + office hour",
        cost: "$0 추가",
        costDetail: "학위 tuition에 포함",
        plan: "5101→FM UEC · 5001→P 보조 · 5104→FAM UEC 일부. Canvas·교수 office hour 적극 활용",
        links: [
          { text: "Temple Canvas", url: "https://canvas.temple.edu/" }
        ],
        alt: "UEC 과목 B- 이상 필수 — 시험 대신 성적이 SOA 요건"
      },
      {
        when: "2027 · Exam PA",
        tier: "later", tierLabel: "나중",
        pick: "AS 5108(SRM) 수업 + CA PA + Mahler",
        cost: "~$500+",
        costDetail: "SRM UEC 먼저 · PA는 5108 후",
        plan: "5108에서 R/Python·predictive modeling 기반 쌓기 → SOA PA sample projects → Adapt/Mahler",
        links: [
          { text: "CA PA", url: "https://www.coachingactuaries.com/exam-pa/pricing" },
          { text: "Mahler PA", url: "https://www.theinfiniteactuary.com/mahler/" },
          { text: "SOA PA", url: "https://www.soa.org/education/exam-req/edu-exam-pa-detail/" }
        ],
        alt: "P→PA 직행 비추 — SRM(5108) 먼저가 Temple·SOA 플랜"
      },
      {
        when: "학기별 · 모듈",
        tier: "later", tierLabel: "SOA",
        pick: "PAF → ASF → FAP (SOA e-Learning)",
        cost: "SOA 요금 포함",
        costDetail: "별도 교재 거의 없음",
        plan: "Fall Y1 PAF · Spring ASF · 겨울~여름 FAP 1–5 · ATPA · APC. Candidate Central에서 enrollment",
        links: [
          { text: "SOA FAP", url: "https://www.soa.org/education/general-info/fap/" },
          { text: "Candidate Central", url: "https://candidate.soa.org/" }
        ],
        alt: null
      }
    ];

    function getBudgetTotal() {
      const all = [...SOA_FEES.exams, ...SOA_FEES.vee, ...SOA_FEES.modules];
      return all.reduce((s, x) => s + x.fee, 0);
    }

    const EXAM_DEADLINES = [
      { exam:"Exam FM", examDate:"2026-06-20", regDeadline:"2026-04-15", note:"6/20 응시 · 등록 마감 SOA 확인" },
      { exam:"Exam FM (재응시)", examDate:"2026-08-15", regDeadline:"2026-06-15", note:"불합격 시 Plan B" },
      { exam:"Exam P", examDate:"2026-09-15", regDeadline:"2026-07-15", note:"9월 window · 여름 VEE 병행" },
      { exam:"Exam PA", examDate:"2027-10-15", regDeadline:"2027-08-15", note:"AS 5108(SRM) 후" }
    ];

    const CONTACTS = [
      { role:"Actuarial Academic Director", name:"Dr. Tianxiang Shi", email:"tshi@temple.edu" },
      { role:"Fox MS Programs", email:"FoxMS@temple.edu", note:"Path·VEE·UEC 문의" },
      { role:"SOA Candidate Central", url:"https://candidate.soa.org/", note:"transcript·VEE·모듈" },
      { role:"Temple ISSS", url:"https://educationabroad.temple.edu/isss", note:"CPT·OPT·SSN" },
      { role:"Temple Careers", url:"https://careers.temple.edu/", note:"온캠·인턴" }
    ];

    const STUDY_HOURS = [
      { exam:"Exam FM", min:200, max:300, typical:250, plan:"6/20 응시", tips:"TIA FM(무료)→CA Adapt. BA II Plus 필수. EL 6+ 목표." },
      { exam:"Exam P", min:300, max:400, typical:350, plan:"9월 · 여름 시작", tips:"TIA P + Adapt $195. AS 5001(Fall) 병행." },
      { exam:"Exam PA", min:400, max:600, typical:500, plan:"5108(SRM) 후", tips:"CA PA + Mahler. R/Python는 5108에서." },
      { exam:"UEC (FAM/SRM/ASTAM)", min:0, max:0, typical:0, plan:"Temple 수업", tips:"별도 SOA 시험 없음. 수업 성적(B- 이상 등) 요건 확인." },
      { exam:"PAF / ASF / FAP", min:20, max:40, typical:30, plan:"학기별 e-Learning", tips:"모듈당 대략 20~40시간. deadline 미리 확인." }
    ];

const CAREER_COLUMNS = [
  { id:"target", label:"타겟" },
  { id:"applied", label:"지원" },
  { id:"interview", label:"인터뷰" },
  { id:"offer", label:"오퍼" },
  { id:"networking", label:"네트워킹" }
];
const CAREER_CLOSED_STATUSES = ["rejected", "withdrawn"];
const CAREER_TYPE_LABELS = { job:"온캠/PT", intern:"인턴", networking:"네트워킹" };
const CAREER_ADVANCE = { target:"applied", applied:"interview", interview:"offer", networking:"applied" };

const DEFAULT_FLASH_DECKS = [
  {
    id: "deck-fm",
    name: "Exam FM",
    cards: [
      { id:"fm-01", front:"Effective annual rate (EAR)", back:"(1 + i/m)^m − 1 · nominal i, m compounding periods/year" },
      { id:"fm-02", front:"Annuity-immediate vs annuity-due", back:"Immediate: payments end of period · Due: start · a_n| = ä_n| × v" },
      { id:"fm-03", front:"BA II Plus: BG (P/Y, C/Y)", back:"P/Y = payments/year · C/Y = compounding/year · BG sets both at once" },
      { id:"fm-04", front:"Macaulay duration", back:"Weighted avg time to cash flows · price sensitivity measure · D = Σ t·PV(CF_t) / Price" },
      { id:"fm-05", front:"Modified duration & convexity", back:"Mod duration ≈ −(1/P)(dP/di) · Convexity captures curvature · ΔP ≈ −ModDur·Δi + ½·Convex·(Δi)²" },
      { id:"fm-06", front:"Redington immunization (3 conditions)", back:"PV assets = PV liabilities · Duration match · Assets convexity > liabilities convexity" },
      { id:"fm-07", front:"Spot rate s_n", back:"Yield on zero-coupon bond maturing at n · used to discount single payment at n" },
      { id:"fm-08", front:"Forward rate f(m,n)", back:"(1+s_{m+n})^{m+n} / (1+s_m)^m = (1+f)^{n} (concept) · lock in future borrowing/lending" },
      { id:"fm-09", front:"Callable bond — price behavior", back:"Price capped by call schedule · OAS < Z-spread · investor short call option" },
      { id:"fm-10", front:"Sinking fund payment", back:"Extra deposits so fund reaches redemption value · often improves issuer credit" },
      { id:"fm-11", front:"Nominal APR → effective annual", back:"EAR = (1 + APR/m)^m − 1 · APR alone is not the true yearly rate" },
      { id:"fm-12", front:"Continuous compounding δ", back:"Accumulation e^{δt} · force of interest δ = ln(1+i) · PV = FV·e^{−δt}" },
      { id:"fm-13", front:"Put-call parity (European)", back:"C − P = S − K·v · same strike K, expiry · arbitrage if violated" },
      { id:"fm-14", front:"Loan: outstanding balance after k payments", back:"OB_k = payment × a_{n−k|} · amortization: early payments mostly interest" },
      { id:"fm-15", front:"Duration-matching quick check", back:"Single liability at time m → match with zero or coupon bond portfolio · duration ≈ m" }
    ]
  },
  {
    id: "deck-p",
    name: "Exam P",
    cards: [
      { id:"p-01", front:"Conditional probability", back:"P(A|B) = P(A∩B) / P(B) · P(B) > 0" },
      { id:"p-02", front:"Bayes' theorem", back:"P(A|B) = P(B|A)P(A) / P(B) · update prior with evidence" },
      { id:"p-03", front:"Law of total probability", back:"P(A) = Σ P(A|B_i)P(B_i) · partition B_i" },
      { id:"p-04", front:"E[aX + b]", back:"a·E[X] + b · linearity of expectation" },
      { id:"p-05", front:"Var(X)", back:"E[X²] − (E[X])² · Var(aX+b) = a²Var(X)" },
      { id:"p-06", front:"Binomial(n,p)", back:"P(X=k) = C(n,k) p^k (1−p)^{n−k} · E=np · Var=np(1−p)" },
      { id:"p-07", front:"Poisson(λ)", back:"P(X=k) = e^{−λ} λ^k / k! · E=Var=λ · counts rare events" },
      { id:"p-08", front:"Exponential(λ) — memoryless", back:"P(X>s+t | X>s) = P(X>t) · E=1/λ · waiting time until event" },
      { id:"p-09", front:"Normal: standardize Z", back:"Z = (X−μ)/σ ~ N(0,1) · use Φ table · linear combo of normals is normal" },
      { id:"p-10", front:"Central Limit Theorem (idea)", back:"Sum/mean of iid (finite variance) → approx Normal for large n" },
      { id:"p-11", front:"Cov(X,Y)", back:"E[XY] − E[X]E[Y] · Var(X+Y) = Var(X)+Var(Y)+2Cov if dependent add 2Cov" },
      { id:"p-12", front:"MLE (idea)", back:"Choose parameter θ maximizing L(θ|data) or log-likelihood · asymptotically efficient" },
      { id:"p-13", front:"Min of two exponentials", back:"If X,Y iid Exp(λ), P(X<Y) = λ_X/(λ_X+λ_Y) · competition of independent events" },
      { id:"p-14", front:"Uniform(0,a) order stats", back:"f_{X_(1)}(x) = n(1−x/a)^{n−1}/a · min/max formulas on exam" },
      { id:"p-15", front:"Survival function S(x)", back:"S(x) = 1 − F(x) = P(X>x) · hazard h(x) = f(x)/S(x)" }
    ]
  }
];
