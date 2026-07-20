// ASA plan static data — edit schedule, exams, phases here
const STORAGE_KEY = "soa-asa-plan-v6";
    const TEMPLE_TOTAL_CREDITS = 30;

    const TEMPLE_COURSES = [
      { id:"tc-5101", name:"AS 5101 Theory of Interest", credits:3, group:"Core · 2026 Fall", soa:"FM UEC" },
      { id:"tc-5102", name:"AS 5102 Long-Term Actuarial Modeling", credits:3, group:"Core", soa:"FAM UEC" },
      { id:"tc-5104", name:"AS 5104 Short-Term Actuarial Modeling", credits:3, group:"Core · 2026 Fall", soa:"FAM UEC" },
      { id:"tc-5108", name:"AS 5108 Actuarial Analytics", credits:3, group:"Core", soa:"SRM UEC" },
      { id:"tc-rmi5051", name:"RMI 5051 Managing Risk", credits:3, group:"Core", soa:"—" },
      { id:"tc-ba5687", name:"BA 5687 MS Professional Development", credits:0, group:"Core (0 cr · 토 3회: 10/3·10/24·11/7)", soa:"0 cr" },
      { id:"tc-rmi5104", name:"RMI 5104 Property & Liability", credits:3, group:"Selective (1/3) · 2026 Fall", soa:"—" },
      { id:"tc-sel-1", name:"Selective: AS 5103 / 5114 / 5118 / 5190", credits:3, group:"Selective (2/3)", soa:"5114=ASTAM" },
      { id:"tc-sel-2", name:"Selective: AS 5103 / 5114 / 5118 / 5190", credits:3, group:"Selective (3/3)", soa:"—" },
      { id:"tc-hcm5101", name:"HCM 5101 Health Systems Organization", credits:3, group:"Elective (1/2) · 3 cr · 2026 Fall", soa:"Non-Fox elective" },
      { id:"tc-elec-2", name:"Elective (추가 1과목)", credits:3, group:"Elective (2/2) · 3 cr", soa:"—" }
    ];

    // 2026 Fall 시간표 · BA 5687은 토요 3회 (10/3 대면, 10/24·11/7 온라인)
    // RMI 5104 월수 11:00–12:15 온라인
    const DEFAULT_FALL_2026_SCHEDULE = [
      { name:"AS 5101 Theory of Interest", day:1, start:"09:30", end:"10:50", location:"Alter Hall 0A237", semester:"2026 Fall" },
      { name:"AS 5101 Theory of Interest", day:3, start:"09:30", end:"10:50", location:"Alter Hall 0A237", semester:"2026 Fall" },
      { name:"RMI 5104 Property & Liability", day:1, start:"11:00", end:"12:15", location:"온라인", semester:"2026 Fall" },
      { name:"RMI 5104 Property & Liability", day:3, start:"11:00", end:"12:15", location:"온라인", semester:"2026 Fall" },
      { name:"AS 5104 Short-Term Modeling", day:2, start:"09:30", end:"10:50", location:"Speakman Hall 00213", semester:"2026 Fall" },
      { name:"AS 5104 Short-Term Modeling", day:4, start:"09:30", end:"10:50", location:"Speakman Hall 00213", semester:"2026 Fall" },
      { name:"HCM 5101 Health Systems", day:3, start:"18:00", end:"20:30", location:"온라인", semester:"2026 Fall" },
      { name:"BA 5687 Professional Dev", day:6, start:"—", end:"—", location:"10/3만 Alter Hall 0A231 · 10/24·11/7 온라인", note:"10/3 · 10/24 · 11/7", semester:"2026 Fall" }
    ];
    const FALL_2026_SCHEDULE_VERSION = 4;
    const CIRC = 2 * Math.PI * 30;
    const JOURNEY_START = "2026-01-01";
    const JOURNEY_END = "2028-06-01";

    const PHASES = [
      { id:"pre", name:"입학 전 · 2026 여름", period:"~2026년 8월", start:"2025-01-01", end:"2026-08-23", tasks:[
        { id:"prep-p", text:"Exam P 대비 본격 공부", meta:"지금부터 · 350h", highlight:true },
        { id:"sas-cert", text:"SAS Base 시험 8/1", meta:"Base Programming", highlight:true },
        { id:"vee-macro", text:"VEE Macroeconomics ✓", meta:"Economics VEE · 이미 완료" },
        { id:"vee-econ", text:"VEE Microeconomics — CLEP", meta:"Modern States 무료 · 목표 8/10", highlight:true },
        { id:"vee-acct", text:"VEE Accounting & Finance 완료", meta:"온라인", highlight:true },
        { id:"exam-p", text:"Exam P 9/20 응시", meta:"등록 8/12 12AM", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 지원 준비", meta:"8/24 입학 전" }
      ]},
      { id:"sem1", name:"1학기 (Fall Y1)", period:"2026년 8/24 ~ 12/15", start:"2026-08-24", end:"2026-12-15", tasks:[
        { id:"as-5101", text:"AS 5101 → FM UEC", meta:"시험 대신 수업 · B- 이상", highlight:true },
        { id:"rmi-5104", text:"RMI 5104 Property & Liability", meta:"Selective · 월수 온라인", highlight:true },
        { id:"shi-research", text:"Dr. Shi 리서치 프로젝트", meta:"학기 시작 직후", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 바로 지원", meta:"입학 즉시" },
        { id:"vee-stats-check", text:"VEE Math Statistics — Purdue 학점 Temple 면제 확인", meta:"입학 직후!", highlight:true },
        { id:"intern-fall", text:"가을 계리사 인턴 지원", meta:"커리어" },
        { id:"paf", text:"PAF Module", meta:"모듈" }
      ]},
      { id:"winter", name:"겨울방학", period:"2026년 12/16 ~ 2027년 1/10", start:"2026-12-16", end:"2027-01-10", tasks:[
        { id:"intern-confirm", text:"인턴 확정", meta:"커리어" },
        { id:"fap-12", text:"FAP Module 1 & 2", meta:"FAP" },
        { id:"winter-rest", text:"휴식", meta:"컨디션" }
      ]},
      { id:"sem2", name:"2학기 (Spring Y1)", period:"2027년 1/11 ~ 5/4", start:"2027-01-11", end:"2027-05-04", tasks:[
        { id:"as-5104", text:"AS 5104 Short-Term Modeling", meta:"FAM UEC 일부" },
        { id:"as-5102-5104", text:"AS 5102 추가 → FAM UEC 완성", meta:"Advisor와 일정 확인", highlight:true },
        { id:"cpt-pt", text:"CPT 파트타임 인턴", meta:"커리어" },
        { id:"asf", text:"ASF Module", meta:"모듈" },
        { id:"fap-34", text:"FAP Module 3 & 4", meta:"FAP" }
      ]},
      { id:"summer", name:"여름방학", period:"2027년 6월 ~ 8월", start:"2027-06-01", end:"2027-08-31", tasks:[
        { id:"cpt-ft", text:"CPT 풀타임 인턴", meta:"커리어", highlight:true },
        { id:"fap-5", text:"FAP Module 5", meta:"FAP" },
        { id:"atpa", text:"ATPA Assessment", meta:"Assessment" }
      ]},
      { id:"sem3", name:"3학기 (Fall Y2)", period:"2027년 8/24 ~ 12/15", start:"2027-08-24", end:"2027-12-15", tasks:[
        { id:"as-5108", text:"AS 5108 → SRM UEC", meta:"PA 기반 · Fall Y2", highlight:true },
        { id:"prep-pa", text:"Exam PA 준비 (5108 병행)", meta:"가을 · ~500h", highlight:true },
        { id:"exam-pa", text:"10월 Exam PA 합격", meta:"등록 ~9/7 (SOA 확인)", highlight:true },
        { id:"as-5114", text:"AS 5114 → ASTAM UEC", meta:"UEC" },
        { id:"fap-final", text:"FAP 최종 평가", meta:"FAP" },
        { id:"graduate", text:"Temple MS 졸업", meta:"2027.12", highlight:true }
      ]},
      { id:"post", name:"졸업 후 · ASA 마무리", period:"2028년 1월 ~ 6월", start:"2028-01-01", end:"2028-06-30", tasks:[
        { id:"apc", text:"APC 참석", meta:"마지막" },
        { id:"asa", text:"ASA 완성", meta:"목표", highlight:true }
      ]}
    ];

    const REQUIREMENTS = [
      { id:"as-5101", cat:"uec", name:"Exam FM", method:"AS 5101 UEC · SOA FM 시험 안 봄", when:"Fall Y1", order:0 },
      { id:"exam-p", cat:"exam", name:"Exam P", method:"9/20 응시 (등록 8/12)", when:"2026 여름", order:4 },
      { id:"exam-pa", cat:"exam", name:"Exam PA", method:"2027년 10월 (5108 Fall Y2 · 졸업 전)", when:"Fall Y2", order:11 },
      { id:"sas-cert", cat:"career", name:"SAS Base Certification", method:"8/1 응시", when:"2026 여름", order:19 },
      { id:"vee-stats-check", cat:"vee", name:"VEE Math Statistics", method:"Purdue 학점 Temple 면제 확인", when:"1학기", order:1 },
      { id:"vee-macro", cat:"vee", name:"VEE Macroeconomics", method:"이미 수강 완료 (Economics VEE 1/2)", when:"완료", order:2 },
      { id:"vee-econ", cat:"vee", name:"VEE Microeconomics", method:"Modern States → CLEP Principles of Microeconomics (무료) · 목표 8/10", when:"2026 여름", order:3 },
      { id:"vee-acct", cat:"vee", name:"VEE Accounting & Finance", method:"2026 여름 온라인", when:"2026 여름", order:4 },
      { id:"as-5102-5104", cat:"uec", name:"Exam FAM", method:"AS 5102 & 5104 UEC", when:"2학기", order:7 },
      { id:"as-5108", cat:"uec", name:"Exam SRM", method:"AS 5108 UEC", when:"3학기 (Fall Y2)", order:6 },
      { id:"as-5114", cat:"uec", name:"Exam ASTAM", method:"AS 5114 UEC", when:"3학기", order:10 },
      { id:"paf", cat:"module", name:"PAF Module", method:"e-Learning", when:"1학기", order:5 },
      { id:"asf", cat:"module", name:"ASF Module", method:"e-Learning", when:"2학기", order:8 },
      { id:"fap-12", cat:"module", name:"FAP 1-2", method:"e-Learning", when:"겨울", order:12 },
      { id:"fap-34", cat:"module", name:"FAP 3-4", method:"e-Learning", when:"2학기", order:13 },
      { id:"fap-5", cat:"module", name:"FAP 5", method:"e-Learning", when:"여름", order:14 },
      { id:"fap-final", cat:"module", name:"FAP 최종 평가", method:"e-Learning", when:"3학기", order:15 },
      { id:"atpa", cat:"module", name:"ATPA Assessment", method:"SOA", when:"여름", order:9 },
      { id:"apc", cat:"module", name:"APC", method:"Professionalism", when:"졸업 후", order:16 },
      { id:"shi-research", cat:"career", name:"Dr. Shi 리서치 프로젝트", method:"학기 시작 직후 · Dr. Tianxiang Shi", when:"1학기", order:20 },
      { id:"oncampus-job", cat:"career", name:"온캠퍼스 잡", method:"입학 즉시 지원", when:"1학기", order:21 },
      { id:"intern-fall", cat:"career", name:"가을 인턴 지원", method:"계리사 인턴 채용", when:"1학기", order:22 },
      { id:"intern-confirm", cat:"career", name:"인턴 확정", method:"겨울방학 전", when:"겨울", order:23 },
      { id:"cpt-pt", cat:"career", name:"CPT 파트타임", method:"2학기 인턴", when:"2학기", order:24 },
      { id:"cpt-ft", cat:"career", name:"CPT 풀타임", method:"여름 인턴", when:"여름", order:25 },
      { id:"graduate", cat:"career", name:"졸업", method:"Temple MS 완료", when:"2027.12", order:26 },
      { id:"asa", cat:"career", name:"ASA 완성", method:"모든 요건 + APC", when:"2028", order:27 },
      { id:"soa-join", cat:"admin", name:"SOA Candidate 등록", method:"soa.org 가입", when:"P 전후", order:30 },
      { id:"p-transcript", cat:"admin", name:"P 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:33 },
      { id:"vee-submit", cat:"admin", name:"VEE 학점 SOA 제출", method:"Econ(Micro)+Acct 완료 후 Candidate Central · Macro transcript 포함", when:"완료 시", order:34 },
      { id:"uec-grade", cat:"admin", name:"UEC 성적 요건 확인", method:"Temple AS과목 B 이상 등", when:"수강 전", order:35 },
      { id:"cpt-paperwork", cat:"admin", name:"CPT 서류", method:"국제학생실 + 고용주", when:"인턴 전", order:36 },
      { id:"pa-transcript", cat:"admin", name:"PA 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:37 }
    ];

    const DDAYS = [
      { date:"2026-08-01", label:"SAS Base 시험", taskId:"sas-cert" },
      { date:"2026-08-10", label:"CLEP Microeconomics", taskId:"vee-econ" },
      { date:"2026-08-12", label:"Exam P 등록 마감 (9월)", taskId:"exam-p" },
      { date:"2026-08-24", label:"Temple 입학", taskId:"oncampus-job" },
      { date:"2026-09-20", label:"Exam P (9/20)", taskId:"exam-p" },
      { date:"2027-06-01", label:"CPT FT", taskId:"cpt-ft" },
      { date:"2027-09-07", label:"Exam PA 등록 마감 (10월)", taskId:"exam-pa" },
      { date:"2027-10-16", label:"Exam PA (10월)", taskId:"exam-pa" },
      { date:"2027-12-15", label:"Temple 졸업", taskId:"graduate" },
      { date:"2028-06-01", label:"ASA", taskId:"asa" }
    ];

    const MILESTONES = DDAYS;
    const CAT_CLS = { exam:"cat-exam", vee:"cat-vee", module:"cat-module", uec:"cat-uec", career:"cat-career", admin:"cat-admin" };
    const EXAM_IDS = ["exam-p","exam-pa"];
    const VEE_IDS = ["vee-stats-check","vee-macro","vee-econ","vee-acct"];
    const MOD_IDS = ["paf","asf","fap-12","fap-34","fap-5","fap-final","atpa","apc"];
    const UEC_IDS = ["as-5101","as-5102-5104","as-5108","as-5114"];
    const CAREER_IDS = ["sas-cert","shi-research","oncampus-job","intern-fall","intern-confirm","cpt-pt","cpt-ft","graduate","asa"];
    const ADMIN_IDS = ["soa-join","p-transcript","vee-submit","uec-grade","cpt-paperwork","pa-transcript"];
    const ASA_IDS = [...EXAM_IDS, ...VEE_IDS, ...UEC_IDS, ...MOD_IDS];

    const DAY_NAMES = ["일","월","화","수","목","금","토"];
    const DAY_ORDER = [1,2,3,4,5,6];
    const SOA_FEES = {
      source: "SOA 공식 · 2025.12.16",
      sourceUrl: "https://www.soa.org/education/exam-req/syllabus-study-materials/exam-and-module-fees/",
      exams: [
        { name: "Exam P", fee: 275 },
        { name: "Exam PA", fee: 1234 }
      ],
      vee: [
        { name: "VEE Economics (Micro 남음)", fee: 92, optional: "Macro 완료" },
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
      uecNote: "FM·FAM·SRM·ASTAM → Temple UEC (SOA FM/P 시험비 $0 · FM은 5101)"
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
        when: "지금 · Exam P (9/20)",
        tier: "best", tierLabel: "1순위",
        pick: "TIA P (무료) + CA Adapt",
        cost: "~$195",
        costDetail: "Adapt only · 8/12 등록 마감",
        plan: "① 지금부터 TIA P ② Adapt EL 6+ ③ 9/20 응시 · 8/1 SAS와 병행 시 주간 시간표 필수",
        links: [
          { text: "TIA P", url: "https://www.theinfiniteactuary.com/exam-p/" },
          { text: "CA Adapt P", url: "https://www.coachingactuaries.com/exam-p/pricing" }
        ],
        alt: "CA Learn+Practice P — 학생 ~$216"
      },
      {
        when: "2026년 8/1 · SAS",
        tier: "best", tierLabel: "8/1",
        pick: "SAS Base Programming Specialist",
        cost: "SAS 공식 요금",
        costDetail: "8/1 시험 · P·VEE와 겹침 주의",
        plan: "SAS 공식 prep → 8/1 Prometric/Pearson 응시 · 인턴·분석 직무에 유리",
        links: [
          { text: "SAS Certification", url: "https://www.sas.com/en_us/certification.html" }
        ],
        alt: null
      },
      {
        when: "2026 여름 · VEE Micro",
        tier: "free", tierLabel: "무료",
        pick: "Modern States → CLEP Principles of Microeconomics",
        cost: "$0 (바우처)",
        costDetail: "Modern States 수강 완료 → CLEP 바우처 · Macro는 이미 완료",
        plan: "Modern States Micro 코스 완료 → CLEP 등록 · 목표 8/10 응시 · 원격(Proctortrack) 또는 테스트센터 · 통과 후 Macro와 합쳐 SOA VEE Economics 제출",
        links: [
          { text: "Modern States Micro", url: "https://www.modernstates.org/course/principles-of-microeconomics/" },
          { text: "CLEP Microeconomics", url: "https://clep.collegeboard.org/clep/principles-of-microeconomics" },
          { text: "SOA VEE Directory", url: "https://www.soa.org/education/exam-req/instructions-for-vee-directory/" }
        ],
        alt: "원격 응시는 Windows PC 필수 · Mac이면 테스트센터"
      },
      {
        when: "2026 여름 · VEE Acct",
        tier: "best", tierLabel: "1순위",
        pick: "CA VEE — Accounting & Finance",
        cost: "~$65–100",
        costDetail: "학생 할인 · SOA 제출 $92 별도",
        plan: "7–8월 Acct/Fin · Micro(CLEP)와 병행 가능 · 완료 후 SOA 제출",
        links: [
          { text: "CA VEE", url: "https://www.coachingactuaries.com/vee" },
          { text: "ACTEX VEE", url: "https://www.actexlearning.com/search?q=VEE" }
        ],
        alt: "ACTEX VEE — CA와 비슷한 가격대"
      },
      {
        when: "Fall 2026 · FM UEC",
        tier: "budget", tierLabel: "수업=FM",
        pick: "AS 5101 Theory of Interest",
        cost: "$0 추가",
        costDetail: "SOA FM 시험 면제 · tuition 포함",
        plan: "5101 수업 + B- 이상 → FM UEC · 5104/RMI 5104와 병행 · SOA FM 시험 등록 불필요",
        links: [
          { text: "Temple Canvas", url: "https://canvas.temple.edu/" }
        ],
        alt: "FoxMS@temple.edu에 FM UEC(5101) 플랜 확인"
      },
      {
        when: "2027 · Exam PA (10월)",
        tier: "later", tierLabel: "Fall Y2",
        pick: "AS 5108(SRM) 수업 + CA PA + Mahler",
        cost: "~$500+",
        costDetail: "5108 Fall Y2 병행 · 2027.12 졸업 전 응시",
        plan: "5108에서 R/Python·GLM 기반 → SOA PA sample projects → 10월 응시 · 등록 ~9/7",
        links: [
          { text: "CA PA", url: "https://www.coachingactuaries.com/exam-pa/pricing" },
          { text: "Mahler PA", url: "https://www.theinfiniteactuary.com/mahler/" },
          { text: "SOA PA", url: "https://www.soa.org/education/exam-req/edu-exam-pa-detail/" }
        ],
        alt: "P→PA 직행 비추 — SRM(5108)과 함께 Temple·SOA 플랜"
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
      { exam:"Exam P (9/20 · 목표)", examDate:"2026-09-20", examEnd:"2026-09-20", regDeadline:"2026-08-12", note:"등록 8/12 12AM · SAS 8/1·VEE와 7–8월 병행" },
      { exam:"Exam P (11월 · fallback)", examDate:"2026-11-04", examEnd:"2026-11-15", regDeadline:"2026-09-30", note:"9월 불합격 시" },
      { exam:"Exam PA (10월 · 2027)", examDate:"2027-10-13", examEnd:"2027-10-16", regDeadline:"2027-09-07", note:"5108 Fall Y2 · 12월 졸업 전" }
    ];

    const CONTACTS = [
      { role:"Actuarial Academic Director", name:"Dr. Tianxiang Shi", email:"tshi@temple.edu" },
      { role:"Fox MS Programs", email:"FoxMS@temple.edu", note:"Path·VEE·UEC 문의" },
      { role:"SOA Candidate Central", url:"https://candidate.soa.org/", note:"transcript·VEE·모듈" },
      { role:"Temple ISSS", url:"https://educationabroad.temple.edu/isss", note:"CPT·OPT·SSN" },
      { role:"Temple Careers", url:"https://careers.temple.edu/", note:"온캠·인턴" }
    ];

    const STUDY_HOURS = [
      { exam:"Exam P", min:300, max:400, typical:350, plan:"9/20 · 지금부터", tips:"8/1 SAS·VEE와 겹침 · 8/12 등록 · TIA+Adapt EL 6+" },
      { exam:"SAS Base Certification", min:40, max:80, typical:60, plan:"8/1", tips:"Base SAS prep · P와 주간 시간 나누기" },
      { exam:"Exam PA", min:400, max:600, typical:500, plan:"5108 병행 · 2027.10", tips:"500h · Fall Y2 5108과 함께 · 12월 졸업 전" },
      { exam:"UEC (FM/FAM/SRM/ASTAM)", min:0, max:0, typical:0, plan:"Temple 수업", tips:"별도 SOA 시험 없음 · FM=5101 · FAM=5102+5104 · SRM=5108 · ASTAM=5114 · B- 이상 · 수업+숙제로 대체" },
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
