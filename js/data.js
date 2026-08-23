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
    const DEFAULT_WEEKLY_STUDY_GOAL = 1200; // 20h/week · P 시즌
    const STUDY_GOAL_VERSION = 2;

    // Fixed weekly todos · shown on 시간표/캘린더 · checkbox resets each Monday
    const WEEKLY_FIXED_TODOS = {
      title: "매주 고정 할 일",
      goalNote: "주간 공부 목표 기본 1200분(20시간). Exam P(9/21)까지 P+리뷰 본체 · 저녁 P 2블록(0시 취침).",
      items: [
        { id: "minutes", text: "주간 공부 분 채우기 (공부모드 · 기본 1200분+ · P+수업 합산)", always: true },
        { id: "class-daily", text: "수업 있는 날: 과목별 당일 리뷰 (5101·5104 ★ 40분+ / RMI 20분 / HCM 30분)", from: "2026-08-24" },
        { id: "p-practice", text: "Exam P: 연습 블록 6회+ 또는 문제풀이 ~12–15시간/주", until: "2026-09-21" },
        { id: "p-wrongs", text: "Exam P: 오답 노트 복습 30분 이상", until: "2026-09-21" },
        { id: "p-formula", text: "Exam P: 약점 파트 / 공식 복습 (수 또는 일)", until: "2026-09-21" },
        { id: "class-catchup", text: "Temple: 금 13:00 숙제 몰아서 · 토 전에 제출물·읽기 정리", from: "2026-08-24" },
        { id: "proj-pause", text: "프로젝트: 이번 주는 스킵 또는 10분 메모만 (P 우선)", until: "2026-09-21" },
        { id: "health-proj", text: "Health rate memo / SAS 해커톤: 딥워크 1블록 이상", from: "2026-09-22", until: "2026-10-30" },
        { id: "life-or-research", text: "Life assumption memo 또는 Research 1-pager: 작은 진행 1개", from: "2026-10-31" },
        { id: "admin", text: "행정: Canvas/메일/ISSS 또는 커리어 보드 1건", always: true },
        { id: "body", text: "진짜 휴식 1블록 · 올나잇 빚 안 쌓기", always: true }
      ]
    };

    // Things that need a real calendar time block (not “when I feel like it”)
    const TIME_BLOCK_GUIDE = {
      title: "캘린더에 막아둘 시간 블록 (매일 / 매주)",
      intro: "Fall 2026 (8/24 개강) · 주 1200분 목표 · 취침 0–1시~7–8시. 블록 사이 10–15분 텀. ① 리뷰 ② Exam P(저녁 2블록) ③ 숙제/운동.",
      daily: [
        {
          name: "수업 당일 리뷰 (학교)",
          dur: "수업당 25–45분 (그날 들은 과목마다)",
          when: "수업 끝난 직후 또는 그날 저녁 딥 P 전",
          rule: "노트 정리 · 예제 1–2문제 · 모르는 것 표시. 주말로 미루지 않기.",
          from: "2026-08-24",
          note: "5101·5104 ★ 우선(40–45분). RMI 20분. HCM 수 30분(수업 직후). 월·수 5101 리뷰는 RMI 끝난 뒤 점심 블록."
        },
        {
          name: "딥 스터디 Exam P",
          dur: "저녁 90분 × 2블록 + 오답 30분 (월·화·목·금·일)",
          when: "1블록 20:00–21:30 · 오답 21:45 · 2블록 22:30–23:45",
          rule: "캘린더 busy · TIA/Adapt. 리뷰 먼저. 수요일은 가벼운 30분만.",
          until: "2026-09-21",
          note: "0시 이후 새 문제 금지 · 7–8시 기상"
        },
        {
          name: "딥 스터디 (P 이후 · 숙제/UEC)",
          dur: "수업 있는 날 60–90분 × 1회",
          when: "P 때 쓰던 저녁 슬롯",
          rule: "내용 = 밀린 숙제·5101/5104 심화. 프로젝트는 아래 주간 블록.",
          from: "2026-09-22"
        },
        {
          name: "오답 / 에러 로그 (P 시즌)",
          dur: "20–30분",
          when: "P 연습 블록 직후 같은 날",
          rule: "스킵 금지",
          until: "2026-09-21"
        },
        {
          name: "프로젝트 (P 시즌 · 최소)",
          dur: "0분 기본 · 최대 10–15분",
          when: "하고 싶으면 행정 시간에만",
          rule: "아이디어 메모 1줄 OK. SAS/포폴 본작업 금지.",
          until: "2026-09-21",
          note: "해커톤·Health memo는 9/22 시작. 지금 욕심내면 P·수업 둘 다 무너짐."
        },
        {
          name: "점심",
          dur: "약 45분",
          when: "월·수 13:30 · 화·목 12:10 · 금 11:45 · 토 12:05",
          rule: "리뷰/수업 끝나고 · 캘린더 busy",
          from: "2026-08-24"
        },
        {
          name: "운동",
          dur: "약 1시간",
          when: "월·수·금 저녁 · 저녁(18:30–19:00) 직전 1h (월·금 17:00 / 수 16:00 — HCM 전)",
          rule: "캘린더 busy · P 딥(20:00) 전에 끝내기. 수요일은 HCM(18:00) 때문에 운동·가벼운 식사 후 수업, 본 저녁은 20:30 이후.",
          always: true
        },
        {
          name: "행정 / 인박스",
          dur: "15–20분",
          when: "점심 또는 딥워크 후",
          rule: "Canvas·메일·ISSS 몰아서. 딥/리뷰 중에 하지 말기.",
          always: true
        },
        {
          name: "수면 / 정리",
          dur: "수면 7–8시간 (0–1시~7–8시)",
          when: "0:00 하드 스톱 · 새 문제 금지",
          rule: "시험·학점 > 올나잇 · 23:45까지 마무리",
          always: true
        }
      ],
      weekly: [
        {
          name: "Exam P 롱셋",
          dur: "3–4시간 (또는 90–120분 × 2)",
          when: "토 오전 · 일 15:00~ (12시 성당 후)",
          rule: "혼합 문제 · 시간 제한. 이 날도 수업 밀린 리뷰가 있으면 먼저 30–45분 비우기.",
          until: "2026-09-21"
        },
        {
          name: "약점 / 공식 클리닉",
          dur: "45–60분",
          when: "일 15:00~ (12시 성당 후)",
          rule: "약한 챕터만",
          until: "2026-09-21"
        },
        {
          name: "Temple 숙제 배치 (밀린 것만)",
          dur: "2–2.5시간",
          when: "금 13:00–15:30 (주 몰아서) · 토 롱셋 전 마무리",
          rule: "당일 리뷰 매일 했으면 제출물·읽기 위주. 금요일 = 숙제 메인 데이. 5101·5104 복습은 금 오전.",
          from: "2026-08-24"
        },
        {
          name: "Health / SAS 프로젝트 (해커톤)",
          dur: "주 2–3시간 (토·일 중 1블록)",
          when: "9/22 이후 · 토 또는 일",
          rule: "수업 당일 리뷰·숙제 다음 우선순위. 평일 매일 프로젝트 넣지 말기.",
          from: "2026-09-22",
          until: "2026-10-30"
        },
        {
          name: "Life memo 또는 Research",
          dur: "60–90분",
          when: "평일 저녁 1회 · 해커톤 마감(10/30) 이후",
          rule: "주 1블록이면 충분",
          from: "2026-10-31"
        },
        {
          name: "커리어 / 네트워킹",
          dur: "30–45분",
          when: "일 밤 또는 월 점심",
          rule: "지원/LinkedIn 1건",
          always: true
        },
        {
          name: "완전 휴식 블록",
          dur: "반나절 또는 저녁 off",
          when: "매주 1회",
          rule: "캘린더 busy",
          always: true
        },
        {
          name: "BA 5687 토요일 세션",
          dur: "해당일 일정대로",
          when: "10/3 · 10/24 · 11/7",
          rule: "그날 오전 통째로",
          from: "2026-10-01",
          until: "2026-11-07"
        }
      ],
      slotTypes: {
        class: { label: "수업", color: "var(--accent2)" },
        review: { label: "당일 리뷰", color: "#6b9e78" },
        study: { label: "Exam P / 공부", color: "var(--accent)" },
        admin: { label: "행정", color: "var(--muted)" },
        project: { label: "프로젝트", color: "#c9a227" },
        rest: { label: "휴식 · 수면", color: "#7a8a9a" },
        exercise: { label: "운동", color: "#e07a5f" },
        meal: { label: "식사", color: "#b8956b" }
      },
      // Review minutes · auto-placed after each Fall class in app.js
      classReviewRules: {
        "AS 5101": { minutes: 40, priority: true, label: "AS 5101" },
        "AS 5104": { minutes: 45, priority: true, label: "AS 5104" },
        "RMI 5104": { minutes: 20, priority: false, label: "RMI" },
        "HCM 5101": { minutes: 30, priority: false, label: "HCM" }
      },
      // Fixed blocks only · classes + reviews merged from state.schedule at render
      timetablePhases: [
        {
          id: "exam-p-season",
          label: "Fall 2026 · Exam P (~9/21)",
          from: "2026-08-23",
          until: "2026-09-21",
          useFallSchedule: true,
          dayTemplates: {
            0: [
              { start: "12:00", end: "13:30", label: "성당", type: "rest", note: "일요일 · 일정 전" },
              { start: "13:45", end: "14:30", label: "점심", type: "meal" },
              { start: "15:00", end: "16:00", label: "약점 / 공식 클리닉", type: "study", note: "★ 15시 시작" },
              { start: "16:15", end: "16:30", label: "다음 주 예습 · 계획", type: "admin" },
              { start: "16:45", end: "17:15", label: "5101·5104 밀린 복습", type: "review", note: "있으면만" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P 딥", type: "study" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:45", label: "Exam P 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침 · 새 문제 금지", type: "rest" }
            ],
            1: [
              { start: "13:35", end: "14:25", label: "점심", type: "meal" },
              { start: "14:40", end: "14:55", label: "행정", type: "admin" },
              { start: "17:00", end: "18:00", label: "운동", type: "exercise" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P 딥", type: "study" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:45", label: "Exam P 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침 · 새 문제 금지", type: "rest" }
            ],
            2: [
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "13:30", label: "행정", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P 딥", type: "study" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:45", label: "Exam P 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            3: [
              { start: "13:35", end: "14:25", label: "점심", type: "meal" },
              { start: "14:40", end: "14:55", label: "행정", type: "admin" },
              { start: "16:00", end: "17:00", label: "운동", type: "exercise", note: "HCM(18:00) 전" },
              { start: "21:20", end: "21:50", label: "가벼운 P", type: "study", note: "30분 · 선택" },
              { start: "00:00", end: "—", label: "취침 · HCM 밤 긴 P 금지", type: "rest" }
            ],
            4: [
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "13:30", label: "행정", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P 딥", type: "study" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:45", label: "Exam P 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            5: [
              { start: "09:30", end: "10:30", label: "AS 5101 주간 복습", type: "review", note: "★ FM" },
              { start: "10:45", end: "11:30", label: "AS 5104 주간 복습", type: "review", note: "★ 모델링" },
              { start: "11:45", end: "12:00", label: "행정 · Canvas", type: "admin" },
              { start: "12:00", end: "12:50", label: "점심", type: "meal" },
              { start: "13:15", end: "15:30", label: "Temple 숙제 몰아서", type: "study", note: "제출물 · 읽기" },
              { start: "15:45", end: "16:15", label: "RMI/HCM 밀린 리뷰", type: "review", note: "있으면만" },
              { start: "17:00", end: "18:00", label: "운동", type: "exercise" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P", type: "study" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:30", label: "숙제 · P 마무리", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            6: [
              { start: "09:00", end: "11:30", label: "Exam P 롱셋", type: "study", note: "1부 · 시간 제한" },
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "15:00", label: "Exam P 롱셋", type: "study", note: "2부" },
              { start: "15:15", end: "16:00", label: "Temple 숙제 · 밀린 리뷰", type: "study", note: "주말 정리" },
              { start: "16:15", end: "16:45", label: "커리어 / LinkedIn", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "Exam P 딥", type: "study", note: "오답 위주 OK" },
              { start: "21:45", end: "22:15", label: "오답 노트", type: "study" },
              { start: "22:30", end: "23:45", label: "Exam P 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ]
          }
        },
        {
          id: "hackathon",
          label: "Fall 2026 · 해커톤 (9/22~10/30)",
          from: "2026-09-22",
          until: "2026-10-30",
          useFallSchedule: true,
          dayTemplates: {
            0: [
              { start: "12:00", end: "13:30", label: "성당", type: "rest", note: "일요일 · 일정 전" },
              { start: "13:45", end: "14:30", label: "점심", type: "meal" },
              { start: "15:00", end: "16:00", label: "Life memo / Research", type: "project", note: "15시 시작" },
              { start: "16:15", end: "16:30", label: "다음 주 계획", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 / UEC", type: "study" },
              { start: "22:30", end: "23:45", label: "5101·5104 복습", type: "review" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            1: [
              { start: "13:35", end: "14:25", label: "점심", type: "meal" },
              { start: "14:40", end: "14:55", label: "행정", type: "admin" },
              { start: "17:00", end: "18:00", label: "운동", type: "exercise" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 / UEC", type: "study", note: "5101·5104" },
              { start: "22:30", end: "23:45", label: "숙제 / UEC 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            2: [
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "13:30", label: "행정", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 / UEC", type: "study" },
              { start: "22:30", end: "23:45", label: "5104 심화", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            3: [
              { start: "13:35", end: "14:25", label: "점심", type: "meal" },
              { start: "14:40", end: "14:55", label: "행정", type: "admin" },
              { start: "16:00", end: "17:00", label: "운동", type: "exercise" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            4: [
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "13:30", label: "행정", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 / UEC", type: "study" },
              { start: "22:30", end: "23:45", label: "숙제 추가", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            5: [
              { start: "09:30", end: "10:30", label: "AS 5101 주간 복습", type: "review", note: "★" },
              { start: "10:45", end: "11:30", label: "AS 5104 주간 복습", type: "review", note: "★" },
              { start: "11:45", end: "12:00", label: "행정", type: "admin" },
              { start: "12:00", end: "12:50", label: "점심", type: "meal" },
              { start: "13:15", end: "15:00", label: "Temple 숙제", type: "study" },
              { start: "15:15", end: "16:15", label: "Health memo / SAS", type: "project", note: "금요일 딥블록" },
              { start: "17:00", end: "18:00", label: "운동", type: "exercise" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 · UEC 마무리", type: "study" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ],
            6: [
              { start: "09:00", end: "12:00", label: "Health rate memo / SAS", type: "project", note: "해커톤 · 1부" },
              { start: "12:15", end: "13:00", label: "점심", type: "meal" },
              { start: "13:15", end: "15:00", label: "Health rate memo / SAS", type: "project", note: "2부" },
              { start: "15:15", end: "16:00", label: "Temple 숙제 정리", type: "study" },
              { start: "16:15", end: "16:45", label: "커리어", type: "admin" },
              { start: "18:15", end: "19:00", label: "저녁", type: "meal" },
              { start: "20:00", end: "21:30", label: "숙제 / UEC", type: "study" },
              { start: "22:30", end: "23:45", label: "프로젝트 마무리", type: "project" },
              { start: "00:00", end: "—", label: "취침", type: "rest" }
            ]
          }
        }
      ],
      ruleOfThumb: [
        "Fall 수업표(5101 월수 9:30 · 5104 화목 9:30 · RMI 월수 11:00 · HCM 수 18:00) 기준. 리뷰는 수업 직후 자동 배치.",
        "주간 1200분 · P 저녁 2블록(22:30–23:45) · 0시 취침. 블록 사이 10분+ 텀.",
        "토: 롱셋 오전+저녁 P 2블록. 일: 12시 성당 → 15시 시작 · 저녁 P 2블록.",
      ]
    };

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
        { id:"proj-health", text:"Health rate memo (SAS) start", meta:"after P (9/22~) · same work as Oct hackathon", highlight:true },
        { id:"sas-hackathon", text:"SAS Student Hackathon", meta:"10/1 시작 · 10/30 마감 · Health rate memo와 동일 작업", highlight:true },
        { id:"proj-life", text:"Life term memo (assumption memo)", meta:"with 5101 (FM) · after hackathon deadline 10/30", highlight:true },
        { id:"shi-research", text:"Dr. Shi research track", meta:"disability/equity · Research 탭 · P 이후 미팅", highlight:true },
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
      { id:"sas-hackathon", cat:"career", name:"SAS Student Hackathon", method:"10/1 시작 · 10/30 마감 · 신청 완료 · Health rate memo와 동일 스택", when:"Fall Y1 · 10/1–10/30", order:20 },
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
      { id:"shi-research", cat:"career", name:"Dr. Shi research track", method:"disability / equity · Life or Health · see Research tab · meet after Exam P", when:"Fall Y1 (after P)", order:20 },
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
      { date:"2026-09-22", label:"Health rate memo start (post-P)", taskId:"proj-health" },
      { date:"2026-10-01", label:"SAS Hackathon 시작", taskId:"sas-hackathon" },
      { date:"2026-10-30", label:"SAS Hackathon 마감", taskId:"sas-hackathon" },
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
    const CAREER_IDS = ["sas-cert","sas-hackathon","sas-advanced","sas-clinical","shi-research","oncampus-job","intern-fall","intern-confirm","cpt-pt","cpt-ft","graduate","asa"];
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
      title: "Tool guide (2 projects only)",
      picks: [
        { tool: "SAS", when: "Main for Health · reproduce Life · same story as Base cert", libs: "PROC IMPORT · MEANS/FREQ/SQL · GENMOD/GLM · SGPLOT · DATA step · ODS PDF" },
        { tool: "Excel / Sheets", when: "Life assumptions + NSP hand-check (required)", libs: "qx · discount factors · PV · scenario table" },
        { tool: "Python", when: "Optional · segment MAE / light ML compare · mini dashboard", libs: "pandas, sklearn (shallow), streamlit (optional)" },
        { tool: "GitHub + Pages", when: "Deliverables + 2 cards on https://kyeungyoonkim.github.io/", libs: ".sas · PDF rate memo · README" }
      ],
      rule: "Only Health + Life. Dashboard / PA ML fold into Health. Interview score = assumptions, validation, deploy judgment — not flashy models."
    };

    const PERSONAL_PROJECTS = [
      {
        id: "proj-health-rate-memo",
        title: "Health · medical cost risk relativities + rate memo (SAS)",
        priority: "P1 · after Exam P · hackathon 10/1–10/30",
        when: "9/22~ skeleton · 10/1–10/30 hackathon sprint (= this project) · Nov polish memo",
        tools: {
          primary: "SAS (PROC GENMOD/GLM + ODS)",
          also: "Optional: Python for segment MAE · light ML compare · Streamlit 1-pager",
          detail: [
            "Main deliverable = rate memo (1–2p PDF): problem → data limits → GLM relativities → validation → deploy decision → fairness / causality",
            "SAS: IMPORT → QC → EDA → GENMOD/GLM → ODS tables/plots",
            "Depth: segment error · small-sample cells → credibility / shrinkage note · one-line rating vs screening decision",
            "(Optional) Same split: RF/HGB MAE compare only — no AutoML / deep learning",
            "(Optional) Streamlit: mini view of 3 memo numbers only"
          ]
        },
        dataset: {
          name: "Medical Cost Personal Dataset (Kaggle)",
          kaggle: "https://www.kaggle.com/datasets/mirichoi0218/insurance",
          note: "Toy data OK if rate-memo depth is real · age/sex/bmi/children/smoker/region → charges"
        },
        why: "Kaiser / Cigna / Blue Shield / UHC / Milliman Health interviews. One link = SAS Base + Health pricing language.",
        approach: [
          "Success = can you answer: would you put this relativity into a rate? (not Kaggle score).",
          "Core output: GLM coeffs → exp(β) relativity table.",
          "Validate overall MAE and segment error (smoker / age band / region).",
          "Small-sample / extreme cells: prefer credibility / shrinkage toward the grand mean over raw relativities.",
          "Call out: causality ≠ correlation; fairness / regulatory issues (e.g. sex, region); leakage; target definition limits.",
          "One decision line: rating + explainability = SAS GLM · high-cost screening flag = (optional) ML."
        ],
        deliverables: [
          "rate memo PDF 1–2p (assumptions · tables · validation · decision · limitations)",
          "SAS .sas + log / ODS output",
          "relativity table + segment validation table",
          "30-sec script (Health · sponsorship targets)",
          "portfolio card → https://kyeungyoonkim.github.io/"
        ],
        steps: [
          { id: "setup", text: "SAS + insurance.csv IMPORT · LIBNAME · same env as Base exam" },
          { id: "qc", text: "CONTENTS/MEANS/FREQ · missing / outliers · one-line target definition (charges)" },
          { id: "eda", text: "Only 3 business Qs (smoker uplift / high-cost tail / region) · SGPLOT 3–4 · insight bullets" },
          { id: "split", text: "train/test (document seed) · leakage checklist (no target-derived features)" },
          { id: "glm", text: "PROC GENMOD/GLM: log or Gamma(log) · core risk factors only" },
          { id: "relativity", text: "exp(Estimate) relativity table · columns: rating candidate vs explain-only" },
          { id: "segment", text: "Segment predicted vs actual / error · flag weak cells" },
          { id: "credibility", text: "Small-sample cells: raw vs shrunk (toward overall mean) — table or short paragraph" },
          { id: "decision", text: "Decision: rating GLM vs screening ML (optional) · state fairness + causality limits" },
          { id: "optional-ml", text: "(Optional) Same-split MAE table vs RF/HGB only — shallow hyperparameters" },
          { id: "optional-dash", text: "(Optional) Streamlit/Tableau: 3 KPIs + relativity summary deploy" },
          { id: "memo", text: "rate memo PDF + README · tie to SAS Base · Kaiser/Cigna 30-sec script" },
          { id: "publish", text: "Public GitHub + portfolio Health card (kyeungyoonkim.github.io) · LinkedIn Featured" }
        ],
        portfolio: "https://kyeungyoonkim.github.io/ · Health rate memo + .sas",
        refs: [
          { text: "Kaggle Medical Cost Personal Datasets", url: "https://www.kaggle.com/datasets/mirichoi0218/insurance" },
          { text: "My portfolio", url: "https://kyeungyoonkim.github.io/" },
          { text: "SAS Certification", url: "https://www.sas.com/en_us/certification.html" }
        ]
      },
      {
        id: "proj-life-term-memo",
        title: "Life · term net premium + assumption memo",
        priority: "P2 · Fall Y1 (with AS 5101 FM)",
        when: "After hackathon deadline (10/30) · with 5101 (FM) · 1p memo before finals",
        tools: {
          primary: "Sheets hand-check → SAS DATA step reproduce",
          also: "Python/R reproduce OK · FM calculator for intuition",
          detail: [
            "Deliverable = pricing assumption memo (1p) + calc tables",
            "Scope lock: n-year term · net premium only (no expense / reserve / tax) — memo must say why excluded",
            "Full hand calc in Sheets for one case → SAS assert same numbers",
            "Scenarios: i grid + qx scale + (optional) one more issue age or term"
          ]
        },
        dataset: {
          name: "SSA Period Life Table (public)",
          kaggle: "https://www.ssa.gov/oact/STATS/table4c6.html",
          note: "Keep csv in repo · document table year, sex, period assumptions"
        },
        why: "Pacific Life / Corebridge / Milliman Life interviews. Ties to FM · assumption documentation is the differentiator.",
        approach: [
          "Success = numbers match + you can say what else is needed for a real-world gross premium.",
          "Base case e.g. age 35 · 10-year term · i=4% · benefit = 1.",
          "Sensitivity: i=3/4/5% · qx×0.9/1.0/1.1 — one table.",
          "Limitations: no select/ultimate, mortality improvement, expenses, reserves, participating features.",
          "Script: problem → assumptions → NSP → sensitivity → one-line real-world extension."
        ],
        deliverables: [
          "assumption memo 1p (assumptions · scope · limitations · practice gap)",
          "Sheets + SAS (numbers match)",
          "interest + mortality sensitivity table",
          "30-sec script (Pacific Life / Milliman)",
          "portfolio Life card"
        ],
        steps: [
          { id: "fetch", text: "SSA table → data/life_table.csv · record source / year / sex meta" },
          { id: "assume", text: "Lock assumptions: x, n, i, benefit, period table, net only — draft memo first" },
          { id: "sheet", text: "Sheets: qx→px→v^t→PV of benefits→NSP/level premium · one case by hand" },
          { id: "sas", text: "SAS DATA step same logic · match Sheets to digit precision" },
          { id: "sens", text: "i · qx scale grid (+ optional: change x or n once)" },
          { id: "gap", text: "Memo practice gap: expense loading, reserve, mortality improvement, underwriting" },
          { id: "write", text: "assumption memo PDF + README · Pacific Life/Milliman 30-sec script" },
          { id: "publish", text: "GitHub + portfolio Life card · one resume line" }
        ],
        portfolio: "https://kyeungyoonkim.github.io/ · Life assumption memo + Sheets/SAS",
        refs: [
          { text: "SSA Actuarial Life Tables", url: "https://www.ssa.gov/oact/STATS/table4c6.html" },
          { text: "Human Mortality Database", url: "https://www.mortality.org/" },
          { text: "My portfolio", url: "https://kyeungyoonkim.github.io/" }
        ]
      }
    ];

    // Separate from portfolio: research track (disability · equity · SOA Life/Health)
    const RESEARCH_TRACK = {
      title: "Research track (separate from portfolio)",
      intro: "Portfolio = interview artifacts. This tab = possible Dr. Shi / paper-shaped work. Theme: disability, equity, fairer access — still SOA Life/Health (not CAS). Start after Exam P; bring a 1-page question to Shi, not a finished Kaggle notebook.",
      vsPortfolio: [
        "Projects tab = Health rate memo + Life assumption memo (hackathon OK).",
        "Research tab = literature + real question + better data → possible RA / working paper.",
        "Do not ask Shi to ‘turn the Kaggle GLM into a paper.’ Ask which equity/disability question is researchable with his lab."
      ],
      howToPitchShi: {
        title: "How to ask Dr. Shi",
        bullets: [
          "Timing: after Exam P (late Sep) · 20–30 min · bring 1-pager.",
          "Say: interested in disability / equity in Life or Health actuarial work; want a research question, not portfolio polish.",
          "Show: short list of 2–3 topics below · ask which fits his agenda / available data.",
          "Offer: lit review + SAS/R coding help · F-1 / CPT later if RA exists.",
          "Avoid: ‘I already have a paper idea on Kaggle medical cost.’"
        ]
      },
      topics: [
        {
          id: "res-di-equity",
          title: "Disability insurance (DI / LTD): fairness, access, claim outcomes",
          fit: "Life · group benefits · Pacific Life / Milliman / carrier DI teams",
          paperPotential: "Medium–high if you get claim or public DI-related data + a sharp question",
          question: "How do underwriting rules, occupation class, or benefit design affect access and claim duration for people with disabilities — and where does ‘risk’ vs unfair exclusion show up?",
          whyYou: "Directly matches disability + equity interest; still classic actuarial (incidence, termination, RTW).",
          approach: [
            "Lit: SOA DI / group LTD papers · NAIC disability tables · RTW literature.",
            "Methods: survival / multi-state (healthy–disabled–recovered) or GLM on incidence/duration.",
            "Equity angle: which rating factors are predictive vs exclusionary; transparency of assumptions.",
            "Data path: public summaries first; ask Shi / Temple about proprietary or partnership data."
          ],
          firstSteps: [
            { id: "lit1", text: "Read 2–3 SOA DI/LTD overview papers · 10 bullet notes" },
            { id: "q1", text: "Write 5 candidate research questions · pick top 2 with Shi" },
            { id: "data1", text: "List feasible data (public vs need-intro) · one page" }
          ],
          refs: [
            { text: "SOA research (search disability / LTD)", url: "https://www.soa.org/" },
            { text: "SOA PD Edge", url: "https://www.soa.org/prof-dev/pd-edge/" }
          ]
        },
        {
          id: "res-health-disability",
          title: "Health actuarial + disability / chronic conditions (access & benefit design)",
          fit: "Health · Kaiser / Blues / Cigna · HCM 5101 overlap",
          paperPotential: "Medium · stronger with claims or MEPS/Medicare disability cohorts",
          question: "How do plan design and risk adjustment treat members with disabilities or high chronic burden — and what are the equity tradeoffs in premiums, cost-sharing, or network access?",
          whyYou: "Health path + fairness; can connect to disability status / functional limitation measures in survey data.",
          approach: [
            "Start with public survey data (e.g. MEPS, BRFSS, ACS disability questions) — not Kaggle toy.",
            "Focus: utilization, OOP, unmet need, or risk-score residuals by disability marker.",
            "Actuarial hook: risk adjustment fairness, benefit design, high-cost prediction with fairness constraints.",
            "Write as Health equity + pricing/risk memo that can grow into empirical paper."
          ],
          firstSteps: [
            { id: "data2", text: "Pick one public dataset (MEPS or similar) · document disability variables" },
            { id: "eda2", text: "Descriptive equity gaps table (utilization / OOP / access) — no fancy ML yet" },
            { id: "shi2", text: "Ask Shi if Health equity + actuarial framing fits his supervision" }
          ],
          refs: [
            { text: "MEPS (AHRQ)", url: "https://meps.ahrq.gov/mepsweb/" },
            { text: "CDC disability & health", url: "https://www.cdc.gov/ncbddd/disabilityandhealth/index.html" }
          ]
        },
        {
          id: "res-ltc-aging",
          title: "Long-term care / aging with disability",
          fit: "Life · LTC · Health crossover",
          paperPotential: "Medium · crowded field; need a narrow angle (e.g. underinsurance, informal care, Medicaid spend-down)",
          question: "Who is left underinsured for LTC needs related to disability, and how do product / public program designs create unequal protection?",
          whyYou: "Disability across the life course; strong social-impact story for SOA Life/Health.",
          approach: [
            "Lit: SOA LTC experience studies · Medicaid LTC · informal caregiving.",
            "Possible angle: transition probabilities, product take-up by disability/income, or fairness of underwriting.",
            "Only pursue if Shi has LTC interest or data path."
          ],
          firstSteps: [
            { id: "lit3", text: "Skim 1 SOA LTC study + 1 Medicaid LTC explainer · notes" },
            { id: "fit3", text: "Ask Shi: LTC in his lab? yes/no gate" }
          ],
          refs: [
            { text: "SOA.org search: long-term care", url: "https://www.soa.org/" }
          ]
        },
        {
          id: "res-mh-parity",
          title: "Mental health parity & actuarial costing (equity lens)",
          fit: "Health · group benefits",
          paperPotential: "Medium · policy-relevant; data access is the bottleneck",
          question: "After parity rules, where do residual disparities remain in MH utilization or plan cost — and how should actuaries measure ‘parity’ beyond legal checklists?",
          whyYou: "Equity / stigma / access; still Health actuarial language (utilization, unit cost, trend).",
          approach: [
            "Policy baseline: MHPAEA · then actuarial measurement gaps.",
            "Empirical only if claims or strong public proxy available.",
            "Otherwise: structured lit + measurement framework paper with Shi (methods contribution)."
          ],
          firstSteps: [
            { id: "pol4", text: "One-page MHPAEA summary for actuaries" },
            { id: "gap4", text: "List measurable parity metrics an actuary could track" }
          ],
          refs: [
            { text: "DOL MHPAEA", url: "https://www.dol.gov/agencies/ebsa/laws-and-regulations/laws/mental-health-and-substance-use-disorder-parity" }
          ]
        },
        {
          id: "res-fair-rating",
          title: "Fairness in actuarial rating (protected attributes vs risk)",
          fit: "Cross Life/Health · interview + research",
          paperPotential: "High interest area · hard to publish without careful ethics + data; good lit-review entry",
          question: "When is a risk factor actuarially justified vs socially unacceptable for pricing or underwriting — especially for disability-related information?",
          whyYou: "Ties portfolio language (fairness, causality) to a real research program.",
          approach: [
            "Lit: actuarial fairness, anti-discrimination insurance law, proxy discrimination.",
            "Possible project: simulation / conceptual framework first; empirics later.",
            "Portfolio Health memo can cite this lit; research goes deeper than the memo."
          ],
          firstSteps: [
            { id: "lit5", text: "Collect 5 papers/notes on insurance fairness & disability" },
            { id: "map5", text: "Map: rating · underwriting · claims · which stage equity bites" }
          ],
          refs: [
            { text: "SOA Candidate Events / research culture", url: "https://www.soa.org/future-actuaries/candidate-events/" }
          ]
        }
      ],
      timeline: [
        { when: "Now → 9/21", what: "Exam P only · optional: skim 1 DI or health-equity article" },
        { when: "9/22 → 10/30", what: "Portfolio Health + SAS hackathon · Research = only Shi 1-pager draft (don’t compete with hackathon)" },
        { when: "Nov–Dec", what: "Meet Shi · pick 1 topic · start lit review · confirm data path" },
        { when: "Spring 2027", what: "If matched: RA-style empirics with 5108/PA skills · draft working paper outline" }
      ],
      processSteps: [
        { id: "sep", text: "Keep portfolio vs research mentally separate (this tab vs Projects)" },
        { id: "onepager", text: "Write 1-pager: theme (disability/equity) + top 2 topics + what you can offer (SAS, hours/week)" },
        { id: "email", text: "Email Dr. Shi for meeting (after P) · attach 1-pager" },
        { id: "pick", text: "Leave meeting with ONE topic + next deliverable date" },
        { id: "lit", text: "4–6 week lit review memo (not code-first)" },
        { id: "data", text: "Data feasibility check with Shi before modeling" },
        { id: "scope", text: "Only then: analysis plan → possible working paper" }
      ]
    };

    // 커리어: SOA · Life/Health · 서부 · 스폰 위주
    const CAREER_EVENT_GUIDE = {
      title: "커리어 타깃 · 컨퍼런스 · 스폰 (내 기준)",
      intro: "경로: SOA · Life/Health · CAS 안 함 · F-1 → CPT → OPT → H-1B → green card(EB) · 서부 정착. ‘유학생은 취업 불가’는 과장 — 어렵지만 Plan A/B/C로 관리. 이벤트 목표: 참석 → LinkedIn → 커피챗 1명.",
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
      },
      immigrationPlans: {
        title: "US permanent residency · Plan A / B / C (내 기준)",
        reality: "‘유학생은 취업 불가능’은 틀림. Actuarial + exams + sponsorship-aware targeting은 실제로 뽑힘. 다만 H-1B lottery·경기·회사 정책 때문에 한 줄 계획만으론 불안한 게 정상. 목표 = green card(영주권)까지 여러 레일.",
        notLegalAdvice: "Not legal advice — ISSS + immigration attorney when filing. Rules change.",
        plans: [
          {
            id: "A",
            name: "Plan A — Stay on SOA Life/Health track (default)",
            goal: "US job → H-1B → employer green card (EB-2/EB-3 PERM)",
            steps: [
              "Now–grad: Exam P + UEC + SAS + 1 Health portfolio + CPT/OPT-ready résumé",
              "Internships: CPT PT → summer CPT FT at sponsorship-friendly Life/Health (Milliman, Pacific Life, health plans, WTW/Aon/Mercer Life/Health)",
              "Post-grad: STEM OPT (MS) if eligible · work full-time · employer files H-1B (multiple years if needed)",
              "After H-1B (or sometimes earlier): employer starts PERM → I-140 → green card (EB-2 common for master’s)",
              "Mindset: apply where LCA/H-1B history exists · say visa need early but after showing exam/skill value"
            ],
            greenCard: "Most actuaries: employer-sponsored EB-2/EB-3. Slow but standard."
          },
          {
            id: "B",
            name: "Plan B — Same US goal, wider rails (if Plan A stalls)",
            goal: "Still US PR · reduce ‘pure actuarial analyst at one carrier’ bottleneck",
            steps: [
              "Widen roles: actuarial analyst + health analytics, pricing ops, risk, valuation support, consulting analyst (still Life/Health)",
              "Cap-exempt H-1B try: university, some nonprofits / research / hospital systems (lottery-exempt) — keep SOA exams going",
              "Temple/Fox: RA with Dr. Shi if paid/CPT-able · builds network + possible longer runway",
              "Multi-year H-1B strategy: file each lottery year on OPT/STEM OPT/cap-gap · don’t freeze life for one lottery",
              "Geography flexibility: still prefer West, but take sponsorship-strong offer elsewhere first → transfer west later",
              "EB-2 NIW (self-petition) later only if research/impact case is real — disability/equity research can help long-term, not year-1"
            ],
            greenCard: "Still mostly employer PERM; NIW is Plan B+ after strong record — not a freshman backup fantasy."
          },
          {
            id: "C",
            name: "Plan C — Keep US PR dream, change country timing (bridge)",
            goal: "Don’t lose the end goal if US timing breaks · bridge then return or parallel PR",
            steps: [
              "Canada: actuarial jobs + clearer PR pathways (Express Entry / provincial) — SOA exams still travel; many return or dual-track US later",
              "Extra US runway: another STEM master’s / PhD only if funding + clear visa math (don’t do degree just to stall) — full PhD path = Plan D",
              "Korea bridge: work 1–2 yrs at global insurer/consulting that transfers to US later (intra-company) — rare but real",
              "Maintain US-ready file always: exams, SAS, LinkedIn, US references, OPT unused carefully timed",
              "Emotional rule: Plan C is a bridge, not ‘give up US.’ Re-enter when lottery/employer/market opens"
            ],
            greenCard: "Canada PR can be faster; US GC later via employer/transfer/marriage/NIW depending on life — pick with a lawyer when real."
          },
          {
            id: "D",
            name: "Plan D — PhD admission (US runway + research → stronger GC story)",
            goal: "PhD (STEM) for longer F-1 runway, RA/TA funding, cap-exempt possible, then industry or academic hire → H-1B/EB or NIW",
            steps: [
              "When to flip: if OPT/H-1B math looks bad, or you love research (disability/equity + actuarial/stats) more than rushing industry",
              "Target fields that keep SOA door open: actuarial science, statistics, biostatistics, risk/insurance economics, health services research — not random PhD",
              "Funding first: RA/TA / fellowship · avoid self-pay PhD as immigration stall",
              "Use Research tab + Dr. Shi: lit review, letter, methods — application packet needs research fit not just GPA",
              "Timeline sketch: applications ~Fall Y2 / after MS momentum · start PhD ~2028+ if needed (don’t quit MS early without offer)",
              "During PhD: keep 1–2 SOA exams/modules warm · summer industry or research internships when CPT allows",
              "Exit: industry actuarial/analytics with PhD premium, university/nonprofit cap-exempt, or EB-2 NIW if publication/impact case is real"
            ],
            greenCard: "PhD is not automatic PR. It buys time + credentials. GC still usually employer PERM, cap-exempt job, or later NIW — lawyer when concrete."
          }
        ],
        nearTermActions: [
          "This week feeling: anxiety ≠ signal that Plan A is dead — signal to build B/C/D rails on paper",
          "Until 9/21: Exam P only (best immigration move right now = pass exams)",
          "Fall: ISSS CPT/OPT info session · calendar STEM OPT eligibility",
          "Applications: only sponsorship-aware list (Career tab companies) · track in pipeline",
          "After P: Dr. Shi research talk (equity/disability) = Plan B skill + Plan D PhD letters later",
          "Every Dec: update ‘visa runway’ note — OPT end date, H-1B attempts, Plan C country, Plan D apply-or-not decision date"
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
