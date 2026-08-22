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
      { exam:"Exam P (9월 · 목표 9/21)", examDate:"2026-09-10", examEnd:"2026-09-21", regDeadline:"2026-08-12", note:"SOA 공식 window 9/10–21 · 등록 8/12 12AM CT · 목표일 9/21" },
      { exam:"Exam P (11월 · fallback)", examDate:"2026-11-04", examEnd:"2026-11-15", regDeadline:"2026-09-30", note:"9월 불합격 시 · SOA 공식" },
      { exam:"Exam PA (2027.4)", examDate:"2027-04-13", examEnd:"2027-04-16", regDeadline:"2027-03-16", note:"Sitting 4/13–16 · 등록 마감 3/16 11:59 PM · 5108(Spring 2027) 병행" }
    ];

    const CONTACTS = [
      { role:"Actuarial Academic Director", name:"Dr. Tianxiang Shi", email:"tshi@temple.edu" },
      { role:"Fox MS Programs", email:"FoxMS@temple.edu", note:"Path·VEE·UEC 문의" },
      { role:"SOA Candidate Central", url:"https://candidate.soa.org/", note:"transcript·VEE·모듈" },
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

    // 포폴용 개인 프로젝트 (Kaggle / CAS 보험 데이터 기준)
    const PERSONAL_PROJECTS = [
      {
        id: "proj-pricing-fremtpl",
        title: "자동차 TPL 보험료 산정 (Frequency–Severity GLM)",
        priority: "1순위 · 포폴 핵심",
        when: "Fall Y1 ~ Spring Y1 (5104·5108 병행)",
        stack: "R 또는 Python · GLM · tidyverse / pandas · ggplot / plotly",
        dataset: {
          name: "French Motor TPL (freMTPL2)",
          kaggle: "https://www.kaggle.com/datasets/xiangshan1989/french-motor-insurance",
          note: "약 68만 증권 · ClaimNb / Exposure / BonusMalus 등 · severity 파일과 조인"
        },
        why: "손해보험 pricing의 기본 구조(빈도×심도)를 한 번에 보여줄 수 있음. Life/Health로 가도 GLM·요율 스토리는 동일하게 설명 가능.",
        deliverables: [
          "EDA: 노출·클레임 분포, zero-claim 비율, BonusMalus·연령·차종별 클레임률",
          "Frequency: Poisson / NegBin GLM (offset = log Exposure)",
          "Severity: Gamma GLM (클레임 있는 증권만) · 대형 손실 캡핑 실험",
          "Pure premium = frequency × severity · rating factor relativity 표",
          "검증: actual vs expected, lift chart, Gini (단순 R²만 쓰지 않기)"
        ],
        steps: [
          { id: "data", text: "Kaggle freMTPL2freq (+ sev) 다운로드 · 조인 · Exposure/ClaimNb 이상치 처리" },
          { id: "eda", text: "EDA 노트북 + 핵심 차트 3–5장 (포폴용)" },
          { id: "freq", text: "빈도 GLM 적합 · 계수·relativities 해석" },
          { id: "sev", text: "심도 GLM · 99.5% 캡핑 vs 미캡핑 비교" },
          { id: "rate", text: "요율표 / pure premium 산출 · 검증 플롯" },
          { id: "readme", text: "GitHub README (문제→방법→결과→한계) · 1페이지 요약 PDF" }
        ],
        portfolio: "GitHub repo + README 스크린샷 · 면접용 ‘이 모델이 요율에 어떻게 쓰이는지’ 30초 스크립트",
        refs: [
          { text: "Kaggle French Motor Insurance", url: "https://www.kaggle.com/datasets/xiangshan1989/french-motor-insurance" },
          { text: "Swiss ADS tutorials (같은 데이터)", url: "https://www.actuarialdatascience.org/ADS-Tutorials/" },
          { text: "Kaggle: GLM / NN / XGBoost pricing", url: "https://www.kaggle.com/code/floser/glm-neural-nets-and-xgboost-for-insurance-pricing" }
        ]
      },
      {
        id: "proj-loss-severity",
        title: "손실 모델링 · 대형 클레임 심도 분포",
        priority: "2순위 · FAM/ASTAM 연계",
        when: "Spring Y1 (5102) ~ Fall Y2 (5114)",
        stack: "R/Python · SciPy/fitdistrplus · QQ plot · VaR/TVaR",
        dataset: {
          name: "freMTPL2 severity (+ 필요 시 공개 클레임 금액 데이터)",
          kaggle: "https://www.kaggle.com/datasets/xiangshan1989/french-motor-insurance",
          note: "ClaimAmount 분포 · 꼬리 두꺼움 · 재보험/대형손실 관점"
        },
        why: "손실분포·꼬리위험은 계리 포폴에서 차별화 포인트. ASTAM/Short-term modeling과 스토리가 맞음.",
        deliverables: [
          "로그정규 / Gamma / Pareto(또는 GPD) 적합 비교",
          "QQ·PP plot · AIC/BIC · KS 등 적합도",
          "캡핑·재보험 한도 시나리오에서 평균·VaR·TVaR 변화",
          "‘왜 GLM severity에 Gamma를 쓰는지’ 한 단락 설명"
        ],
        steps: [
          { id: "clean", text: "severity 데이터 정리 · 0·극단값 처리 규칙 문서화" },
          { id: "fit", text: "후보 분포 적합 · 진단 플롯" },
          { id: "tail", text: "꼬리 지표(VaR/TVaR) · 캡핑 민감도" },
          { id: "write", text: "포폴 섹션: 비즈니스 해석 (재보험·요율 로딩)" }
        ],
        portfolio: "짧은 리포트(5–8p) 또는 노트북 + 핵심 플롯만 랜딩에",
        refs: [
          { text: "Kaggle French Motor Insurance", url: "https://www.kaggle.com/datasets/xiangshan1989/french-motor-insurance" }
        ]
      },
      {
        id: "proj-claims-eda",
        title: "보험 클레임 데이터 분석 대시보드",
        priority: "빠른 윈 · 지금 시작 가능",
        when: "입학 전 ~ Fall Y1",
        stack: "Python · pandas · plotly / Tableau Public · Streamlit(선택)",
        dataset: {
          name: "Insurance Claim / Auto Insurance claims (Kaggle 검색)",
          kaggle: "https://www.kaggle.com/datasets?search=insurance+claims",
          note: "예: Auto Insurance Claims Data, Insurance Claim Analysis 등 · 최신·라이선스 확인 후 1개 고정"
        },
        why: "분석·시각화 스킬을 빠르게 포폴에 올리는용. 나중에 GLM 프로젝트의 ‘프롤로그’로도 재사용.",
        deliverables: [
          "클레임 빈도·금액·지역·연령대 요약 KPI",
          "이상치·결측 리포트",
          "‘비즈니스 질문 3개 → 차트 3개 → 인사이트’ 구조",
          "공개 링크 (GitHub Pages / Streamlit / Tableau Public)"
        ],
        steps: [
          { id: "pick", text: "Kaggle에서 데이터셋 1개 확정 · 컬럼 사전 작성" },
          { id: "kpi", text: "KPI·차트 초안 · 인사이트 메모" },
          { id: "dash", text: "대시보드 배포 · README에 질문→답 정리" }
        ],
        portfolio: "라이브 링크 + 1분 데모 GIF",
        refs: [
          { text: "Kaggle: insurance claims 검색", url: "https://www.kaggle.com/datasets?search=insurance+claims" },
          { text: "Kaggle: insurance 검색", url: "https://www.kaggle.com/datasets?search=insurance" }
        ]
      },
      {
        id: "proj-pa-ml",
        title: "예측분석 미니 프로젝트 (SRM/PA 연습)",
        priority: "3순위 · 5108·PA 직전",
        when: "Spring 2027 (AS 5108) ~ PA 전",
        stack: "R/Python · GLM · tree / GBM · train-test · calibration",
        dataset: {
          name: "freMTPL2 또는 Kaggle insurance / Porto Seguro(참고)",
          kaggle: "https://www.kaggle.com/c/porto-seguro-safe-driver-prediction",
          note: "pricing은 freMTPL 권장 · ‘클레임 발생 예측’은 Porto Seguro 등 분류 과제도 가능"
        },
        why: "SRM·PA와 같은 언어(train/test, lift, overfitting)로 포폴을 맞춤.",
        deliverables: [
          "Baseline GLM vs tree/GBM 비교",
          "성능·해석 트레이드오프 표 (계리 실무 관점)",
          "과적합·누수 체크리스트",
          "PA sample project 스타일로 결과 서술"
        ],
        steps: [
          { id: "split", text: "학습/검증 분할 · 타깃·노출 정의" },
          { id: "base", text: "GLM baseline" },
          { id: "ml", text: "ML 모델 1–2개 · 비교표" },
          { id: "story", text: "‘실무에선 무엇을 택할지’ 결론 작성" }
        ],
        portfolio: "노트북 + 1페이지 executive summary",
        refs: [
          { text: "Porto Seguro (Kaggle competition)", url: "https://www.kaggle.com/c/porto-seguro-safe-driver-prediction" },
          { text: "French Motor Insurance", url: "https://www.kaggle.com/datasets/xiangshan1989/french-motor-insurance" }
        ]
      },
      {
        id: "proj-portfolio-site",
        title: "포폴 허브 정리 (GitHub / 1페이지 사이트)",
        priority: "상시",
        when: "프로젝트 1개 끝날 때마다 업데이트",
        stack: "GitHub · Notion 또는 단순 HTML",
        dataset: { name: "—", kaggle: "", note: "프로젝트 산출물 모음" },
        why: "개별 노트북만 있으면 안 보임. ‘한 링크’로 면접관에게 보여줘야 함.",
        deliverables: [
          "About + 스킬 + 프로젝트 카드 3개",
          "각 프로젝트: 문제 / 데이터 / 방법 / 결과 / 한계",
          "이력서·LinkedIn에 동일 링크"
        ],
        steps: [
          { id: "repo", text: "GitHub profile README 또는 portfolio repo 생성" },
          { id: "cards", text: "완료 프로젝트부터 카드 추가" },
          { id: "link", text: "LinkedIn Featured · 이력서에 URL" }
        ],
        portfolio: "최종 공개 URL",
        refs: []
      }
    ];

    // 커리어: SOA · Life/Health · 서부 · 스폰 위주
    const CAREER_EVENT_GUIDE = {
      title: "커리어 타깃 · 컨퍼런스 · 스폰 (내 기준)",
      intro: "경로: SOA · Life/Health 선호 · CAS 안 함 · 유학생 스폰(CPT→OPT→H-1B) · 서부 정착. 이벤트는 ‘참석 → LinkedIn → 커피챗 1명’이 목표.",
      channels: [
        {
          name: "SOA (Society of Actuaries)",
          how: "Professional Development · Meetings · webcast. Life Insurance / Health Section 이벤트 우선",
          url: "https://www.soa.org/professional-development/",
          tips: "Life Meeting·Health Meeting·무료 section webinar부터. Candidate/Student 할인 확인."
        },
        {
          name: "SOA Future Actuaries · Student events",
          how: "학생·후보용 세션, career fair, virtual networking",
          url: "https://www.soa.org/future-actuaries/",
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
          url: "https://www.soa.org/future-actuaries/",
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
