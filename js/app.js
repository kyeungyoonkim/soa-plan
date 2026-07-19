// 비밀번호 변경: 터미널에서 `echo -n "새비밀번호" | shasum -a 256` 실행 후 아래 해시 교체
    const PASSWORD_HASH = "86401a209848e781231c32dd381066cef1a4ac0879cb333ca23f57603749b39b";
    const AUTH_KEY = "soa-asa-auth-v1";

    async function sha256(text) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    function isAuthed() {
      return sessionStorage.getItem(AUTH_KEY) === "1" || localStorage.getItem(AUTH_KEY) === "1";
    }

    function setAuthed(remember) {
      sessionStorage.setItem(AUTH_KEY, "1");
      if (remember) localStorage.setItem(AUTH_KEY, "1");
    }

    function unlockApp() {
      document.body.classList.remove("locked");
      document.getElementById("auth-gate").hidden = true;
    }

let state;
    let checklistFilter = "all";

    function cloneDefaultFlashDecks() {
      return DEFAULT_FLASH_DECKS.map(d => ({
        id: d.id,
        name: d.name,
        cards: d.cards.map(c => ({ ...c }))
      }));
    }

    function mergeDefaultDeckContent(decks) {
      const out = Array.isArray(decks) ? decks.map(d => ({ ...d, cards: [...(d.cards || [])] })) : [];
      DEFAULT_FLASH_DECKS.forEach(def => {
        const idx = out.findIndex(d => d.id === def.id);
        const fresh = { id: def.id, name: def.name, cards: def.cards.map(c => ({ ...c })) };
        if (idx >= 0) out[idx] = fresh;
        else out.push(fresh);
      });
      return out.length ? out : cloneDefaultFlashDecks();
    }

    function resolveFlashFields(p) {
      const hasDecks = p && p.flashDecks && p.flashDecks.length > 0;
      const needsUpgrade = !p || p.flashDeckVersion !== FLASH_DECK_VERSION;
      let flashDecks = hasDecks ? p.flashDecks : cloneDefaultFlashDecks();
      if (needsUpgrade) flashDecks = mergeDefaultDeckContent(flashDecks);
      return {
        flashDecks,
        flashActiveDeckId: (p && p.flashActiveDeckId) || DEFAULT_FLASH_DECKS[0].id,
        flashStudyIndex: (p && p.flashStudyIndex) || 0,
        flashDeckVersion: FLASH_DECK_VERSION
      };
    }

    function defaultState() {
      const flash = resolveFlashFields(null);
      return {
        reqChecked:{}, timelineChecked:{}, templeChecked:{}, examStatus:{},
        weeklyMemo:"", adminMemo:"",
        studyLogs:[], checklistFilter:"all", schedule:[],
        weeklyStudyGoal:600, budgetSpent:0,
        flashDecks: flash.flashDecks,
        flashActiveDeckId: flash.flashActiveDeckId,
        flashStudyIndex: flash.flashStudyIndex,
        flashDeckVersion: flash.flashDeckVersion,
        pomodoro:{ workMin:25, breakMin:5, todayCount:0, lastDate:"", topic:"" },
        careerPipeline:[]
      };
    }

    function ensureCareer() {
      if (!state.careerPipeline) state.careerPipeline = [];
    }

    function careerCardHtml(item) {
      const type = CAREER_TYPE_LABELS[item.type] || item.type;
      const date = item.updatedAt || item.createdAt || "";
      const notes = item.notes ? `<div class="meta">${item.notes}</div>` : "";
      const contact = item.contact ? `<div class="meta">${item.contact}</div>` : "";
      const next = CAREER_ADVANCE[item.status];
      const actions = [];
      if (next) actions.push(`<button type="button" data-career-advance="${item.id}">다음</button>`);
      if (!CAREER_CLOSED_STATUSES.includes(item.status)) {
        actions.push(`<button type="button" data-career-reject="${item.id}">탈락</button>`);
        actions.push(`<button type="button" data-career-withdraw="${item.id}">철회</button>`);
      }
      actions.push(`<button type="button" data-career-delete="${item.id}">삭제</button>`);
      return `<div class="career-card" data-id="${item.id}">
        <div class="co">${item.company}</div>
        <div class="role">${item.role || "—"}</div>
        <div class="meta">${type}${date ? " · " + date : ""}</div>
        ${contact}${notes}
        <div class="career-card-actions">${actions.join("")}</div>
      </div>`;
    }

    function bindCareerActions(root) {
      if (!root) return;
      root.querySelectorAll("[data-career-advance]").forEach(btn => {
        btn.onclick = () => {
          const item = state.careerPipeline.find(x => x.id === btn.dataset.careerAdvance);
          if (!item) return;
          const next = CAREER_ADVANCE[item.status];
          if (next) { item.status = next; item.updatedAt = new Date().toISOString().slice(0,10); saveState(); }
        };
      });
      root.querySelectorAll("[data-career-reject]").forEach(btn => {
        btn.onclick = () => {
          const item = state.careerPipeline.find(x => x.id === btn.dataset.careerReject);
          if (item) { item.status = "rejected"; item.updatedAt = new Date().toISOString().slice(0,10); saveState(); }
        };
      });
      root.querySelectorAll("[data-career-withdraw]").forEach(btn => {
        btn.onclick = () => {
          const item = state.careerPipeline.find(x => x.id === btn.dataset.careerWithdraw);
          if (item) { item.status = "withdrawn"; item.updatedAt = new Date().toISOString().slice(0,10); saveState(); }
        };
      });
      root.querySelectorAll("[data-career-delete]").forEach(btn => {
        btn.onclick = () => {
          if (!confirm("삭제할까요?")) return;
          state.careerPipeline = state.careerPipeline.filter(x => x.id !== btn.dataset.careerDelete);
          saveState();
        };
      });
    }

    function renderCareer() {
      ensureCareer();
      const items = state.careerPipeline;
      const active = items.filter(i => !CAREER_CLOSED_STATUSES.includes(i.status));
      const closed = items.filter(i => CAREER_CLOSED_STATUSES.includes(i.status));
      const count = s => items.filter(i => i.status === s).length;

      document.getElementById("careerStats").innerHTML = `
        <div class="card"><div class="card-title">진행 중</div><div class="career-stat-num">${active.length}</div></div>
        <div class="card"><div class="card-title">지원</div><div class="career-stat-num">${count("applied")}</div></div>
        <div class="card"><div class="card-title">인터뷰</div><div class="career-stat-num">${count("interview")}</div></div>
        <div class="card"><div class="card-title">오퍼</div><div class="career-stat-num">${count("offer")}</div></div>`;

      document.getElementById("careerBoard").innerHTML = CAREER_COLUMNS.map(col => {
        const colItems = items.filter(i => i.status === col.id);
        return `<div class="career-col">
          <div class="career-col-title">${col.label}<span class="career-col-count">${colItems.length}</span></div>
          ${colItems.map(careerCardHtml).join("") || `<div class="meta">없음</div>`}
        </div>`;
      }).join("");
      bindCareerActions(document.getElementById("careerBoard"));

      const closedEl = document.getElementById("careerClosed");
      closedEl.innerHTML = closed.length
        ? closed.map(careerCardHtml).join("")
        : `<div class="meta">탈락·철회 항목 없음</div>`;
      bindCareerActions(closedEl);
    }

    function bindCareerForm() {
      if (bindCareerForm.done) return;
      bindCareerForm.done = true;
      document.getElementById("btnCareerAdd").onclick = () => {
        const company = document.getElementById("careerCompany").value.trim();
        const role = document.getElementById("careerRole").value.trim();
        if (!company) { toast("회사/기관 입력"); return; }
        ensureCareer();
        state.careerPipeline.push({
          id: uid(),
          company,
          role,
          type: document.getElementById("careerType").value,
          status: document.getElementById("careerStatus").value,
          contact: document.getElementById("careerContact").value.trim(),
          notes: document.getElementById("careerNotes").value.trim(),
          createdAt: new Date().toISOString().slice(0,10),
          updatedAt: new Date().toISOString().slice(0,10)
        });
        document.getElementById("careerCompany").value = "";
        document.getElementById("careerRole").value = "";
        document.getElementById("careerContact").value = "";
        document.getElementById("careerNotes").value = "";
        saveState();
        toast("커리어 항목 추가");
      };
    }

    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

    function migrateExamStatus(reqChecked, existing) {
      const es = { ...(existing || {}) };
      EXAM_IDS.forEach(id => {
        if (es[id]) return;
        if (reqChecked && reqChecked[id]) es[id] = "passed";
        else es[id] = "pending";
      });
      return es;
    }

    function applyFall2026Schedule() {
      return DEFAULT_FALL_2026_SCHEDULE.map(c => ({ ...c }));
    }

    function withDefaultSchedule(st) {
      if ((st.schedule || []).length === 0) {
        return { ...st, schedule: applyFall2026Schedule() };
      }
      return st;
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const v5 = localStorage.getItem("soa-asa-plan-v5");
        const v4 = localStorage.getItem("soa-asa-plan-v4");
        const v3 = localStorage.getItem("soa-asa-plan-v3");
        const base = defaultState();
        if (raw) {
          const p = JSON.parse(raw);
          const reqChecked = p.reqChecked || {};
          return withDefaultSchedule({
            ...base, ...p,
            reqChecked,
            timelineChecked: p.timelineChecked || {},
            templeChecked: p.templeChecked || {},
            examStatus: migrateExamStatus(reqChecked, p.examStatus),
            ...resolveFlashFields(p)
          });
        }
        if (v5) {
          const p = JSON.parse(v5);
          const reqChecked = p.reqChecked || {};
          return withDefaultSchedule({
            ...base, ...p,
            reqChecked,
            timelineChecked: p.timelineChecked || {},
            templeChecked: p.templeChecked || {},
            examStatus: migrateExamStatus(reqChecked, p.examStatus),
            schedule: p.schedule || []
          });
        }
        if (v4) {
          const p = JSON.parse(v4);
          const reqChecked = p.checked || {};
          return withDefaultSchedule({
            ...base, ...p,
            reqChecked,
            timelineChecked: {},
            templeChecked: {},
            examStatus: migrateExamStatus(reqChecked),
            schedule: p.schedule || []
          });
        }
        if (v3) {
          const p = JSON.parse(v3);
          const reqChecked = p.checked || {};
          return withDefaultSchedule({
            ...base,
            reqChecked,
            examStatus: migrateExamStatus(reqChecked),
            schedule: p.schedule || []
          });
        }
        return withDefaultSchedule({ ...base, examStatus: migrateExamStatus({}) });
      } catch { return withDefaultSchedule({ ...defaultState(), examStatus: migrateExamStatus({}) }); }
    }

    function saveState(quiet) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      scheduleCloudSync();
      if (!quiet) toast("저장됨");
      render();
    }

    const DRIVE_HANDLE_DB = "soa-asa-drive";
    const DRIVE_HANDLE_STORE = "handles";
    const DRIVE_HANDLE_KEY = "backup-file";
    let cloudFileHandle = null;
    let cloudSyncTimer = null;
    let cloudSyncing = false;

    function cloudSyncSupported() {
      return "showSaveFilePicker" in window && "indexedDB" in window;
    }

    function openHandleDB() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(DRIVE_HANDLE_DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(DRIVE_HANDLE_STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }

    async function storeFileHandle(handle) {
      const db = await openHandleDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DRIVE_HANDLE_STORE, "readwrite");
        tx.objectStore(DRIVE_HANDLE_STORE).put(handle, DRIVE_HANDLE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    async function loadStoredFileHandle() {
      const db = await openHandleDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DRIVE_HANDLE_STORE, "readonly");
        const req = tx.objectStore(DRIVE_HANDLE_STORE).get(DRIVE_HANDLE_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    }

    async function clearStoredFileHandle() {
      const db = await openHandleDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DRIVE_HANDLE_STORE, "readwrite");
        tx.objectStore(DRIVE_HANDLE_STORE).delete(DRIVE_HANDLE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    async function verifyFilePermission(handle, write) {
      const opts = { mode: write ? "readwrite" : "read" };
      if ((await handle.queryPermission(opts)) === "granted") return true;
      if ((await handle.requestPermission(opts)) === "granted") return true;
      return false;
    }

    function updateCloudSyncUI(mode, detail) {
      const el = document.getElementById("cloudSyncStatus");
      const btnConnect = document.getElementById("btnConnectDrive");
      const btnDisconnect = document.getElementById("btnDisconnectDrive");
      const btnRestore = document.getElementById("btnRestoreDrive");
      if (!el) return;

      el.className = "cloud-status";
      if (mode === "unsupported") {
        el.classList.add("warn");
        el.textContent = "Drive 자동 저장: Chrome에서만 가능 (Safari·Firefox 불가)";
        btnConnect.textContent = "Drive 파일 연결 (Chrome)";
        btnConnect.hidden = false;
        btnDisconnect.hidden = true;
        btnRestore.hidden = true;
        return;
      }
      if (mode === "connected") {
        el.classList.add("ok");
        el.textContent = "Drive 자동 저장 중 · " + (detail || "연결됨");
        btnConnect.textContent = "Drive 파일 변경";
        btnConnect.hidden = false;
        btnDisconnect.hidden = false;
        btnRestore.hidden = false;
        return;
      }
      if (mode === "permission") {
        el.classList.add("warn");
        el.textContent = "Drive 권한 필요 · 「Drive 파일 연결」 다시 클릭";
        btnConnect.textContent = "Drive 권한 허용";
        btnConnect.hidden = false;
        btnDisconnect.hidden = false;
        btnRestore.hidden = false;
        return;
      }
      if (mode === "syncing") {
        el.classList.add("ok");
        el.textContent = "Drive 저장 중…";
        return;
      }
      if (mode === "error") {
        el.classList.add("warn");
        el.textContent = "Drive 저장 실패 · 다시 연결해 주세요";
        btnConnect.textContent = "Drive 파일 연결";
        btnConnect.hidden = false;
        btnDisconnect.hidden = true;
        btnRestore.hidden = true;
        return;
      }
      el.textContent = "Google Drive 자동 저장: 연결 안 됨 (Chrome + Drive Desktop 권장)";
      btnConnect.textContent = "Drive 파일 연결";
      btnConnect.hidden = false;
      btnDisconnect.hidden = true;
      btnRestore.hidden = true;
    }

    async function writeStateToCloudFile() {
      if (!cloudFileHandle || !state || cloudSyncing) return;
      cloudSyncing = true;
      updateCloudSyncUI("syncing");
      try {
        if (!(await verifyFilePermission(cloudFileHandle, true))) {
          updateCloudSyncUI("permission", cloudFileHandle.name);
          return;
        }
        const writable = await cloudFileHandle.createWritable();
        await writable.write(JSON.stringify(state, null, 2));
        await writable.close();
        updateCloudSyncUI("connected", cloudFileHandle.name);
      } catch {
        cloudFileHandle = null;
        await clearStoredFileHandle();
        updateCloudSyncUI("error");
      } finally {
        cloudSyncing = false;
      }
    }

    function scheduleCloudSync() {
      if (!cloudFileHandle) return;
      clearTimeout(cloudSyncTimer);
      cloudSyncTimer = setTimeout(() => writeStateToCloudFile(), 900);
    }

    async function connectCloudFile() {
      if (!cloudSyncSupported()) {
        toast("Chrome에서만 Drive 연결 가능");
        return;
      }
      if (cloudFileHandle && (await verifyFilePermission(cloudFileHandle, true))) {
        await writeStateToCloudFile();
        updateCloudSyncUI("connected", cloudFileHandle.name);
        toast("Drive 저장 완료");
        return;
      }
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: "my-asa-plan-backup.json",
          types: [{ description: "JSON Backup", accept: { "application/json": [".json"] } }]
        });
        cloudFileHandle = handle;
        await storeFileHandle(handle);
        await writeStateToCloudFile();
        toast("Drive 파일 연결됨");
      } catch (e) {
        if (e && e.name !== "AbortError") toast("Drive 연결 실패");
      }
    }

    async function disconnectCloudFile() {
      cloudFileHandle = null;
      clearTimeout(cloudSyncTimer);
      await clearStoredFileHandle();
      updateCloudSyncUI("disconnected");
      toast("Drive 연결 해제");
    }

    async function restoreFromCloudFile() {
      if (!cloudFileHandle) { toast("Drive 파일 먼저 연결"); return; }
      if (!(await verifyFilePermission(cloudFileHandle, false))) {
        updateCloudSyncUI("permission", cloudFileHandle.name);
        return;
      }
      if (!confirm("Drive 파일 내용으로 이 브라우저 데이터를 덮어쓸까요?")) return;
      try {
        const file = await cloudFileHandle.getFile();
        const p = JSON.parse(await file.text());
        applyBackupPayload(p);
        toast("Drive에서 복원 완료");
      } catch {
        toast("Drive 파일 읽기 실패");
      }
    }

    async function initCloudSync() {
      if (!cloudSyncSupported()) {
        updateCloudSyncUI("unsupported");
        return;
      }
      try {
        const handle = await loadStoredFileHandle();
        if (!handle) {
          updateCloudSyncUI("disconnected");
          return;
        }
        cloudFileHandle = handle;
        if (await verifyFilePermission(handle, true)) {
          updateCloudSyncUI("connected", handle.name);
          await writeStateToCloudFile();
        } else {
          updateCloudSyncUI("permission", handle.name);
        }
      } catch {
        updateCloudSyncUI("disconnected");
      }
    }

    function toast(msg) {
      const el = document.getElementById("toast");
      el.textContent = msg;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 1400);
    }

    function switchTab(name) {
      document.querySelectorAll(".nav button").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
      document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
    }
    window.switchTab = switchTab;

    function openBackupSection() {
      switchTab("backup");
    }
    window.openBackupSection = openBackupSection;

    function isReqChecked(id) { return !!state.reqChecked[id]; }
    function isTimelineChecked(id) { return !!state.timelineChecked[id]; }
    function isTempleChecked(id) { return !!state.templeChecked[id]; }
    function isExamReq(id) { return EXAM_IDS.includes(id); }
    function getExamStatus(id) { return state.examStatus[id] || "pending"; }
    function isReqDone(id) {
      if (isExamReq(id)) return getExamStatus(id) === "passed";
      return isReqChecked(id);
    }
    function setExamStatus(id, status) {
      if (!isExamReq(id)) return;
      state.examStatus[id] = status;
      delete state.reqChecked[id];
      saveState();
    }
    function toggleReq(id) { state.reqChecked[id] = !state.reqChecked[id]; saveState(); }
    function toggleTimeline(id) { state.timelineChecked[id] = !state.timelineChecked[id]; saveState(true); }
    function toggleTemple(id) { state.templeChecked[id] = !state.templeChecked[id]; saveState(); }

    function countProgress(ids, isFn) {
      const done = ids.filter(isFn).length;
      return { done, total: ids.length, pct: ids.length ? Math.round(done/ids.length*100) : 0, left: ids.length - done };
    }

    function getReqProgress(ids) { return countProgress(ids, id => isReqDone(id)); }
    function getTimelineProgress(ids) { return countProgress(ids, id => isTimelineChecked(id)); }

    function getTempleCreditProgress() {
      const doneCr = TEMPLE_COURSES.filter(c => isTempleChecked(c.id)).reduce((s,c) => s + c.credits, 0);
      const pct = Math.round(doneCr / TEMPLE_TOTAL_CREDITS * 100);
      return { doneCr, total: TEMPLE_TOTAL_CREDITS, pct, remainingPct: 100 - pct, leftCr: TEMPLE_TOTAL_CREDITS - doneCr };
    }

    function getCurrentPhase() {
      const today = new Date().toISOString().slice(0,10);
      for (const p of PHASES) if (today >= p.start && today <= p.end) return p;
      return today < PHASES[0].start ? PHASES[0] : PHASES[PHASES.length-1];
    }

    function daysUntil(dateStr) {
      return Math.ceil((new Date(dateStr+"T00:00:00") - new Date(new Date().toDateString())) / 86400000);
    }

    function fmtDday(d) {
      if (d > 0) return "D-" + d;
      if (d === 0) return "D-Day";
      return "D+" + Math.abs(d);
    }

    function allReqIds() { return REQUIREMENTS.map(r => r.id); }
    function asaReqIds() { return ASA_IDS; }

    function getProgress(ids) { return getReqProgress(ids); }

    function getAllTimelineIds() {
      const ids = new Set();
      PHASES.forEach(p => p.tasks.forEach(t => ids.add(t.id)));
      return [...ids];
    }

    function getPhaseProgress(phase) {
      return getTimelineProgress(phase.tasks.map(t => t.id));
    }

    function getNextMilestone() {
      const today = new Date().toISOString().slice(0,10);
      for (const m of MILESTONES) if (m.date >= today && !isReqDone(m.taskId)) return m;
      return MILESTONES[MILESTONES.length-1];
    }

    function bindTaskList(container, mode) {
      const toggleFn = mode === "timeline" ? toggleTimeline : mode === "temple" ? toggleTemple : toggleReq;
     
      container.querySelectorAll("li[data-id]").forEach(li => {
        li.onclick = e => { if (e.target.tagName !== "INPUT") toggleFn(li.dataset.id); };
        li.querySelector("input").onclick = e => { e.stopPropagation(); toggleFn(li.dataset.id); };
      });
    }

    function timelineTaskLi(t) {
      return `<li class="${isTimelineChecked(t.id)?"checked":""}${t.highlight?" highlight":""}" data-id="${t.id}">
        <input type="checkbox" ${isTimelineChecked(t.id)?"checked":""}/>
        <div><div class="task-text">${t.text}</div>${t.meta?`<div class="task-meta">${t.meta}</div>`:""}</div></li>`;
    }

    function setRing(id, pct, txt) {
      document.getElementById(id).style.strokeDashoffset = CIRC - (CIRC * pct / 100);
      document.getElementById(id + "Txt").textContent = txt;
    }

    function getMotivate(pct, remaining) {
      if (pct >= 100) return "ASA 완성! 정말 수고했어.";
      if (pct >= 80) return "거의 다 왔어! 마지막 스퍼트만.";
      if (pct >= 50) return "절반 넘었어. 이 속도면 충분해.";
      if (pct >= 25) return "기반이 쌓이고 있어. 꾸준히 가자.";
      if (remaining <= 5) return "시작이 반이야. P가 1순위!";
      return "오늘 걷지 않으면 내일 뛰어야 한다";
    }

    function getJourneyPct() {
      const start = new Date(JOURNEY_START+"T00:00:00").getTime();
      const end = new Date(JOURNEY_END+"T00:00:00").getTime();
      const now = Date.now();
      return Math.max(0, Math.min(100, Math.round((now - start) / (end - start) * 100)));
    }

    function getWeekStudyMinutes() {
      const weekStart = getWeekStart();
      return (state.studyLogs || []).filter(l => new Date(l.date + "T00:00:00") >= weekStart).reduce((s, l) => s + (+l.minutes || 0), 0);
    }

    function getWeeklyClassMinutes() {
      const seen = new Set();
      let total = 0;
      (state.schedule || []).forEach(c => {
        const key = c.name + "|" + c.start + "|" + c.end;
        if (seen.has(key)) return;
        seen.add(key);
        const [sh, sm] = c.start.split(":").map(Number);
        const [eh, em] = c.end.split(":").map(Number);
        total += (eh * 60 + em) - (sh * 60 + sm);
      });
      return total;
    }

    function fmtHoursMinutes(mins) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return m ? `${h}h ${m}m` : `${h}h`;
    }

    function applyBackupPayload(p) {
      const reqChecked = p.reqChecked || {};
      state = {
        ...defaultState(), ...p,
        reqChecked,
        timelineChecked: p.timelineChecked || {},
        templeChecked: p.templeChecked || {},
        examStatus: migrateExamStatus(reqChecked, p.examStatus),
        schedule: (p.schedule && p.schedule.length) ? p.schedule : applyFall2026Schedule(),
        ...resolveFlashFields(p),
        flashDeckVersion: FLASH_DECK_VERSION
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      scheduleCloudSync();
      render();
      toast("백업 복원 완료");
    }

    function exportBackup() {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-asa-plan-backup-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("백업 파일 다운로드됨");
    }

    function importBackup(file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          applyBackupPayload(JSON.parse(e.target.result));
        } catch {
          toast("파일 형식 오류");
        }
      };
      reader.readAsText(file);
    }

    function renderExamDeadlines() {
      const el = document.getElementById("examDeadlinesTable");
      if (!el) return;
      el.innerHTML = `<thead><tr><th>시험</th><th>시험 window</th><th>등록 마감</th><th>비고</th></tr></thead><tbody>` +
        EXAM_DEADLINES.map(d => {
          const window = d.examEnd ? `${d.examDate.slice(5)} ~ ${d.examEnd.slice(5)}` : d.examDate;
          let regLabel = "—";
          let cls = "";
          if (d.regDeadline) {
            const regDays = daysUntil(d.regDeadline);
            cls = regDays < 0 ? "deadline-passed" : regDays <= 21 ? "deadline-soon" : "";
            regLabel = regDays < 0 ? "지남" : regDays <= 30 ? fmtDday(regDays) + " · " + d.regDeadline : d.regDeadline;
          } else {
            regLabel = "Closed";
            cls = "deadline-passed";
          }
          return `<tr class="${cls}"><td><strong>${d.exam}</strong></td><td>${window}</td><td>${regLabel}</td><td style="color:var(--muted);font-size:0.78rem">${d.note}</td></tr>`;
        }).join("") + "</tbody>";
    }

    function renderContacts() {
      const el = document.getElementById("contactList");
      if (!el) return;
      el.innerHTML = CONTACTS.map(c => `
        <div class="contact-row">
          <span><strong>${c.role}</strong>${c.name ? " · " + c.name : ""}<br/>
          <span style="color:var(--muted);font-size:0.75rem">${c.note || ""}</span></span>
          <span>${c.email ? `<a href="mailto:${c.email}">${c.email}</a>` : c.url ? `<a href="${c.url}" target="_blank" rel="noopener">열기 →</a>` : ""}</span>
        </div>`).join("");
    }

    function renderWeeklyLoad() {
      const el = document.getElementById("weeklyClassHrs");
      if (!el) return;
      const classMin = getWeeklyClassMinutes();
      const studyGoal = state.weeklyStudyGoal || 600;
      el.textContent = fmtHoursMinutes(classMin) + " 수업 + " + fmtHoursMinutes(studyGoal) + " 공부 ≈ " + fmtHoursMinutes(classMin + studyGoal);
    }

    function renderDashboard() {
      const asa = getProgress(asaReqIds());
      const full = getProgress(allReqIds());
      const remaining = 100 - asa.pct;

      document.getElementById("remainingPct").textContent = remaining + "%";
      document.getElementById("donePctLine").textContent = `ASA 공식 요건 ${asa.pct}% · ${asa.done} / ${asa.total}`;
      document.getElementById("asaPctMini").textContent = asa.pct + "%";
      document.getElementById("fullPctMini").textContent = full.pct + "%";
      document.getElementById("journeyFill").style.width = asa.pct + "%";
      document.getElementById("journeyMid").textContent = asa.pct + "% 완료";
      document.getElementById("motivateMsg").textContent = getMotivate(asa.pct, asa.left);

      const phase = getCurrentPhase();
      const pp = getPhaseProgress(phase);
      document.getElementById("currentPhaseName").textContent = phase.name;
      document.getElementById("phasePct").textContent = pp.pct + "%";
      document.getElementById("phaseBar").style.width = pp.pct + "%";

      const tlAll = getTimelineProgress(getAllTimelineIds());
      document.getElementById("timelineDashPct").textContent = tlAll.pct + "%";
      document.getElementById("timelineDashBar").style.width = tlAll.pct + "%";

      const next = getNextMilestone();
      const days = daysUntil(next.date);
      document.getElementById("countdownDays").textContent = fmtDday(days);
      document.getElementById("countdownLabel").textContent = next.label + " · " + next.date;

      // D-day grid
      document.getElementById("ddayGrid").innerHTML = DDAYS.map(d => {
        const dd = daysUntil(d.date);
        const examSt = isExamReq(d.taskId) ? getExamStatus(d.taskId) : null;
        const done = isReqDone(d.taskId);
        const failed = examSt === "failed";
        const urgent = !done && !failed && dd >= 0 && dd <= 30;
        const dNum = done ? "" : failed ? "재응시" : fmtDday(dd);
        return `<div class="dday-card${urgent?" urgent":""}${done?" done":""}${failed?" urgent":""}">
          <div class="d-num">${dNum}</div>
          <div class="d-label">${d.label}${failed ? " · 불합격" : ""}</div>
          <div class="d-date">${d.date}</div></div>`;
      }).join("");

      // Category bars
      const cats = [
        { label:"시험 (P·PA)", ids: EXAM_IDS, cls:"cat-exam" },
        { label:"VEE", ids: VEE_IDS, cls:"cat-vee" },
        { label:"UEC (FAM·SRM·ASTAM)", ids: UEC_IDS, cls:"cat-uec" },
        { label:"모듈 & FAP", ids: MOD_IDS, cls:"cat-module" },
        { label:"커리어", ids: CAREER_IDS, cls:"cat-career" },
        { label:"행정", ids: ADMIN_IDS, cls:"cat-admin" }
      ];
      document.getElementById("catBars").innerHTML = cats.map(c => {
        const p = getProgress(c.ids);
        return `<div class="cat-bar-row"><div class="cat-bar-head"><span class="${c.cls}">${c.label}</span><span>${p.done}/${p.total} · ${p.left}개 남음</span></div><div class="progress-wrap"><div class="progress-bar" style="width:${p.pct}%"></div></div></div>`;
      }).join("");

      // Rings
      const ep = getProgress(EXAM_IDS), vp = getProgress(VEE_IDS), up = getProgress(UEC_IDS), mp = getProgress(MOD_IDS);
      setRing("ringExam", ep.pct, ep.done+"/"+ep.total);
      setRing("ringVee", vp.pct, vp.done+"/"+vp.total);
      setRing("ringUec", up.pct, up.done+"/"+up.total);
      setRing("ringMod", mp.pct, mp.done+"/"+mp.total);
      document.getElementById("examLeft").textContent = ep.left + "개 남음 · " + (100-ep.pct) + "%";
      document.getElementById("veeLeft").textContent = vp.left + "개 남음 · " + (100-vp.pct) + "%";
      document.getElementById("uecLeft").textContent = up.left + "개 남음 · " + (100-up.pct) + "%";
      document.getElementById("modLeft").textContent = mp.left + "개 남음 · " + (100-mp.pct) + "%";

      // Left todo
      const leftItems = REQUIREMENTS.filter(r => !isReqDone(r.id)).sort((a,b) => a.order - b.order).slice(0,5);
      document.getElementById("leftTodo").innerHTML = leftItems.length
        ? leftItems.map(r => {
            const st = r.cat === "exam" ? getExamStatus(r.id) : null;
            const tag = st === "failed" ? " · 불합격" : "";
            return `<li><span>${r.name}${tag}</span><span class="when">${r.when}</span></li>`;
          }).join("")
        : "<li><span style='color:var(--accent)'>전부 완료!</span></li>";

      // Alert
      const alert = document.getElementById("urgentAlert");
      const pDays = daysUntil("2026-09-21");
      const pSt = getExamStatus("exam-p");
      if (pSt === "failed") {
        alert.style.display = "block";
        alert.innerHTML = `<strong>Exam P 불합격</strong> — 11월 fallback (등록 9/30) 또는 다음 window 준비.`;
      } else if (pSt !== "passed" && pDays >= 0 && pDays <= 90) {
        alert.style.display = "block";
        alert.innerHTML = `<strong>Exam P ${fmtDday(pDays)}</strong> (9/10–21) — 등록 <strong>8/12</strong> · SAS <strong>8/1</strong> · FM은 Fall <strong>5101 UEC</strong>.`;
      } else if ((!isReqChecked("vee-econ") || !isReqChecked("vee-acct")) && (phase.id === "summer26" || phase.id === "pre")) {
        alert.style.display = "block";
        alert.innerHTML = `<strong>2026 여름:</strong> VEE Micro+Acct · SAS <strong>8/1</strong> · P 9월 본격 (등록 8/12).`;
      } else if (!isReqChecked("sas-cert") && (phase.id === "summer26" || phase.id === "pre")) {
        alert.style.display = "block";
        alert.innerHTML = `<strong>SAS 8/1</strong> — P·VEE와 주간 시간표 나눠서 준비.`;
      } else if (!isReqChecked("vee-stats-check") && phase.id === "sem1") {
        alert.style.display = "block";
        alert.innerHTML = `<strong>VEE Math Statistics</strong> — Temple 담당자에게 Purdue 학점 면제 확인!`;
      } else {
        alert.style.display = "none";
      }
    }

    function renderTimeline() {
      const cur = getCurrentPhase();
      const tlAll = getTimelineProgress(getAllTimelineIds());
      document.getElementById("timelineProgressLabel").textContent = tlAll.pct + "%";
      document.getElementById("timeline").innerHTML = PHASES.map(p => {
        const pp = getTimelineProgress(p.tasks.map(t => t.id));
        const allDone = pp.pct === 100;
        return `<div class="phase-block ${p.id===cur.id?"current":""}${allDone?" done":""}">
          <div class="phase-head"><h3>${p.name}</h3>${p.id===cur.id?'<span class="badge badge-now">NOW</span>':""}${allDone?'<span class="badge badge-done">DONE</span>':""}</div>
          <div class="phase-period">${p.period}</div>
          <div class="phase-progress">타임라인 ${pp.done}/${pp.total} · ${100-pp.pct}% 남음</div>
          <ul class="task-list">${p.tasks.map(timelineTaskLi).join("")}</ul></div>`;
      }).join("");
      bindTaskList(document.getElementById("timeline"), "timeline");
    }

    function examStatusCell(id) {
      const st = getExamStatus(id);
      const labels = { pending:"아직 안 봄", passed:"ASA 요건 충족", failed:"재응시 필요" };
      return `<td class="exam-status-cell"><div class="exam-status-btns" data-id="${id}">
        <button type="button" class="exam-st pending ${st==="pending"?"active":""}" data-status="pending">미응시</button>
        <button type="button" class="exam-st pass ${st==="passed"?"active":""}" data-status="passed">합격</button>
        <button type="button" class="exam-st fail ${st==="failed"?"active":""}" data-status="failed">불합격</button>
      </div><div class="exam-status-label">${labels[st]}</div></td>`;
    }

    function checklistRowClass(r) {
      if (r.cat === "exam") {
        const st = getExamStatus(r.id);
        if (st === "passed") return "done exam-passed";
        if (st === "failed") return "exam-failed";
        return "";
      }
      return isReqChecked(r.id) ? "done" : "";
    }

    function renderChecklist() {
      let items = [...REQUIREMENTS];
      if (checklistFilter === "left") items = items.filter(r => !isReqDone(r.id));
      else if (checklistFilter !== "all") items = items.filter(r => r.cat === checklistFilter);

      document.getElementById("checkBody").innerHTML = items.map(r => `
        <tr class="${checklistRowClass(r)}" data-id="${r.id}" data-cat="${r.cat}">
          ${r.cat === "exam" ? examStatusCell(r.id) : `<td><input type="checkbox" ${isReqChecked(r.id)?"checked":""}/></td>`}
          <td class="${CAT_CLS[r.cat]}"><strong>${r.name}</strong></td>
          <td>${r.method}</td><td>${r.when}</td></tr>`).join("");

      document.getElementById("checkBody").querySelectorAll("tr[data-cat]:not([data-cat='exam'])").forEach(tr => {
        tr.onclick = e => { if (e.target.tagName !== "INPUT") toggleReq(tr.dataset.id); };
        const cb = tr.querySelector("input");
        if (cb) cb.onclick = e => { e.stopPropagation(); toggleReq(tr.dataset.id); };
      });

      document.getElementById("checkBody").querySelectorAll(".exam-status-btns button").forEach(btn => {
        btn.onclick = e => {
          e.stopPropagation();
          setExamStatus(btn.closest(".exam-status-btns").dataset.id, btn.dataset.status);
        };
      });

      document.querySelectorAll(".filter-btn").forEach(btn => {
        if (btn.id === "btnLogStudy") return;
        btn.classList.toggle("active", btn.dataset.filter === checklistFilter);
        btn.onclick = () => { checklistFilter = btn.dataset.filter; state.checklistFilter = checklistFilter; renderChecklist(); };
      });
    }

    let pomoInterval = null;
    let pomoEndAt = null;
    let pomoRemainingSec = 0;
    let pomoPhaseTotalSec = 0;
    let pomoMode = "work";
    let pomoRunning = false;
    const POMO_RING_CIRC = 2 * Math.PI * 54;
    const POMO_DAILY_GOAL = 4;
    const POMO_WIN_MSGS = ["하나 끝! 🎯", "굿! 또 해냈어", "집중력 레벨업 ✓", "완료! momentum ↑", "잘했어 — 이 속도 유지"];
    const POMO_BASE_TITLE = document.title || "My ASA Plan";
    let pomoTitleBlinkInterval = null;
    let flashFlipped = false;

    function stopPomoTitleBlink() {
      if (pomoTitleBlinkInterval) {
        clearInterval(pomoTitleBlinkInterval);
        pomoTitleBlinkInterval = null;
      }
      document.title = POMO_BASE_TITLE;
    }

    function startPomoTitleBlink(msg) {
      stopPomoTitleBlink();
      let on = true;
      document.title = msg;
      pomoTitleBlinkInterval = setInterval(() => {
        document.title = on ? POMO_BASE_TITLE : msg;
        on = !on;
      }, 800);
    }

    function ensurePomodoro() {
      if (!state.pomodoro) state.pomodoro = { workMin:25, breakMin:5, todayCount:0, lastDate:"", topic:"" };
      if (!state.flashDecks) state.flashDecks = [];
    }

    function getActiveFlashDeck() {
      ensurePomodoro();
      return (state.flashDecks || []).find(d => d.id === state.flashActiveDeckId) || null;
    }

    function escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function flashPlainText(text) {
      return String(text || "")
        .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => tex.trim())
        .replace(/\$([^$\n]+?)\$/g, (_, tex) => tex.trim());
    }

    function flashPlainHtml(text) {
      return escapeHtml(flashPlainText(text)).replace(/ · /g, '<br><span class="flash-sep">·</span> ');
    }

    const KATEX_OPTS = { throwOnError: false, strict: "ignore", output: "htmlAndMathml", trust: false };

    function renderFlashHtml(text) {
      if (!text) return '<div class="flash-content"></div>';
      if (typeof katex === "undefined") {
        return `<div class="flash-content">${flashPlainHtml(text)}</div>`;
      }
      const parts = String(text).split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
      const inner = parts.map(part => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const tex = part.slice(2, -2).trim();
          try {
            return katex.renderToString(tex, { ...KATEX_OPTS, displayMode: true });
          } catch {
            return escapeHtml(tex);
          }
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          const tex = part.slice(1, -1).trim();
          try {
            return katex.renderToString(tex, { ...KATEX_OPTS, displayMode: false });
          } catch {
            return escapeHtml(tex);
          }
        }
        if (!part) return "";
        return escapeHtml(part).replace(/ · /g, '<br><span class="flash-sep">·</span> ');
      }).join("");
      return `<div class="flash-content">${inner}</div>`;
    }

    function updateFlashStudyCard() {
      const deck = getActiveFlashDeck();
      const cards = deck ? deck.cards || [] : [];
      const studyEl = document.getElementById("flashCard");
      const btns = document.getElementById("flashStudyBtns");
      const metaEl = document.getElementById("flashMeta");
      if (metaEl) {
        metaEl.textContent = deck
          ? `${deck.name} · 카드 ${cards.length}장 · ${state.flashStudyIndex + 1}/${cards.length || 1}`
          : "카드 0장";
      }
      if (!studyEl) return;
      if (!deck || !cards.length) {
        studyEl.textContent = "덱을 선택하거나 카드를 추가하세요";
        studyEl.classList.remove("back");
        if (btns) btns.hidden = true;
        return;
      }
      if (btns) btns.hidden = false;
      const card = cards[state.flashStudyIndex];
      const text = flashFlipped ? card.back : card.front;
      studyEl.innerHTML = renderFlashHtml(text);
      studyEl.classList.toggle("back", flashFlipped);
    }

    function persistFlashStudy(quiet) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      scheduleCloudSync();
      updateFlashStudyCard();
      if (!quiet) toast("저장됨");
    }

    function getPomoDailyGoal() {
      ensurePomodoro();
      return state.pomodoro.dailyGoal || POMO_DAILY_GOAL;
    }

    function getPomoPhaseTotalSec() {
      ensurePomodoro();
      return pomoMode === "work"
        ? (state.pomodoro.workMin || 25) * 60
        : (state.pomodoro.breakMin || 5) * 60;
    }

    function getPomoTodayMinutes() {
      const today = new Date().toISOString().slice(0, 10);
      return (state.studyLogs || [])
        .filter(l => l.date === today && (l.topic || "").includes("Pomodoro"))
        .reduce((s, l) => s + (+l.minutes || 0), 0);
    }

    function getPomoCheerMessage() {
      ensurePomodoro();
      const today = new Date().toISOString().slice(0, 10);
      const count = state.pomodoro.lastDate === today ? (state.pomodoro.todayCount || 0) : 0;
      const goal = getPomoDailyGoal();
      if (pomoRunning && pomoMode === "break") return "쉬는 중 — 물 마시고 스트레칭";
      if (pomoRunning) return "지금 이것만. 멈추지 마!";
      if (count >= goal) return "오늘 목표 달성! 🔥 대단해";
      if (count === 0) return "주제 적고 ▶ 시작 — 딱 이것만!";
      if (count === 1) return "첫 판 클리어! momentum 시작";
      if (count >= goal - 1) return `거의 다 왔어! ${goal - count}개만 더`;
      return `${count}번 해냈어 — 계속 가자!`;
    }

    function renderPomoCheer() {
      const el = document.getElementById("pomoCheer");
      if (el) el.textContent = getPomoCheerMessage();
    }

    function renderPomoDots() {
      const el = document.getElementById("pomoDots");
      if (!el) return;
      ensurePomodoro();
      const today = new Date().toISOString().slice(0, 10);
      const count = state.pomodoro.lastDate === today ? (state.pomodoro.todayCount || 0) : 0;
      const goal = getPomoDailyGoal();
      el.innerHTML = Array.from({ length: goal }, (_, i) => {
        const done = i < count;
        return `<div class="pomo-dot${done ? " done" : ""}">${done ? "✓" : ""}</div>`;
      }).join("");
    }

    function getPomoCountsByDate() {
      const counts = {};
      (state.studyLogs || []).forEach(l => {
        if (!(l.topic || "").includes("Pomodoro")) return;
        counts[l.date] = (counts[l.date] || 0) + 1;
      });
      return counts;
    }

    function renderPomoWeekGrid() {
      const el = document.getElementById("pomoWeekGrid");
      if (!el) return;
      const counts = getPomoCountsByDate();
      const weekStart = getWeekStart();
      const today = new Date().toISOString().slice(0, 10);
      const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];
      el.innerHTML = dayLabels.map((label, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        const ds = d.toISOString().slice(0, 10);
        const n = counts[ds] || 0;
        return `<div class="pomo-week-cell${ds === today ? " today" : ""}${n ? " has-sessions" : ""}">
          <div class="pomo-week-day">${label}</div>
          <div class="pomo-week-num">${n || "·"}</div>
        </div>`;
      }).join("");
    }

    function renderPomoMonthGrid() {
      const el = document.getElementById("pomoMonthGrid");
      if (!el) return;
      const counts = getPomoCountsByDate();
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth();
      const today = now.toISOString().slice(0, 10);
      const last = new Date(y, m + 1, 0).getDate();
      const startPad = (new Date(y, m, 1).getDay() + 6) % 7;
      let monthTotal = 0;
      let cells = "";
      for (let i = 0; i < startPad; i++) cells += `<div class="pomo-month-cell empty"></div>`;
      for (let day = 1; day <= last; day++) {
        const ds = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const n = counts[ds] || 0;
        monthTotal += n;
        const lv = n >= 4 ? 3 : n >= 2 ? 2 : n >= 1 ? 1 : 0;
        cells += `<div class="pomo-month-cell${lv ? " lv" + lv : ""}${ds === today ? " today" : ""}" title="${ds}: ${n}회">
          <span class="pomo-month-d">${day}</span>${n ? `<span class="pomo-month-n">${n}</span>` : ""}
        </div>`;
      }
      el.innerHTML = `<div class="pomo-month-label">${y}.${m + 1} · 합계 <strong>${monthTotal}</strong>회</div>
        <div class="pomo-month-head">${["월", "화", "수", "목", "금", "토", "일"].map(d => `<span>${d}</span>`).join("")}</div>
        <div class="pomo-month-cells">${cells}</div>`;
      const monthEl = document.getElementById("pomoMonthCount");
      if (monthEl) monthEl.textContent = monthTotal;
    }

    function formatPomo(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${String(s).padStart(2, "0")}`;
    }

    function getPomoRemainingSec() {
      if (pomoRunning && pomoEndAt) {
        return Math.max(0, Math.ceil((pomoEndAt - Date.now()) / 1000));
      }
      return pomoRemainingSec || 0;
    }

    function stopPomoTicker() {
      clearInterval(pomoInterval);
      pomoInterval = null;
    }

    function startPomoTicker() {
      stopPomoTicker();
      updatePomoFromClock();
      pomoInterval = setInterval(updatePomoFromClock, 250);
    }

    function setPomoUi(left) {
      const total = pomoPhaseTotalSec || getPomoPhaseTotalSec();
      const pct = total ? Math.round((1 - left / total) * 100) : 0;
      document.getElementById("pomoDisplay").textContent = formatPomo(left);
      document.getElementById("pomoModeLabel").textContent = pomoMode === "work" ? "집중" : "휴식";
      document.getElementById("btnPomoStart").hidden = pomoRunning;
      document.getElementById("btnPomoPause").hidden = !pomoRunning;
      const ring = document.getElementById("pomoRingFg");
      if (ring) {
        ring.style.strokeDasharray = POMO_RING_CIRC;
        ring.style.strokeDashoffset = total ? POMO_RING_CIRC * (left / total) : POMO_RING_CIRC;
      }
      const bar = document.getElementById("pomoProgressBar");
      if (bar) bar.style.width = pct + "%";
      const hero = document.getElementById("pomoHero");
      if (hero) {
        hero.classList.toggle("running", pomoRunning);
        hero.classList.toggle("break-mode", pomoMode === "break");
      }
      const startBtn = document.getElementById("btnPomoStart");
      if (startBtn) startBtn.textContent = pomoRunning ? "진행 중…" : "▶ 시작";
      renderPomoCheer();
    }

    function advancePomoPhase() {
      if (pomoMode === "work") {
        const count = completePomoWork();
        pomoMode = "break";
        pomoPhaseTotalSec = (state.pomodoro.breakMin || 5) * 60;
        pomoRemainingSec = pomoPhaseTotalSec;
        toast(POMO_WIN_MSGS[(count - 1) % POMO_WIN_MSGS.length] + ` · 오늘 ${count}회`);
        startPomoTitleBlink("✓ 집중 완료! 휴식 시작");
      } else {
        pomoMode = "work";
        pomoPhaseTotalSec = (state.pomodoro.workMin || 25) * 60;
        pomoRemainingSec = pomoPhaseTotalSec;
        toast("휴식 끝 — 다음 집중 가자!");
        startPomoTitleBlink("휴식 끝! 다시 집중");
      }
      pomoEndAt = null;
      pomoRunning = false;
      stopPomoTicker();
      setPomoUi(pomoRemainingSec);
      renderPomodoroStats();
    }

    function updatePomoFromClock() {
      const left = getPomoRemainingSec();
      if (pomoRunning && left <= 0) {
        advancePomoPhase();
        return;
      }
      setPomoUi(left);
    }

    function resetPomoDisplay() {
      ensurePomodoro();
      stopPomoTitleBlink();
      pomoPhaseTotalSec = (state.pomodoro.workMin || 25) * 60;
      pomoRemainingSec = pomoPhaseTotalSec;
      pomoMode = "work";
      pomoRunning = false;
      pomoEndAt = null;
      stopPomoTicker();
      setPomoUi(pomoRemainingSec);
    }

    function completePomoWork() {
      ensurePomodoro();
      const today = new Date().toISOString().slice(0, 10);
      if (state.pomodoro.lastDate !== today) state.pomodoro.todayCount = 0;
      state.pomodoro.todayCount = (state.pomodoro.todayCount || 0) + 1;
      state.pomodoro.lastDate = today;
      const count = state.pomodoro.todayCount;
      const workMin = +(state.pomodoro.workMin || 25);
      const topic = (document.getElementById("pomoTopic")?.value || state.pomodoro.topic || "").trim();
      state.pomodoro.topic = topic;
      if (!state.studyLogs) state.studyLogs = [];
      state.studyLogs.push({
        date: today,
        minutes: workMin,
        topic: topic ? `Pomodoro: ${topic}` : "Pomodoro 집중"
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      scheduleCloudSync();
      renderPomodoroStats();
      renderStudyGoal();
      return count;
    }

    function renderPomodoroStats() {
      ensurePomodoro();
      const today = new Date().toISOString().slice(0, 10);
      if (state.pomodoro.lastDate !== today) state.pomodoro.todayCount = 0;
      const count = state.pomodoro.todayCount || 0;
      const goal = getPomoDailyGoal();
      document.getElementById("pomoTodayCount").textContent = count;
      const goalEl = document.getElementById("pomoDailyGoal");
      if (goalEl) goalEl.textContent = goal;
      const minEl = document.getElementById("pomoTodayMin");
      if (minEl) minEl.textContent = getPomoTodayMinutes();
      const weekStart = getWeekStart();
      const weekCount = (state.studyLogs || []).filter(l => {
        if (!(l.topic || "").includes("Pomodoro")) return false;
        const d = new Date(l.date + "T00:00:00");
        return d >= weekStart;
      }).length;
      document.getElementById("pomoWeekCount").textContent = weekCount;
      const workEl = document.getElementById("pomoWorkMin");
      const breakEl = document.getElementById("pomoBreakMin");
      const topicEl = document.getElementById("pomoTopic");
      if (workEl && document.activeElement !== workEl) workEl.value = state.pomodoro.workMin || 25;
      if (breakEl && document.activeElement !== breakEl) breakEl.value = state.pomodoro.breakMin || 5;
      if (topicEl && document.activeElement !== topicEl) topicEl.value = state.pomodoro.topic || "";
      renderPomoDots();
      renderPomoWeekGrid();
      renderPomoMonthGrid();
      renderPomoCheer();
    }

    function renderPomodoro() {
      renderPomodoroStats();
      if (!pomoRunning && !pomoEndAt && pomoRemainingSec === 0) resetPomoDisplay();
      else if (pomoRunning) updatePomoFromClock();
    }

    function renderFlashcards() {
      ensurePomodoro();
      const decks = state.flashDecks || [];
      const sel = document.getElementById("flashDeckSelect");
      sel.innerHTML = decks.length
        ? decks.map(d => `<option value="${d.id}" ${d.id === state.flashActiveDeckId ? "selected" : ""}>${d.name}</option>`).join("")
        : `<option value="">덱 없음</option>`;
      if (!state.flashActiveDeckId && decks[0]) state.flashActiveDeckId = decks[0].id;
      const deck = getActiveFlashDeck();
      const cards = deck ? deck.cards || [] : [];
      if (state.flashStudyIndex >= cards.length) state.flashStudyIndex = 0;
      updateFlashStudyCard();
      document.getElementById("flashCardList").innerHTML = deck
        ? cards.map(c => `
          <div class="flash-card-item">
            <span>${flashPlainHtml(c.front)} → ${flashPlainHtml(c.back)}</span>
            <button type="button" data-flash-del="${c.id}">삭제</button>
          </div>`).join("")
        : "";
      document.getElementById("flashCardList").querySelectorAll("[data-flash-del]").forEach(btn => {
        btn.onclick = () => {
          deck.cards = deck.cards.filter(c => c.id !== btn.dataset.flashDel);
          if (state.flashStudyIndex >= deck.cards.length) state.flashStudyIndex = Math.max(0, deck.cards.length - 1);
          flashFlipped = false;
          saveState(true);
        };
      });
    }

    function bindFocusTools() {
      if (bindFocusTools.done) return;
      bindFocusTools.done = true;

      document.getElementById("btnPomoStart").onclick = () => {
        ensurePomodoro();
        if (!pomoRunning) {
          stopPomoTitleBlink();
          if (pomoRemainingSec === 0 && !pomoEndAt) resetPomoDisplay();
          if (!pomoPhaseTotalSec) pomoPhaseTotalSec = getPomoPhaseTotalSec();
          const left = getPomoRemainingSec() || pomoRemainingSec;
          pomoEndAt = Date.now() + left * 1000;
          pomoRunning = true;
          startPomoTicker();
        }
      };
      document.getElementById("btnPomoPause").onclick = () => {
        if (!pomoRunning) return;
        stopPomoTitleBlink();
        pomoRemainingSec = getPomoRemainingSec();
        pomoEndAt = null;
        pomoRunning = false;
        stopPomoTicker();
        setPomoUi(pomoRemainingSec);
      };
      document.getElementById("btnPomoReset").onclick = () => resetPomoDisplay();
      document.getElementById("pomoWorkMin").onchange = e => {
        state.pomodoro.workMin = Math.max(5, +e.target.value || 25);
        if (!pomoRunning && pomoMode === "work") resetPomoDisplay();
        saveState(true);
      };
      document.getElementById("pomoBreakMin").onchange = e => {
        state.pomodoro.breakMin = Math.max(1, +e.target.value || 5);
        saveState(true);
      };
      document.getElementById("pomoTopic").oninput = e => {
        state.pomodoro.topic = e.target.value;
        saveState(true);
      };

      document.getElementById("btnFlashAddDeck").onclick = () => {
        const name = document.getElementById("flashNewDeck").value.trim();
        if (!name) { toast("덱 이름 입력"); return; }
        ensurePomodoro();
        const deck = { id: uid(), name, cards: [] };
        state.flashDecks.push(deck);
        state.flashActiveDeckId = deck.id;
        state.flashStudyIndex = 0;
        flashFlipped = false;
        document.getElementById("flashNewDeck").value = "";
        saveState();
      };
      document.getElementById("btnFlashLoadDefaults").onclick = () => {
        ensurePomodoro();
        let added = 0;
        DEFAULT_FLASH_DECKS.forEach(def => {
          if (state.flashDecks.some(d => d.id === def.id)) return;
          state.flashDecks.push({
            id: def.id,
            name: def.name,
            cards: def.cards.map(c => ({ ...c }))
          });
          added++;
        });
        if (!added) { toast("기본 덱이 이미 있음"); return; }
        if (!state.flashActiveDeckId) state.flashActiveDeckId = DEFAULT_FLASH_DECKS[0].id;
        saveState();
        toast(`기본 덱 ${added}개 추가`);
      };
      document.getElementById("flashDeckSelect").onchange = e => {
        state.flashActiveDeckId = e.target.value || null;
        state.flashStudyIndex = 0;
        flashFlipped = false;
        saveState(true);
      };
      document.getElementById("btnFlashAddCard").onclick = () => {
        const deck = getActiveFlashDeck();
        if (!deck) { toast("덱 먼저 추가"); return; }
        const front = document.getElementById("flashFront").value.trim();
        const back = document.getElementById("flashBack").value.trim();
        if (!front || !back) { toast("앞·뒤 모두 입력"); return; }
        if (!deck.cards) deck.cards = [];
        deck.cards.push({ id: uid(), front, back });
        document.getElementById("flashFront").value = "";
        document.getElementById("flashBack").value = "";
        saveState();
      };
      document.getElementById("flashCard").onclick = () => {
        const deck = getActiveFlashDeck();
        if (!deck || !deck.cards?.length) return;
        flashFlipped = !flashFlipped;
        updateFlashStudyCard();
      };
      document.getElementById("btnFlashFlip").onclick = () => {
        flashFlipped = !flashFlipped;
        updateFlashStudyCard();
      };
      document.getElementById("btnFlashPrev").onclick = () => {
        const deck = getActiveFlashDeck();
        if (!deck?.cards?.length) return;
        state.flashStudyIndex = (state.flashStudyIndex - 1 + deck.cards.length) % deck.cards.length;
        flashFlipped = false;
        persistFlashStudy(true);
      };
      document.getElementById("btnFlashNext").onclick = () => {
        const deck = getActiveFlashDeck();
        if (!deck?.cards?.length) return;
        state.flashStudyIndex = (state.flashStudyIndex + 1) % deck.cards.length;
        flashFlipped = false;
        persistFlashStudy(true);
      };

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          stopPomoTitleBlink();
          if (pomoRunning) updatePomoFromClock();
        }
      });
      window.addEventListener("focus", stopPomoTitleBlink);
    }

    function renderFocus() {
      const phase = getCurrentPhase();
      document.getElementById("focusTitle").textContent = `공부모드 · ${phase.name} (${phase.period})`;
      document.getElementById("focusTasks").innerHTML = phase.tasks.map(timelineTaskLi).join("");
      bindTaskList(document.getElementById("focusTasks"), "timeline");

      const pri = [
        { id:"prep-p", text:"Exam P 9월 대비", meta:fmtDday(daysUntil("2026-09-21")), highlight:true },
        { id:"sas-cert", text:"SAS 8/1", meta:fmtDday(daysUntil("2026-08-01")), highlight:true },
        { id:"exam-p", text:"9/10–21 Exam P", meta:"등록 8/12", highlight:true },
        { id:"vee-macro", text:"VEE Macro ✓ (완료)", meta:"Economics 1/2", highlight:false },
        { id:"vee-econ", text:"VEE Microeconomics — 2026 여름", meta:"Economics 2/2", highlight:true },
        { id:"vee-acct", text:"VEE Accounting & Finance — 2026 여름", meta:"온라인", highlight:true },
        { id:"as-5101", text:"Fall AS 5101 → FM UEC", meta:"시험 대신 수업", highlight:false },
        { id:"vee-stats-check", text:"VEE Stats — Temple 면제 확인", meta:"입학 직후" }
      ];
      document.getElementById("priorityTasks").innerHTML = pri.map(timelineTaskLi).join("");
      bindTaskList(document.getElementById("priorityTasks"), "timeline");
      bindFocusTools();
      renderPomodoro();
      renderFlashcards();
    }

    function renderTemple() {
      const tp = getTempleCreditProgress();
      setRing("ringTemple", tp.pct, tp.doneCr + "/" + tp.total);
      const ringDash = document.getElementById("ringTempleDash");
      if (ringDash) setRing("ringTempleDash", tp.pct, tp.doneCr + "/" + tp.total);
      document.getElementById("templeRemainingPct").textContent = tp.remainingPct;
      document.getElementById("templeCreditsDone").textContent = tp.doneCr;
      document.getElementById("templeBar").style.width = tp.pct + "%";
      const dashSub = document.getElementById("templeDashSub");
      if (dashSub) dashSub.textContent = tp.leftCr + " cr · " + tp.remainingPct + "% 남음";

      document.getElementById("templeCourseList").innerHTML = TEMPLE_COURSES.map(c => `
        <li class="${isTempleChecked(c.id)?"checked":""}" data-id="${c.id}">
          <input type="checkbox" ${isTempleChecked(c.id)?"checked":""}/>
          <div>
            <div class="task-text">${c.name} <span style="color:var(--muted);font-size:0.75rem">(${c.credits} cr)</span></div>
            <div class="task-meta">${c.group}${c.soa && c.soa !== "—" ? " · SOA: " + c.soa : ""}</div>
          </div>
        </li>`).join("");
      bindTaskList(document.getElementById("templeCourseList"), "temple");
    }

    function getWeekStart() {
      const d = new Date();
      d.setDate(d.getDate() - ((d.getDay()+6)%7));
      d.setHours(0,0,0,0);
      return d;
    }

    function pad(n) { return String(n).padStart(2,"0"); }

    function toIcsDate(dateStr) {
      return dateStr.replace(/-/g, "") + "T090000";
    }

    function toIcsDateEnd(dateStr) {
      return dateStr.replace(/-/g, "") + "T170000";
    }

    function googleCalUrl(title, dateStr, details) {
      const d = dateStr.replace(/-/g, "");
      const end = (() => {
        const dt = new Date(dateStr + "T00:00:00");
        dt.setDate(dt.getDate() + 1);
        return dt.getFullYear() + pad(dt.getMonth()+1) + pad(dt.getDate());
      })();
      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: title,
        dates: d + "/" + end,
        details: details || "My ASA Plan"
      });
      return "https://calendar.google.com/calendar/render?" + params.toString();
    }

    function buildIcsContent() {
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//My ASA Plan//KO",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:My ASA Plan"
      ];
      DDAYS.forEach(m => {
        lines.push("BEGIN:VEVENT");
        lines.push("UID:" + m.taskId + "@asa-plan");
        lines.push("DTSTAMP:" + toIcsDate(new Date().toISOString().slice(0,10)));
        lines.push("DTSTART;VALUE=DATE:" + m.date.replace(/-/g, ""));
        lines.push("DTEND;VALUE=DATE:" + (() => {
          const dt = new Date(m.date + "T00:00:00"); dt.setDate(dt.getDate()+1);
          return dt.getFullYear() + pad(dt.getMonth()+1) + pad(dt.getDate());
        })());
        lines.push("SUMMARY:" + m.label);
        lines.push("DESCRIPTION:ASA Plan milestone");
        lines.push("END:VEVENT");
      });
      (state.schedule || []).forEach((c, i) => {
        const dayMap = ["SU","MO","TU","WE","TH","FR","SA"];
        const until = "20281231T235959Z";
        const start = c.start.replace(":", "") + "00";
        const end = c.end.replace(":", "") + "00";
        lines.push("BEGIN:VEVENT");
        lines.push("UID:class-" + i + "@asa-plan");
        lines.push("DTSTAMP:" + toIcsDate(new Date().toISOString().slice(0,10)));
        lines.push("DTSTART:" + "20260801T" + start);
        lines.push("DTEND:" + "20260801T" + end);
        lines.push("RRULE:FREQ=WEEKLY;BYDAY=" + dayMap[c.day] + ";UNTIL=" + until);
        lines.push("SUMMARY:" + c.name);
        lines.push("LOCATION:" + (c.location || ""));
        lines.push("DESCRIPTION:" + (c.semester || ""));
        lines.push("END:VEVENT");
      });
      lines.push("END:VCALENDAR");
      return lines.join("\r\n");
    }

    function downloadIcs() {
      const blob = new Blob([buildIcsContent()], { type: "text/calendar;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-asa-plan.ics";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("ICS 다운로드됨 → Google Calendar에서 Import");
    }

    function renderExamStudyGuide() {
      const el = document.getElementById("examStudyGuide");
      const logged = getWeekStudyMinutes();
      const goal = state.weeklyStudyGoal || 600;

      if (getExamStatus("exam-p") === "failed") {
        el.innerHTML = `<div><span class="hours-big">재응시</span> <span class="stat-sub">Exam P 불합격 · 11월 또는 다음 window</span></div>
        <p class="stat-sub" style="margin-top:0.5rem">약점 파트 복습 후 재응시. FM은 Fall 5101 UEC로 진행.</p>`;
      } else if (getExamStatus("exam-p") !== "passed") {
        const days = Math.max(1, daysUntil("2026-09-21"));
        const weeks = Math.max(1, Math.ceil(days / 7));
        const perWeek = Math.ceil(350 / weeks);
        el.innerHTML = `<div><span class="hours-big">350h</span> <span class="stat-sub">Exam P · <strong>9/10–21</strong></span></div>
        <p class="stat-sub" style="margin-top:0.5rem">D-${days} · ${weeks}주 · 주 ~<strong>${perWeek}h</strong> · 등록 <strong>8/12</strong> · 8/1 SAS·VEE 병행 · FM=5101 UEC.</p>`;
      } else if (getExamStatus("exam-pa") === "failed") {
        el.innerHTML = `<div><span class="hours-big">재응시</span> <span class="stat-sub">Exam PA 불합격 · SRM(5108) 기반 복습</span></div>
        <p class="stat-sub" style="margin-top:0.5rem">predictive modeling · R/Python 연습 강화 후 재응시.</p>`;
      } else if (getExamStatus("exam-pa") !== "passed") {
        el.innerHTML = `<div><span class="hours-big">500h</span> <span class="stat-sub">Exam PA · <strong>2028년 4월</strong> (5108 후)</span></div>
        <p class="stat-sub" style="margin-top:0.5rem">5108(Fall Y2) 완료 → 1–3월 PA 집중 → 4/14–17 응시. 10월 PA는 5108과 같은 학기라 비추.</p>`;
      } else {
        el.innerHTML = `<p class="stat-sub">SOA 시험(P·PA) 완료. FM UEC·모듈·FAP에 집중. <span style="cursor:pointer;color:var(--accent)" onclick="switchTab('guide')">Temple 학위 요건 →</span></p>`;
      }
    }

    function renderGuide() {
      document.getElementById("studyHoursTable").innerHTML = STUDY_HOURS.map(s => {
        const range = s.typical ? `${s.min}–${s.max}h (보통 ~${s.typical}h)` : "수업으로 대체";
        const weeks = s.typical ? `약 ${Math.ceil(s.typical/10)}주` : "—";
        return `<tr><td><strong>${s.exam}</strong></td><td>${range}</td><td>${weeks}</td><td>${s.plan}</td><td style="color:var(--muted);font-size:0.8rem">${s.tips}</td></tr>`;
      }).join("");
    }

    function renderSchedule() {
      const grid = document.getElementById("scheduleGrid");
      const today = new Date().getDay();
      grid.innerHTML = DAY_ORDER.map((d) => {
        const classes = (state.schedule || []).filter(c => c.day === d)
          .sort((a, b) => a.start.localeCompare(b.start));
        return `<div class="schedule-day${d === today ? " today" : ""}">
          <div class="day-name">${DAY_NAMES[d]}</div>
          ${classes.length ? classes.map((c, idx) => {
            const realIdx = state.schedule.indexOf(c);
            return `<div class="class-chip" data-idx="${realIdx}" title="클릭하면 삭제">
              <div class="t">${c.name}</div>
              <div class="m">${c.start}-${c.end}${c.location ? " · " + c.location : ""}</div>
            </div>`;
          }).join("") : `<div style="font-size:0.7rem;color:var(--muted)">—</div>`}
        </div>`;
      }).join("");

      grid.querySelectorAll(".class-chip").forEach(chip => {
        chip.onclick = () => {
          if (confirm("이 수업을 삭제할까요?")) {
            state.schedule.splice(+chip.dataset.idx, 1);
            saveState();
          }
        };
      });

      const sems = [...new Set((state.schedule||[]).map(c => c.semester).filter(Boolean))];
      document.getElementById("scheduleSemester").textContent = sems[0] || "학기 미설정";

      document.getElementById("gcalLinks").innerHTML = DDAYS.map(m =>
        `<li><span>${m.label} <span style="color:var(--muted);font-size:0.75rem">${m.date}</span></span>
        <a class="btn-action" href="${googleCalUrl(m.label, m.date, "ASA Plan")}" target="_blank" rel="noopener">+ Google</a></li>`
      ).join("");

      // Today classes on dashboard
      const todayClasses = (state.schedule || []).filter(c => c.day === today)
        .sort((a, b) => a.start.localeCompare(b.start));
      document.getElementById("todayClasses").innerHTML = todayClasses.length
        ? todayClasses.map(c => `<li><strong>${c.start}-${c.end}</strong> ${c.name}${c.location ? " @ " + c.location : ""}</li>`).join("")
        : "<li>오늘 등록된 수업 없음 · <span style='cursor:pointer;color:var(--accent)' onclick=\"switchTab('schedule')\">시간표 추가</span></li>";
    }

    function renderStudyGoal() {
      const goal = state.weeklyStudyGoal || 600;
      const done = getWeekStudyMinutes();
      const pct = Math.min(100, Math.round(done / goal * 100));
      document.getElementById("studyGoalMin").textContent = goal;
      document.getElementById("studyWeekMin").textContent = done;
      document.getElementById("studyGoalPct").textContent = pct + "%";
      document.getElementById("studyGoalBar").style.width = pct + "%";
      if (document.getElementById("studyGoalInput")) {
        document.getElementById("studyGoalInput").value = goal;
      }
    }

    function renderStudyRecommendations() {
      const tbl = document.getElementById("studyRecTable");
      if (!tbl) return;
      const tierCls = { best: "best", free: "free", budget: "budget", later: "later" };
      tbl.innerHTML = `<thead><tr><th>시기</th><th>추천</th><th>예상 비용</th><th>공부 순서</th></tr></thead><tbody>` +
        STUDY_RECOMMENDATIONS.map(r => `<tr>
          <td style="white-space:nowrap"><span class="rec-tier ${tierCls[r.tier]}">${r.tierLabel}</span><br/><span style="font-size:0.78rem;color:var(--muted)">${r.when}</span></td>
          <td><strong>${r.pick}</strong>
            <div class="rec-links" style="margin-top:0.35rem">${r.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.text} →</a>`).join("")}</div>
            ${r.alt ? `<div style="font-size:0.75rem;color:var(--muted);margin-top:0.3rem">대안: ${r.alt}</div>` : ""}
          </td>
          <td><strong style="color:var(--accent2)">${r.cost}</strong><br/><span style="font-size:0.72rem;color:var(--muted)">${r.costDetail}</span></td>
          <td style="font-size:0.78rem;color:var(--muted);line-height:1.45">${r.plan}</td>
        </tr>`).join("") + "</tbody>";
    }

    function renderStudyProviders() {
      renderStudyRecommendations();
      const tbl = document.getElementById("studyProvidersTable");
      if (tbl) {
        tbl.innerHTML = `<thead><tr><th>플랫폼</th><th>시험</th><th>가격 (2026)</th><th>비고</th></tr></thead><tbody>` +
          STUDY_PROVIDERS.map(p => `<tr>
            <td><a href="${p.url}" target="_blank" rel="noopener" style="color:var(--accent)"><strong>${p.name}</strong></a></td>
            <td>${p.exams}</td>
            <td>${p.pricing.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</td>
            <td style="color:var(--muted);font-size:0.78rem">${p.note}</td>
          </tr>`).join("") + "</tbody>";
      }
      const sum = document.getElementById("soaFeesSummary");
      if (sum) {
        const fmt = n => "$" + n.toLocaleString();
        const examT = SOA_FEES.exams.reduce((s, x) => s + x.fee, 0);
        const veeT = SOA_FEES.vee.reduce((s, x) => s + x.fee, 0);
        const modT = SOA_FEES.modules.reduce((s, x) => s + x.fee, 0);
        const total = getBudgetTotal();
        sum.innerHTML = `
          <table class="guide-table">
            <tbody>
              <tr><td colspan="2" style="font-weight:600;color:var(--muted);font-size:0.75rem">시험 2개 (FM=5101 UEC)</td></tr>
              ${SOA_FEES.exams.map(x => `<tr><td>${x.name}</td><td>${fmt(x.fee)}</td></tr>`).join("")}
              <tr><td colspan="2" style="font-weight:600;color:var(--muted);font-size:0.75rem;padding-top:0.5rem">VEE (SOA 제출 $92/과목)</td></tr>
              ${SOA_FEES.vee.map(x => `<tr><td>${x.name}${x.optional ? " <span style='color:var(--accent2);font-size:0.75rem'>(" + x.optional + ")</span>" : ""}</td><td>${fmt(x.fee)}</td></tr>`).join("")}
              <tr><td colspan="2" style="font-weight:600;color:var(--muted);font-size:0.75rem;padding-top:0.5rem">모듈 · FAP · APC</td></tr>
              ${SOA_FEES.modules.map(x => `<tr><td>${x.name}</td><td>${fmt(x.fee)}</td></tr>`).join("")}
              <tr style="font-weight:700"><td>ASA SOA 합계</td><td style="color:var(--accent2)">${fmt(total)}</td></tr>
              <tr><td colspan="2" style="font-size:0.75rem;color:var(--muted);padding-top:0.35rem">${SOA_FEES.uecNote}</td></tr>
            </tbody>
          </table>`;
      }
    }

    function renderBudget() {
      const spent = state.budgetSpent || 0;
      const total = getBudgetTotal();
      const left = Math.max(0, total - spent);
      const fmt = n => "$" + n.toLocaleString();
      const el = document.getElementById("budgetRows");
      if (el) {
        const row = (name, fee, extra) => `<div class="budget-row"><span>${name}${extra || ""}</span><span>${fmt(fee)}</span></div>`;
        el.innerHTML =
          row("Exam P", 275) + row("Exam PA", 1234) +
          `<div class="stat-sub" style="margin:0.35rem 0 0.2rem;font-size:0.72rem;color:var(--muted)">VEE · 모듈 · FAP · APC</div>` +
          row("VEE Econ + Acct", 184, " <span style='font-size:0.72rem;color:var(--accent2)'>(Stats Purdue 면제 · Macro 완료)</span>") +
          row("PAF + ASF + FAP + ATPA + APC", 4228) +
          `<div class="budget-row"><span><strong>ASA SOA 합계</strong></span><span style="color:var(--accent2)"><strong>${fmt(total)}</strong></span></div>`;
      }
      if (document.getElementById("budgetSpent")) {
        document.getElementById("budgetSpent").value = spent || "";
        document.getElementById("budgetLeft").textContent = fmt(left);
        const lbl = document.getElementById("budgetTotalLabel");
        if (lbl) lbl.textContent = "전체 " + fmt(total);
      }
    }

    function renderTools() {
      document.getElementById("weeklyMemo").value = state.weeklyMemo || "";
      document.getElementById("adminMemo").value = state.adminMemo || "";

      const adminItems = REQUIREMENTS.filter(r => r.cat === "admin");
      document.getElementById("adminTasks").innerHTML = adminItems.map(r => `
        <li class="${isReqChecked(r.id)?"checked":""}" data-id="${r.id}">
          <input type="checkbox" ${isReqChecked(r.id)?"checked":""}/>
          <div><div class="task-text">${r.name}</div><div class="task-meta">${r.method} · ${r.when}</div></div>
        </li>`).join("");
      bindTaskList(document.getElementById("adminTasks"), "req");

      const weekStart = getWeekStart();
      const logs = (state.studyLogs || []).slice().reverse().slice(0,8);
      document.getElementById("studyLogs").innerHTML = logs.length
        ? logs.map((l,i) => `<li><span>${l.date} · ${l.minutes}분 · ${l.topic||"-"}</span></li>`).join("")
        : "<li><span style='color:var(--muted)'>기록 없음</span></li>";
      const weekTotal = getWeekStudyMinutes();
      document.getElementById("weekStudyTotal").textContent = weekTotal;
      renderBudget();
    }

    function render() {
      checklistFilter = state.checklistFilter || "all";
      renderDashboard();
      renderTimeline();
      renderChecklist();
      renderTemple();
      renderFocus();
      renderCareer();
      renderGuide();
      renderSchedule();
      renderStudyGoal();
      renderTools();
      renderExamStudyGuide();
      renderExamDeadlines();
      renderContacts();
      renderWeeklyLoad();
      renderStudyProviders();
    }

    function initApp() {
      state = loadState();
      checklistFilter = state.checklistFilter || "all";

      document.getElementById("nav").addEventListener("click", e => {
        if (e.target.tagName === "BUTTON" && e.target.dataset.tab) switchTab(e.target.dataset.tab);
      });

      document.getElementById("weeklyMemo").addEventListener("input", e => {
        state.weeklyMemo = e.target.value;
        saveState(true);
      });

      document.getElementById("adminMemo").addEventListener("input", e => {
        state.adminMemo = e.target.value;
        saveState(true);
      });

      document.getElementById("btnLogStudy").onclick = () => {
        const minutes = +document.getElementById("studyMin").value || 0;
        const topic = document.getElementById("studyTopic").value.trim();
        if (!minutes && !topic) { toast("시간 또는 내용 입력"); return; }
        if (!state.studyLogs) state.studyLogs = [];
        state.studyLogs.push({ date: new Date().toISOString().slice(0,10), minutes, topic });
        document.getElementById("studyMin").value = "";
        document.getElementById("studyTopic").value = "";
        saveState();
      };

      document.getElementById("btnAddClass").onclick = () => {
        const name = document.getElementById("clsName").value.trim();
        if (!name) { toast("수업명 입력"); return; }
        if (!state.schedule) state.schedule = [];
        state.schedule.push({
          name,
          day: +document.getElementById("clsDay").value,
          start: document.getElementById("clsStart").value || "10:00",
          end: document.getElementById("clsEnd").value || "11:30",
          location: document.getElementById("clsLoc").value.trim(),
          semester: document.getElementById("clsSemester").value.trim() || "2026 Fall"
        });
        document.getElementById("clsName").value = "";
        document.getElementById("clsLoc").value = "";
        saveState();
      };

      document.getElementById("btnLoadFall2026").onclick = () => {
        if (state.schedule && state.schedule.length && !confirm("기존 시간표를 2026 Fall 등록 시간표로 교체할까요?")) return;
        state.schedule = applyFall2026Schedule();
        saveState();
        toast("2026 Fall 시간표 적용됨");
      };

      document.getElementById("btnExportData").onclick = exportBackup;
      document.getElementById("btnConnectDrive").onclick = connectCloudFile;
      document.getElementById("btnDisconnectDrive").onclick = disconnectCloudFile;
      document.getElementById("btnRestoreDrive").onclick = restoreFromCloudFile;
      document.getElementById("importDataFile").onchange = e => {
        const f = e.target.files[0];
        if (f) importBackup(f);
        e.target.value = "";
      };

      initCloudSync();
      bindCareerForm();

      document.getElementById("btnExportIcs").onclick = downloadIcs;

      document.getElementById("studyGoalInput").addEventListener("change", e => {
        state.weeklyStudyGoal = Math.max(60, +e.target.value || 600);
        saveState(true);
      });

      document.getElementById("budgetSpent").addEventListener("input", e => {
        state.budgetSpent = Math.max(0, +e.target.value || 0);
        saveState(true);
      });

      render();
    }

    document.getElementById("authForm").addEventListener("submit", async e => {
      e.preventDefault();
      const pw = document.getElementById("authPassword").value;
      const err = document.getElementById("authError");
      if (await sha256(pw) === PASSWORD_HASH) {
        setAuthed(document.getElementById("authRemember").checked);
        unlockApp();
        initApp();
        err.hidden = true;
      } else {
        err.hidden = false;
        document.getElementById("authPassword").value = "";
        document.getElementById("authPassword").focus();
      }
    });

    if (isAuthed()) {
      unlockApp();
      initApp();
    }
