// ASA plan static data — edit schedule, exams, phases here
const STORAGE_KEY = "soa-asa-plan-v6";
    const TEMPLE_TOTAL_CREDITS = 30;

    const TEMPLE_COURSES = [
      { id:"tc-5101", name:"AS 5101 Theory of Interest", credits:3, group:"Core · 2026 Fall", soa:"FM UEC" },
      { id:"tc-5104", name:"AS 5104 Short-Term Actuarial Modeling", credits:3, group:"Core · 2026 Fall", soa:"FAM UEC" },
      { id:"tc-ba5687", name:"BA 5687 MS Professional Development", credits:0, group:"Core (0 cr · 2026 Fall · 토 3회: 10/3·10/24·11/7)", soa:"0 cr" },
      { id:"tc-rmi5104", name:"RMI 5104 Property & Liability", credits:3, group:"Selective (1/3) · 2026 Fall", soa:"—" },
      { id:"tc-hcm5101", name:"HCM 5101 Health Systems Organization", credits:3, group:"Elective (1/2) · 3 cr · 2026 Fall", soa:"Non-Fox elective" },
      { id:"tc-5102", name:"AS 5102 Long-Term Actuarial Modeling", credits:3, group:"Core · 2027 Spring", soa:"FAM UEC" },
      { id:"tc-5108", name:"AS 5108 Actuarial Analytics", credits:3, group:"Core · 2027 Spring", soa:"SRM UEC" },
      { id:"tc-rmi5051", name:"RMI 5051 Managing Risk", credits:3, group:"Core · 2027 Spring", soa:"—" },
      { id:"tc-sel-1", name:"AS 5114 Advanced Short-Term Modeling", credits:3, group:"Selective (2/3) · 2027 Fall", soa:"ASTAM UEC" },
      { id:"tc-sel-2", name:"AS 5118", credits:3, group:"Selective (3/3) · 2027 Fall", soa:"—" },
      { id:"tc-elec-2", name:"Elective (추가 1과목)", credits:3, group:"Elective (2/2) · 3 cr · 2027 Fall", soa:"—" }
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
    const JOURNEY_END = "2028-03-01";

    const PHASES = [
      { id:"pre", name:"입학 전 · 2026 여름", period:"~2026년 8월", start:"2025-01-01", end:"2026-08-23", tasks:[
        { id:"prep-p", text:"Exam P 대비 본격 공부", meta:"지금부터 · 350h · 목표 9/21 (window 9/10–21)", highlight:true },
        { id:"sas-cert", text:"SAS Base 시험 8/23", meta:"Base Programming · 응시 예정", highlight:true },
        { id:"vee-macro", text:"VEE Macroeconomics ✓", meta:"Economics VEE · 이미 완료" },
        { id:"vee-acct", text:"VEE Accounting & Finance ✓", meta:"이미 완료" },
        { id:"exam-p-reg", text:"Exam P 등록", meta:"마감 8/12 12AM CT · 응시 목표 9/21", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 지원 준비", meta:"8/24 입학 전" }
      ]},
      { id:"sem1", name:"1학기 (Fall Y1)", period:"2026년 8/24 ~ 12/15", start:"2026-08-24", end:"2026-12-15", tasks:[
        { id:"as-5101", text:"AS 5101 Theory of Interest → FM UEC", meta:"월수 09:30 · 시험 대신 수업 · B- 이상", highlight:true },
        { id:"as-5104", text:"AS 5104 Short-Term Modeling", meta:"화목 09:30 · FAM UEC 일부", highlight:true },
        { id:"rmi-5104", text:"RMI 5104 Property & Liability", meta:"Selective · 월수 11:00 온라인", highlight:true },
        { id:"hcm-5101", text:"HCM 5101 Health Systems", meta:"Elective 1/2 · 수 18:00 온라인", highlight:true },
        { id:"ba-5687", text:"BA 5687 Professional Dev", meta:"0 cr · 토 3회 (10/3·10/24·11/7)" },
        { id:"exam-p", text:"Exam P 응시 (목표 9/21)", meta:"window 9/10–21 · 등록 8/12", highlight:true },
        { id:"shi-research", text:"Dr. Shi 리서치 프로젝트", meta:"학기 시작 직후", highlight:true },
        { id:"oncampus-job", text:"온캠퍼스 잡 바로 지원", meta:"입학 즉시" },
        { id:"vee-stats-check", text:"VEE Math Statistics — Purdue 학점 Temple 면제 확인", meta:"입학 직후!", highlight:true },
        { id:"intern-fall", text:"가을 계리사 인턴 지원", meta:"커리어" }
      ]},
      { id:"winter", name:"겨울방학", period:"2026년 12/16 ~ 2027년 1/10", start:"2026-12-16", end:"2027-01-10", tasks:[
        { id:"vee-econ", text:"VEE Microeconomics — CLEP", meta:"Modern States 무료 · 목표 12/23", highlight:true },
        { id:"intern-confirm", text:"인턴 확정", meta:"커리어" },
        { id:"sas-advanced", text:"SAS Advanced (선택)", meta:"겨울방학에 응시 · Base 이후", highlight:true },
        { id:"winter-rest", text:"휴식", meta:"컨디션" }
      ]},
      { id:"sem2", name:"2학기 (Spring Y1)", period:"2027년 1/11 ~ 5/4", start:"2027-01-11", end:"2027-05-04", tasks:[
        { id:"paf", text:"PAF Module (P+FM credit 후)", meta:"FM UEC 학점 반영(보통 1월 말) 직후 · 2월 전 마무리 목표", highlight:true },
        { id:"fap-12", text:"FAP Module 1 & 2", meta:"PAF 직후", highlight:true },
        { id:"as-5102-5104", text:"AS 5102 → FAM UEC 완성", meta:"Fall 5104 이미 수강 · Advisor 확인", highlight:true },
        { id:"as-5108", text:"AS 5108 → SRM UEC", meta:"PA 기반 · Spring 2027 수강", highlight:true },
        { id:"rmi-5051", text:"RMI 5051 Managing Risk", meta:"Core · Spring 2027" },
        { id:"prep-pa", text:"Exam PA 준비 (5108 병행)", meta:"봄학기 · ~500h", highlight:true },
        { id:"exam-pa", text:"Exam PA 응시 (4/13–16)", meta:"등록 마감 3/16 11:59 PM · 5108 병행", highlight:true },
        { id:"cpt-pt", text:"CPT 파트타임 인턴", meta:"커리어" },
        { id:"fap-34", text:"FAP Module 3 & 4", meta:"수업·인턴 병행" }
      ]},
      { id:"summer", name:"여름방학", period:"2027년 6월 ~ 8월", start:"2027-06-01", end:"2027-08-31", tasks:[
        { id:"cpt-ft", text:"CPT 풀타임 인턴", meta:"커리어", highlight:true },
        { id:"asf", text:"ASF Module", meta:"FAM+SRM credit 반영 직후 · PAF 완료 후", highlight:true },
        { id:"fap-5", text:"FAP Module 5", meta:"Final 전 완료", highlight:true },
        { id:"atpa", text:"ATPA Assessment", meta:"Assessment" }
      ]},
      { id:"sem3", name:"3학기 (Fall Y2)", period:"2027년 8/24 ~ 12/15", start:"2027-08-24", end:"2027-12-15", tasks:[
        { id:"as-5114", text:"AS 5114 → ASTAM UEC", meta:"Selective 2 · Fall 2027", highlight:true },
        { id:"as-5118", text:"AS 5118 (Selective)", meta:"Selective 3 · Fall 2027" },
        { id:"elective-2", text:"Elective 2 (추가 1과목)", meta:"Elective 2/2 · Fall 2027" },
        { id:"fap-final", text:"FAP 최종 평가", meta:"모듈 완료 후", highlight:true },
        { id:"graduate", text:"Temple MS 졸업", meta:"2027.12", highlight:true }
      ]},
      { id:"post", name:"졸업 후 · ASA 마무리", period:"2028년 1월 ~ 3월", start:"2028-01-01", end:"2028-03-31", tasks:[
        { id:"apc", text:"APC 참석", meta:"ASTAM UEC·FAP Final 등 전부 후 · 초대제", highlight:true },
        { id:"asa", text:"ASA 완성", meta:"목표 2028년 1–3월", highlight:true },
        { id:"sas-clinical", text:"SAS Clinical (선택)", meta:"제약·임상 진로 시" }
      ]}
    ];

    const REQUIREMENTS = [
      { id:"as-5101", cat:"uec", name:"Exam FM", method:"AS 5101 UEC · SOA FM 시험 안 봄", when:"Fall Y1", order:0 },
      { id:"exam-p", cat:"exam", name:"Exam P", method:"목표 9/21 (window 9/10–21) · 등록 8/12 12AM CT", when:"Fall Y1", order:4 },
      { id:"exam-pa", cat:"exam", name:"Exam PA", method:"2027.4/13–16 · 등록 마감 3/16 11:59 PM · 5108 Spring 2027 병행", when:"2학기 (Spring Y1)", order:11 },
      { id:"sas-cert", cat:"career", name:"SAS Base Certification", method:"8/23 응시 예정", when:"2026 여름", order:19 },
      { id:"sas-advanced", cat:"career", name:"SAS Advanced Programming (선택)", method:"Base 이후 · 인턴/실무에서 SAS 쓸 때 검토", when:"겨울방학 (선택)", order:28 },
      { id:"sas-clinical", cat:"career", name:"SAS Clinical Trials (선택)", method:"제약·임상 진로 시에만", when:"선택", order:29 },
      { id:"vee-stats-check", cat:"vee", name:"VEE Math Statistics", method:"Purdue 학점 Temple 면제 확인", when:"1학기", order:1 },
      { id:"vee-macro", cat:"vee", name:"VEE Macroeconomics", method:"이미 수강 완료 (Economics VEE 1/2)", when:"완료", order:2 },
      { id:"vee-econ", cat:"vee", name:"VEE Microeconomics", method:"Modern States → CLEP Principles of Microeconomics (무료) · 목표 12/23", when:"겨울방학", order:3 },
      { id:"vee-acct", cat:"vee", name:"VEE Accounting & Finance", method:"이미 통과", when:"완료", order:4 },
      { id:"as-5102-5104", cat:"uec", name:"Exam FAM", method:"AS 5102 & 5104 UEC", when:"2학기", order:7 },
      { id:"as-5108", cat:"uec", name:"Exam SRM", method:"AS 5108 UEC", when:"2학기 (Spring 2027)", order:6 },
      { id:"as-5114", cat:"uec", name:"Exam ASTAM", method:"AS 5114 UEC", when:"3학기", order:10 },
      { id:"paf", cat:"module", name:"PAF Module", method:"e-Learning · P+FM credit 후 · 2월 전 마무리", when:"Spring 초 (2월 전)", order:5 },
      { id:"asf", cat:"module", name:"ASF Module", method:"e-Learning · PAF+FAM+SRM credit 후", when:"2027 여름", order:8 },
      { id:"fap-12", cat:"module", name:"FAP 1-2", method:"e-Learning · PAF 직후", when:"Spring 초", order:12 },
      { id:"fap-34", cat:"module", name:"FAP 3-4", method:"e-Learning", when:"Spring~여름", order:13 },
      { id:"fap-5", cat:"module", name:"FAP 5", method:"e-Learning", when:"여름~Fall Y2", order:14 },
      { id:"fap-final", cat:"module", name:"FAP 최종 평가", method:"e-Learning · 모듈 완료 후", when:"Fall Y2", order:15 },
      { id:"atpa", cat:"module", name:"ATPA Assessment", method:"SOA", when:"여름", order:9 },
      { id:"apc", cat:"module", name:"APC", method:"Professionalism · 나머지 요건 전부 후 초대", when:"2028년 1–3월", order:16 },
      { id:"shi-research", cat:"career", name:"Dr. Shi 리서치 프로젝트", method:"학기 시작 직후 · Dr. Tianxiang Shi", when:"1학기", order:20 },
      { id:"oncampus-job", cat:"career", name:"온캠퍼스 잡", method:"입학 즉시 지원", when:"1학기", order:21 },
      { id:"intern-fall", cat:"career", name:"가을 인턴 지원", method:"계리사 인턴 채용", when:"1학기", order:22 },
      { id:"intern-confirm", cat:"career", name:"인턴 확정", method:"겨울방학 전", when:"겨울", order:23 },
      { id:"cpt-pt", cat:"career", name:"CPT 파트타임", method:"2학기 인턴", when:"2학기", order:24 },
      { id:"cpt-ft", cat:"career", name:"CPT 풀타임", method:"여름 인턴", when:"여름", order:25 },
      { id:"graduate", cat:"career", name:"졸업", method:"Temple MS 완료", when:"2027.12", order:26 },
      { id:"asa", cat:"career", name:"ASA 완성", method:"모든 요건 + APC", when:"2028년 1–3월", order:27 },
      { id:"soa-join", cat:"admin", name:"SOA Candidate 등록", method:"soa.org 가입", when:"P 전후", order:30 },
      { id:"p-transcript", cat:"admin", name:"P 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:33 },
      { id:"vee-submit", cat:"admin", name:"VEE 학점 SOA 제출", method:"Econ(Micro)+Acct 완료 후 Candidate Central · Macro transcript 포함", when:"완료 시", order:34 },
      { id:"uec-grade", cat:"admin", name:"UEC 성적 요건 확인", method:"Temple AS과목 B 이상 등", when:"수강 전", order:35 },
      { id:"cpt-paperwork", cat:"admin", name:"CPT 서류", method:"국제학생실 + 고용주", when:"인턴 전", order:36 },
      { id:"pa-transcript", cat:"admin", name:"PA 합격 transcript", method:"SOA에 성적 제출", when:"합격 후", order:37 }
    ];

    // Temple Registrar 공식 캘린더 기준 (Fall 2026 · Spring 2027)
    // Fall 2027은 미발표 → Fall 2026 패턴으로 잠정
    const DDAYS = [
      { date:"2026-08-23", label:"SAS Base 시험", taskId:"sas-cert" },
      { date:"2026-08-24", label:"Fall 2026 개강" },
      { date:"2026-09-21", label:"Exam P", taskId:"exam-p" },
      { date:"2026-12-15", label:"Fall 2026 종강 (기말 종료)" },
      { date:"2026-12-23", label:"CLEP Microeconomics", taskId:"vee-econ" },
      { date:"2027-01-11", label:"Spring 2027 개강" },
      { date:"2027-03-16", label:"Exam PA 등록 마감", taskId:"exam-pa" },
      { date:"2027-04-13", label:"Exam PA (4/13–16)", taskId:"exam-pa" },
      { date:"2027-05-04", label:"Spring 2027 종강 (기말 종료)" },
      { date:"2027-06-01", label:"CPT FT", taskId:"cpt-ft" },
      { date:"2027-08-24", label:"Fall 2027 개강 (잠정)" },
      { date:"2027-12-15", label:"Fall 2027 종강 · 졸업 (잠정)", taskId:"graduate" },
      { date:"2028-03-01", label:"ASA (목표)", taskId:"asa" }
    ];

    const MILESTONES = DDAYS;
    const CAT_CLS = { exam:"cat-exam", vee:"cat-vee", module:"cat-module", uec:"cat-uec", career:"cat-career", admin:"cat-admin" };
    const EXAM_IDS = ["exam-p","exam-pa"];
    const VEE_IDS = ["vee-stats-check","vee-macro","vee-econ","vee-acct"];
    const MOD_IDS = ["paf","asf","fap-12","fap-34","fap-5","fap-final","atpa","apc"];
    const UEC_IDS = ["as-5101","as-5102-5104","as-5108","as-5114"];
    const CAREER_IDS = ["sas-cert","sas-advanced","sas-clinical","shi-research","oncampus-job","intern-fall","intern-confirm","cpt-pt","cpt-ft","graduate","asa"];
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
        { name: "VEE Accounting & Finance", fee: 92, optional: "완료" },
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
        pricing: "Study manual 전자/인쇄본",
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
        when: "지금 · Exam P (9/21)",
        tier: "best", tierLabel: "1순위",
        pick: "TIA P (무료) + CA Adapt",
        cost: "~$195",
        costDetail: "Adapt only · 8/12 등록 마감",
        plan: "① 지금부터 TIA P ② Adapt EL 6+ ③ 9/21 응시 · 8/23 SAS와 병행 시 주간 시간표 필수",
        links: [
          { text: "TIA P", url: "https://www.theinfiniteactuary.com/exam-p/" },
          { text: "CA Adapt P", url: "https://www.coachingactuaries.com/exam-p/pricing" }
        ],
        alt: "CA Learn+Practice P — 학생 ~$216"
      },
      {
        when: "2026년 8/23 · SAS",
        tier: "best", tierLabel: "8/23",
        pick: "SAS Base Programming Specialist",
        cost: "SAS 공식 요금",
        costDetail: "8/23 응시 예정 · 입학(8/24) 직전 · P와 겹침 주의",
        plan: "SAS 공식 prep → 8/23 Prometric/Pearson 응시 · 인턴·분석 직무에 유리",
        links: [
          { text: "SAS Certification", url: "https://www.sas.com/en_us/certification.html" }
        ],
        alt: null
      },
      {
        when: "겨울방학 · VEE Micro (12/23)",
        tier: "free", tierLabel: "무료",
        pick: "Modern States → CLEP Principles of Microeconomics",
        cost: "$0 (바우처)",
        costDetail: "Modern States 수강 완료 → CLEP 바우처 · Macro는 이미 완료",
        plan: "Modern States Micro 코스 완료 → CLEP 등록 · 목표 12/23 응시 · 원격(Proctortrack) 또는 테스트센터 · 통과 후 Macro와 합쳐 SOA VEE Economics 제출",
        links: [
          { text: "Modern States Micro", url: "https://www.modernstates.org/course/principles-of-microeconomics/" },
          { text: "CLEP Microeconomics", url: "https://clep.collegeboard.org/clep/principles-of-microeconomics" },
          { text: "SOA VEE Directory", url: "https://www.soa.org/education/exam-req/instructions-for-vee-directory/" }
        ],
        alt: "원격 응시는 Windows PC 필수 · Mac이면 테스트센터"
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
        when: "2027 · Exam PA (4/13–16)",
        tier: "later", tierLabel: "Spring 2027",
        pick: "AS 5108(SRM) 수업 + CA PA + Mahler",
        cost: "~$500+",
        costDetail: "등록 마감 3/16 11:59 PM · window 4/13–16",
        plan: "5108에서 R/Python·GLM 기반 → SOA PA sample projects → 4/13–16 응시 · 등록 마감 3/16",
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
        pick: "PAF → FAP → ASF → Final (SOA e-Learning)",
        cost: "SOA 요금 포함",
        costDetail: "별도 교재 거의 없음",
        plan: "Spring 초 PAF → FAP 1–5 · 2027 여름 ASF(FAM+SRM 후) → Fall FAP Final · 졸업 후 APC → 2028년 1–3월 ASA",
        links: [
          { text: "SOA FAP", url: "https://www.soa.org/education/exam-req/edu-module-fap-detail/" },
          { text: "My SOA (login)", url: "https://engage.soa.org/login" }
        ],
        alt: null
      }
    ];

    function getBudgetTotal() {
      const all = [...SOA_FEES.exams, ...SOA_FEES.vee, ...SOA_FEES.modules];
      return all.reduce((s, x) => s + x.fee, 0);
    }

    const EXAM_DEADLINES = [
      { exam:"Exam P (9월 · 목표 9/21)", examDate:"2026-09-10", examEnd:"2026-09-21", regDeadline:"2026-08-12", note:"SOA 공식 window 9/10–21 · 등록 8/12 12AM CT · 목표일 9/21" },
      { exam:"Exam P (11월 · fallback)", examDate:"2026-11-04", examEnd:"2026-11-15", regDeadline:"2026-09-30", note:"9월 불합격 시 · SOA 공식" },
      { exam:"Exam PA (2027.4)", examDate:"2027-04-13", examEnd:"2027-04-16", regDeadline:"2027-03-16", note:"Sitting 4/13–16 · 등록 마감 3/16 11:59 PM · 5108(Spring 2027) 병행" }
    ];

    const CONTACTS = [
      { role:"Actuarial Academic Director", name:"Dr. Tianxiang Shi", email:"tshi@temple.edu" },
      { role:"Fox MS Programs", email:"FoxMS@temple.edu", note:"Path·VEE·UEC 문의" },
      { role:"My SOA", url:"https://engage.soa.org/login", note:"transcript·VEE·모듈·시험 등록" },
      { role:"Temple ISSS", url:"https://educationabroad.temple.edu/isss", note:"CPT·OPT·SSN" },
      { role:"Temple Careers", url:"https://careers.temple.edu/", note:"온캠·인턴" }
    ];

    const STUDY_HOURS = [
      { exam:"Exam P", min:300, max:400, typical:350, plan:"9/21 · 지금부터", tips:"8/23 SAS · 12/23 CLEP · 8/12 등록 · TIA+Adapt EL 6+" },
      { exam:"SAS Base Certification", min:40, max:80, typical:60, plan:"8/23 응시 예정", tips:"Base SAS prep · 입학 전날 · P와 주간 시간 나누기" },
      { exam:"Exam PA", min:400, max:600, typical:500, plan:"4/13–16 · 등록 3/16", tips:"500h · Spring 2027 5108과 함께" },
      { exam:"UEC (FM/FAM/SRM/ASTAM)", min:0, max:0, typical:0, plan:"Temple 수업", tips:"별도 SOA 시험 없음 · FM=5101 · FAM=5102+5104 · SRM=5108 · ASTAM=5114 · B- 이상 · 수업+숙제로 대체" },
      { exam:"PAF / ASF / FAP", min:20, max:40, typical:30, plan:"Spring 초 PAF → FAP · 2027 여름 ASF", tips:"모듈당 대략 20–40시간. ASF는 FAM+SRM credit 후 · ASA 목표는 2028년 1–3월." }
    ];

    // 포폴용 개인 프로젝트 (SOA · Life/Health · 서부 스폰 회사 면접용)
    const PORTFOLIO_URL = "https://kyeungyoonkim.github.io/";

    const PROJECT_TOOL_GUIDE = {
      title: "툴 선택 가이드 (이 포폴 기준)",
      picks: [
        { tool: "Python", when: "기본 추천 · EDA·GLM·ML·대시보드(Streamlit)까지 한 스택", libs: "pandas, numpy, statsmodels 또는 scikit-learn, matplotlib/plotly, jupyter" },
        { tool: "R", when: "대안 · 계리·통계/GLM이 익숙하거나 5108이 R이면 통일", libs: "tidyverse, glm(), ggplot2, rmarkdown" },
        { tool: "SQL", when: "데이터는 작아서 필수 아님 · 그래도 Health GLM에 집계 쿼리 몇 개 넣으면 면접에 좋음", libs: "DuckDB / SQLite + SELECT · GROUP BY" },
        { tool: "Excel / Sheets", when: "Life 생명표·프리미엄 민감도를 먼저 손으로 검증할 때", libs: "할인·현가 표 · 시나리오" },
        { tool: "GitHub", when: "모든 프로젝트 공통", libs: "README + notebook + PNG" }
      ],
      rule: "하나만 고르면: Python + Jupyter. 이미 R이면 R로 통일. SQL은 Health 프로젝트에 짧은 쿼리 섹션만."
    };

    const PERSONAL_PROJECTS = [
      {
        id: "proj-health-cost-glm",
        title: "건강보험 의료비 · 리스크 팩터 GLM (요율 스토리)",
        priority: "1순위 · Health 포폴 핵심",
        when: "지금 ~ Fall Y1 (HCM 5101·면접 스토리)",
        tools: {
          primary: "Python (Jupyter)",
          also: "R도 가능 · SQL은 선택(연습용)",
          detail: [
            "Python: pandas 로드 → statsmodels GLM (계수 해석용) · 시각화는 matplotlib/seaborn",
            "R 대안: glm(charges ~ ., family = Gamma(link='log')) 또는 log(charges) ~ .",
            "SQL(선택): DuckDB에 csv 넣고 smoker/region별 AVG(charges) 쿼리 3개 → sql/eda.sql",
            "비추: Spark, 무거운 DB, AutoML"
          ]
        },
        dataset: {
          name: "Medical Cost Personal Dataset (Kaggle)",
          kaggle: "https://www.kaggle.com/datasets/mirichoi0218/insurance",
          note: "age, sex, bmi, children, smoker, region → charges"
        },
        why: "Kaiser·Cigna·Blue Shield·UHC 면접용 Health pricing 스토리. SOA Health 경로와 맞춤.",
        approach: [
          "목표를 예측 대회 1등이 아니라 ‘요율/리스크 스토리’로 고정한다.",
          "EDA로 smoker·bmi·age 패턴을 본 뒤 GLM으로 relativity(계수)를 뽑는다.",
          "train/test는 나누되, 면접 점수는 계수 해석·한계 설명이다.",
          "README에 ‘보험료에 어떻게 쓰일 수 있는지 + 쓰면 안 되는 이유(인과·공정성)’를 쓴다."
        ],
        deliverables: [
          "EDA 차트 4장",
          "log(charges) 또는 Gamma GLM + relativity 표",
          "test predicted vs actual · 잔차",
          "Health actuarial 한 줄 결론 + 한계"
        ],
        steps: [
          { id: "setup", text: "환경: Python venv + jupyter + pandas/statsmodels/matplotlib (또는 RStudio + tidyverse)" },
          { id: "data", text: "Kaggle insurance.csv → data/raw/ · 결측·타입·중복 확인 노트" },
          { id: "sql", text: "(선택) DuckDB/SQLite: smoker·region별 AVG(charges), COUNT(*) 쿼리 3개 → sql/eda.sql" },
          { id: "eda", text: "charges 분포 · smoker boxplot · BMI 밴드 평균 · region 막대 · 인사이트 5불릿" },
          { id: "split", text: "train/test 80/20 (seed 고정) · 타깃=charges · 범주형 인코딩 또는 R formula" },
          { id: "glm", text: "메인 모델 1개 선택: log-linear 또는 Gamma(log) · age+bmi+children+smoker+sex+region" },
          { id: "interpret", text: "exp(coef) relativity 표 (smoker 배율, 연령 +10세 등)" },
          { id: "validate", text: "test 산점도 · 잔차 · 저/중/고비용 구간 오차 메모" },
          { id: "readme", text: "README: 문제→방법→결과표→한계 · PNG 삽입 · 1페이지 PDF · Kaiser/Cigna용 30초 스크립트" }
        ],
        portfolio: "GitHub + Health pricing 30초 스크립트",
        refs: [
          { text: "Kaggle Medical Cost Personal Datasets", url: "https://www.kaggle.com/datasets/mirichoi0218/insurance" },
          { text: "statsmodels GLM", url: "https://www.statsmodels.org/stable/glm.html" }
        ]
      },
      {
        id: "proj-health-eda-dash",
        title: "Health cost 대시보드 (빠른 윈)",
        priority: "지금 바로 · 포폴 첫 링크",
        when: "입학 전 ~ Fall Y1 · GLM보다 먼저",
        tools: {
          primary: "Python + Streamlit (또는 Tableau Public)",
          also: "집계는 pandas 또는 SQL",
          detail: [
            "빠른 경로: pandas KPI → Streamlit 필터 → Streamlit Community Cloud 배포",
            "GUI: Tableau Public / Power BI에 csv 연결 후 퍼블리시",
            "R Shiny는 배움 비용 커서 비추"
          ]
        },
        dataset: {
          name: "Medical Cost Personal Dataset (Kaggle)",
          kaggle: "https://www.kaggle.com/datasets/mirichoi0218/insurance",
          note: "같은 데이터로 KPI 대시보드"
        },
        why: "서부 health plan에 ‘라이브 링크’를 바로 보여줄 수 있음.",
        approach: [
          "질문 3개만: 흡연 uplift / 고비용 상위 10% / 지역 차이.",
          "차트도 3개만. UI보다 숫자·한 줄 인사이트.",
          "배포 URL을 LinkedIn Featured에 올린다."
        ],
        deliverables: [
          "KPI 카드",
          "차트 3장",
          "질문→인사이트 3세트",
          "공개 URL"
        ],
        steps: [
          { id: "kpi", text: "mean/median charges, smoker vs non 비율, p90 cut 공식 확정" },
          { id: "charts", text: "차트 3장만 (연령×흡연, BMI 밴드, region)" },
          { id: "app", text: "Streamlit: 사이드바(region/smoker) + KPI + 차트 · 또는 Tableau 1 대시보드" },
          { id: "deploy", text: "Streamlit Cloud / Tableau Public 배포" },
          { id: "copy", text: "README 3문장(Health/SOA) + LinkedIn Featured" }
        ],
        portfolio: "라이브 링크 + 1분 데모 GIF",
        refs: [
          { text: "Medical Cost Personal Datasets", url: "https://www.kaggle.com/datasets/mirichoi0218/insurance" },
          { text: "Streamlit docs", url: "https://docs.streamlit.io/" }
        ]
      },
      {
        id: "proj-life-mortality",
        title: "Life · 사망률/term 프라이싱 일러스트",
        priority: "2순위 · Pacific Life / Milliman Life",
        when: "Fall Y1 AS 5101 (FM)과 병행",
        tools: {
          primary: "Excel/Sheets 검증 + Python 또는 R 재현",
          also: "FM 계산기로 현가 직관 확인",
          detail: [
            "(1) Sheets에서 qx·할인·NSP 표 → (2) 같은 로직을 Python/R로 재현",
            "Python: pandas 생명표 + numpy 할인 v**t",
            "R: dplyr + 벡터 연산",
            "SQL 불필요"
          ]
        },
        dataset: {
          name: "SSA Actuarial Life Table (공개)",
          kaggle: "https://www.kaggle.com/datasets?search=mortality+life+table",
          note: "SSA 표를 csv로 repo에 포함 · 이자율 i 가정 명시"
        },
        why: "Pacific Life·Milliman Life 면접용. FM(5101)과 직결.",
        approach: [
          "범위: n-year term life net premium only (expense/reserve 제외).",
          "base i=4% · ±0.5%p 민감도.",
          "사망률 시나리오 qx×0.9 하나.",
          "스크립트: 문제→표→현가→프리미엄→민감도→한계."
        ],
        deliverables: [
          "qx·생존곡선",
          "NSP / level premium",
          "이자·사망률 민감도",
          "한계 명시"
        ],
        steps: [
          { id: "fetch", text: "SSA Period Life Table → data/life_table.csv (성별 하나 또는 둘)" },
          { id: "sheet", text: "Sheets: x, qx, px, v=1/(1+i), 급부 현가 · 예: 35세 10년 만기" },
          { id: "code", text: "Python/R 함수로 NSP·level premium · Sheets와 assert로 숫자 맞추기" },
          { id: "sens", text: "i=3/4/5% · qx scale 0.9/1.0/1.1 표·차트" },
          { id: "write", text: "README + Pacific Life/Milliman용 30초 스크립트" }
        ],
        portfolio: "노트북/시트 + Life pricing 한 장",
        refs: [
          { text: "SSA Actuarial Life Tables", url: "https://www.ssa.gov/oact/STATS/table4c6.html" },
          { text: "Human Mortality Database", url: "https://www.mortality.org/" }
        ]
      },
      {
        id: "proj-health-pa-ml",
        title: "Health cost 예측분석 (SRM/PA 연습)",
        priority: "3순위 · AS 5108 · Exam PA 직전",
        when: "Spring 2027",
        tools: {
          primary: "Python (statsmodels + scikit-learn)",
          also: "5108이 R이면 R로 통일 (glm + randomForest/xgboost)",
          detail: [
            "Model1=기존 GLM · Model2=RandomForest 또는 HistGradientBoosting",
            "metric 1개 고정 (MAE 추천)",
            "해석: GLM 계수 vs permutation importance / PDP",
            "딥러닝·AutoML 비추"
          ]
        },
        dataset: {
          name: "Medical Cost Personal Dataset (GLM과 동일)",
          kaggle: "https://www.kaggle.com/datasets/mirichoi0218/insurance",
          note: "해석 GLM vs 성능 ML 비교가 포인트"
        },
        why: "SOA PA·5108 언어로 Health 포폴.",
        approach: [
          "결론은 ‘실무에서 무엇을 배포할지’.",
          "예: 요율·설명엔 GLM, 스크리닝엔 ML.",
          "누수·과적합 체크리스트 필수.",
          "PA 톤: 목적→데이터→방법→결과→권고."
        ],
        deliverables: [
          "비교표 (MAE·해석·추천)",
          "PDP/중요도",
          "executive summary 1p"
        ],
        steps: [
          { id: "reuse", text: "Health GLM pipeline·split seed 재사용" },
          { id: "metric", text: "MAE 고정 · log 학습 시 역변환 후 비교" },
          { id: "ml", text: "RF 또는 HGB · 하이퍼파라미터는 얕게만" },
          { id: "compare", text: "표: MAE · 해석가능성 · 배포 추천" },
          { id: "explain", text: "smoker/bmi PDP · GLM 방향과 일치 확인" },
          { id: "write", text: "PA 스타일 write-up + Health 권고" }
        ],
        portfolio: "노트북 + executive summary",
        refs: [
          { text: "Medical Cost Personal Datasets", url: "https://www.kaggle.com/datasets/mirichoi0218/insurance" },
          { text: "SOA Exam PA", url: "https://www.soa.org/education/exam-req/edu-exam-pa-detail/" }
        ]
      },
      {
        id: "proj-portfolio-site",
        title: "포폴 허브 업데이트 (kyeungyoonkim.github.io)",
        priority: "상시 · URL 이미 있음",
        when: "프로젝트 1개 끝날 때마다 사이트에 반영",
        tools: {
          primary: "GitHub Pages (기존 포폴)",
          also: "각 프로젝트 repo 링크를 포폴에서 연결",
          detail: [
            "공개 주소: https://kyeungyoonkim.github.io/",
            "새 분석은 별도 repo 또는 /projects 폴더에 두고, 포폴 홈에서 카드로 링크",
            "이력서·LinkedIn·지원서에 이 URL 고정"
          ]
        },
        dataset: { name: "—", kaggle: "", note: "산출물 모음 · 라이브: https://kyeungyoonkim.github.io/" },
        why: "한 링크로 SOA Life/Health · 서부 · 스폰 스토리. recruiter에게 바로 전달.",
        approach: [
          "첫 화면 4요소: SOA · Life/Health · F-1/CPT–OPT · 서부.",
          "카드 순서: Health GLM → Life → PA.",
          "각 카드: 문제/툴/결과/GitHub 링크만."
        ],
        deliverables: [
          "About에 포지셔닝 문구",
          "프로젝트 카드 3개 (완료분부터)",
          "LinkedIn Featured · 이력서에 https://kyeungyoonkim.github.io/"
        ],
        steps: [
          { id: "about", text: "포폴 About에 SOA · Life/Health · F-1/CPT–OPT · 서부 희망 한 단락 반영" },
          { id: "cards", text: "완료 프로젝트부터 카드·스크린샷·repo 링크 추가" },
          { id: "link", text: "LinkedIn Featured · 이력서 · 스폰 타깃 지원서에 포폴 URL 첨부" }
        ],
        portfolio: "https://kyeungyoonkim.github.io/",
        refs: [
          { text: "내 포폴 (GitHub Pages)", url: "https://kyeungyoonkim.github.io/" }
        ]
      }
    ];

    // 커리어: SOA · Life/Health · 서부 · 스폰 위주
    const CAREER_EVENT_GUIDE = {
      title: "커리어 타깃 · 컨퍼런스 · 스폰 (내 기준)",
      intro: "경로: SOA · Life/Health 선호 · CAS 안 함 · 유학생 스폰(CPT→OPT→H-1B) · 서부 정착. 이벤트는 ‘참석 → LinkedIn → 커피챗 1명’이 목표.",
      channels: [
        {
          name: "SOA Professional Development (PD Edge)",
          how: "Health / Life·ValAct / ImpACT meeting · webcast. Life Insurance / Health 이벤트 우선",
          url: "https://www.soa.org/prof-dev/pd-edge/",
          tips: "Health Meeting·Life/ValAct·무료 section webinar부터. Candidate/Student 할인 확인."
        },
        {
          name: "SOA Candidate Events (Candidate Connect)",
          how: "학생·후보용 세션, career fair, virtual networking",
          url: "https://www.soa.org/future-actuaries/candidate-events/",
          tips: "CAS 이벤트는 스킵. SOA + 회사 info session만 캘린더에."
        },
        {
          name: "Temple / Fox · AS·RMI",
          how: "Dr. Shi·FoxMS 메일, Canvas, Fox Career, insurance/actuarial club",
          url: "https://www.fox.temple.edu/",
          tips: "교내 guest speaker·alumni panel ROI 최고. Life/Health alumni 있으면 꼭 잡기."
        },
        {
          name: "LinkedIn Events · 회사 careers webinar",
          how: "검색: actuarial intern life, health actuarial webinar, SOA student, Pacific Life / Milliman / Kaiser careers event",
          url: "https://www.linkedin.com/search/results/events/?keywords=actuarial%20life%20health",
          tips: "P&C·CAS·property 키워드는 필터에서 빼도 됨."
        },
        {
          name: "서부 로컬 · health plan 세션",
          how: "Kaiser, Blue Shield CA, Cigna/Evernorth Denver, Pacific Life OC 등 careers ‘events’",
          url: "https://www.kaiserpermanentejobs.org/",
          tips: "가을 인턴 시즌 전 virtual info session이 많음. 참석 후 recruiter에 서부 선호·스폰 필요를 솔직히."
        }
      ],
      searchTips: [
        "키워드: SOA life actuarial intern, health actuarial analyst, H-1B actuarial, visa sponsorship actuarial",
        "필터: Virtual · Free · Student · Life/Health — 연 2–3개만 해도 충분",
        "지원서/메시지에: F-1 · CPT/OPT 가능 시기 · H-1B 스폰 필요 · 서부(CA/WA/CO 등) 선호 한 줄",
        "스폰 확인: myvisajobs.com / h1bgrader · 회사명 + Actuarial LCA 검색 후 지원",
        "커리어 보드에 이벤트·타깃 회사 추가 (type=네트워킹 또는 인턴)"
      ],
      westFocus: {
        title: "서부 정착 허브 (Life / Health 위주)",
        cities: [
          "Seattle, WA — Milliman HQ · life/health consulting · tech+보험 교차",
          "Orange County / LA, CA — Pacific Life(Newport Beach) · health plans · Corebridge 등 LA 쪽 오피스",
          "Bay Area / Sacramento, CA — Kaiser · Blue Shield CA · health analytics",
          "Denver / Greenwood Village, CO — Cigna·Evernorth health actuarial 채용·스폰 이력 있음",
          "Phoenix, AZ · Portland, OR — health plan / Kaiser 계열 기회 (규모는 작을 수 있음)"
        ]
      },
      sponsors: {
        title: "유학생 스폰 위주 타깃 회사 (Life/Health · 서부 관련)",
        note: "‘스폰한다’는 DOL LCA 이력 기준 참고. 매 채용마다 달라지니 지원 시 recruiter에 확인. CAS/P&C carrier는 의도적으로 제외.",
        companies: [
          { name: "Pacific Life", fit: "Life · Newport Beach CA · Seattle 쪽 이력도", why: "H-1B LCA 꾸준 · Assistant Actuary 등 · 서부 Life 대표 타깃", url: "https://www.pacificlife.com/home/careers.html" },
          { name: "Milliman", fit: "Consulting · Seattle HQ · Life/Health practice", why: "서부 정착+스폰 현실적 · SOA 경로와 잘 맞음", url: "https://www.milliman.com/en/careers" },
          { name: "Kaiser Permanente", fit: "Health · CA/OR/WA/CO", why: "헬스케어 핏 · 서부 네트워크 · 인턴/얼리커리어 채용 확인", url: "https://www.kaiserpermanentejobs.org/" },
          { name: "Cigna / Evernorth", fit: "Health · Denver 등", why: "Health actuarial LCA·채용 이력 · 서부 거점", url: "https://jobs.thecignagroup.com/" },
          { name: "Corebridge / AIG Life (American General)", fit: "Life · Woodland Hills CA 등", why: "Life + SoCal · H-1B 이력 있음", url: "https://www.corebridgefinancial.com/careers" },
          { name: "UnitedHealthcare / Optum", fit: "Health · 전국 (서부 오피스 포함)", why: "규모 큰 health 채용 · 스폰 이력은 팀마다 확인", url: "https://careers.unitedhealthgroup.com/" },
          { name: "Elevance (Anthem) / regional Blues", fit: "Health", why: "헬스케어 pricing·risk · 서부 plan 오픈 시 지원", url: "https://careers.elevancehealth.com/" },
          { name: "Blue Shield of California", fit: "Health · CA", why: "CA 정착 시 우선 워치리스트", url: "https://www.blueshieldca.com/careers" },
          { name: "WTW · Aon · Mercer (Life/Health teams)", fit: "Consulting · 서부 오피스", why: "스폰 비교적 익숙 · Life/Health practice로 지원 명시", url: "https://www.wtwco.com/en-us/careers" }
        ]
      }
    };

const CAREER_COLUMNS = [
  { id:"target", label:"타겟" },
  { id:"applied", label:"지원" },
  { id:"interview", label:"인터뷰" },
  { id:"offer", label:"오퍼" },
  { id:"networking", label:"네트워킹" }
];
const CAREER_CLOSED_STATUSES = ["rejected", "withdrawn"];
const CAREER_TYPE_LABELS = { job:"온캠/PT", intern:"인턴", networking:"네트워킹·컨퍼" };
const CAREER_ADVANCE = { target:"applied", applied:"interview", interview:"offer", networking:"applied" };
