/**
 * Yummy Day — 今天吃什麼？
 * 核心應用邏輯控制器 (App Controller)
 * 涵蓋：音效合成器、撒花特效、今日幸運美食、五大核心功能、收藏管理、篩選邏輯與視窗彈窗
 */

// ─── 1. Web Audio API 音效合成器 (免依賴外部音檔，100% 穩定離線運作) ───
const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  // 泡泡 Pop 輕脆點擊聲
  pop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // 靜音處理瀏覽器限制
    }
  },

  // 轉盤撥片滴答聲 (木質輕敲感)
  tick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(640, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  },

  // 轉盤中獎勝利鐘聲 (三重和弦)
  win() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.09;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch (e) {}
  }
};
window.SoundFX = SoundFX;

// ─── 2. 繽紛粉彩紙花撒花特效 (Confetti) ───
window.triggerConfetti = function() {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  const colors = ["#FF6B8B", "#FFD166", "#06D6A0", "#118AB2", "#FF9F1C", "#FF85A1", "#C7CEEA"];
  const shapes = ["circle", "square", "ribbon"];
  const total = 50;

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.className = "confetti-particle";
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2;
    const size = 8 + Math.random() * 8;

    el.style.left = `${left}vw`;
    el.style.backgroundColor = color;
    el.style.width = `${size}px`;
    el.style.height = shape === "ribbon" ? `${size * 2}px` : `${size}px`;
    el.style.borderRadius = shape === "circle" ? "50%" : "2px";
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${Math.random() * 0.4}s`;

    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, (duration + 0.6) * 1000);
  }
};

// ─── 3. 美食卡片圖片載入失敗優雅退避 (SVG 韓系奶油手繪佔位圖) ───
window.getFoodFallbackImage = function(name = "美食料理") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF8F2" />
        <stop offset="50%" stop-color="#FFF2F4" />
        <stop offset="100%" stop-color="#FBF4EB" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#DCA0AA" flood-opacity="0.22"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <!-- 蕾絲甜點盤 -->
    <circle cx="300" cy="170" r="105" fill="#FFFFFF" filter="url(#shadow)" stroke="#F2D2BD" stroke-width="2.5" />
    <circle cx="300" cy="170" r="90" fill="#FFFBF7" stroke="#FFCCD5" stroke-width="1.5" stroke-dasharray="4 3" />
    <circle cx="300" cy="170" r="65" fill="#FFF0F3" />
    <text x="300" y="186" font-size="58" text-anchor="middle">🍓</text>
    <!-- 美食名稱與甜點屋標籤 -->
    <rect x="150" y="305" width="300" height="34" rx="17" fill="#FFFFFF" stroke="#FFD6DE" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="300" y="328" font-size="15" font-family="'Nunito', 'Noto Sans TC', sans-serif" font-weight="900" fill="#4A3B32" text-anchor="middle">${name}</text>
    <text x="300" y="365" font-size="12" font-family="'Nunito', 'Noto Sans TC', sans-serif" font-weight="700" fill="#A89487" text-anchor="middle">✦ YUMMY DAY BAKERY &amp; CAFE ✦</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

window.handleImageError = function(img, foodName) {
  img.onerror = null; // 避免無窮遞迴
  img.src = window.getFoodFallbackImage(foodName);
};

// ─── 4. Yummy Day 主應用控制器 ───
const YummyApp = {
  // 收藏清單 ID 陣列
  favorites: [],
  // 轉盤實例
  wheel: null,
  // 轉盤當前候選清單
  wheelCandidates: [],
  // 當前心情
  currentMood: "happy",
  // 預算篩選條件
  budgetFilter: "all",
  // 類別篩選條件
  mealTypeFilter: "全部類型",
  categoryFilter: "全部料理",
  // 搜尋關鍵字
  searchKeyword: "",
  // 排序方式
  sortBy: "default",

  /**
   * 初始化系統
   */
  init() {
    this.loadFavorites();
    this.setupNavigation();
    this.setupDailyLuckyFood();
    this.setupWheelSection();
    this.setupMoodSection();
    this.setupExploreSection();
    this.setupFavoritesSection();
    this.setupModals();
    this.setupScrollToTop();
    this.setupGlobalClickSound();

    console.log("🍓 Yummy Day — 今天吃什麼？網站初始化完成！");
  },

  /**
   * 全域點擊音效
   */
  setupGlobalClickSound() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button, .nav-link, .mood-btn, .pill-btn, .card-heart-btn");
      if (btn) {
        SoundFX.pop();
      }
    });
  },

  /**
   * 收藏功能：讀取 LocalStorage
   */
  loadFavorites() {
    try {
      const saved = localStorage.getItem("yummy_day_favorites");
      this.favorites = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.favorites = [];
    }
    this.updateFavoriteBadges();
  },

  /**
   * 收藏功能：儲存 LocalStorage
   */
  saveFavorites() {
    try {
      localStorage.setItem("yummy_day_favorites", JSON.stringify(this.favorites));
    } catch (e) {
      console.error("無法寫入 LocalStorage", e);
    }
    this.updateFavoriteBadges();
  },

  /**
   * 判斷是否已收藏
   */
  isFavorite(foodId) {
    return this.favorites.includes(foodId);
  },

  /**
   * 切換收藏狀態
   */
  toggleFavorite(foodId, foodName = "美食") {
    const idx = this.favorites.indexOf(foodId);
    let isAdded = false;

    if (idx >= 0) {
      this.favorites.splice(idx, 1);
      this.showToast(`已從收藏清單移除「${foodName}」`, "info");
    } else {
      this.favorites.push(foodId);
      isAdded = true;
      this.showToast(`♡ 成功將「${foodName}」加入收藏！`, "success");
    }

    this.saveFavorites();
    this.syncAllHeartButtons(foodId, isAdded);

    // 若當前在收藏專區，重新渲染收藏清單
    if (document.getElementById("favorites-section")?.classList.contains("active-section")) {
      this.renderFavoritesGrid();
    }

    return isAdded;
  },

  /**
   * 同步畫面中所有相同食物的愛心按鈕狀態
   */
  syncAllHeartButtons(foodId, isFav) {
    document.querySelectorAll(`.heart-toggle[data-id="${foodId}"]`).forEach((btn) => {
      if (isFav) {
        btn.classList.add("favorited");
        btn.setAttribute("title", "已收藏，點擊取消");
        btn.innerHTML = `<svg class="icon-heart" viewBox="0 0 24 24" fill="#FF5277" stroke="#FF5277" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      } else {
        btn.classList.remove("favorited");
        btn.setAttribute("title", "加入收藏");
        btn.innerHTML = `<svg class="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      }
    });
  },

  /**
   * 更新導覽列收藏數量徽章
   */
  updateFavoriteBadges() {
    const count = this.favorites.length;
    document.querySelectorAll(".fav-badge-count").forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
  },

  /**
   * 提示氣泡通知 (Toast)
   */
  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `yummy-toast ${type}`;
    const icon = type === "success" ? "🍓" : "✨";
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${message}</span>`;

    container.appendChild(toast);

    // 動畫進場
    setTimeout(() => toast.classList.add("show"), 10);

    // 3 秒後自動退場
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  },

  /**
   * 導覽列與頁籤切換
   */
  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link[data-target]");
    const sections = document.querySelectorAll(".page-section");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("main-nav-menu");

    const switchSection = (targetId) => {
      sections.forEach((sec) => {
        sec.classList.remove("active-section");
        if (sec.id === targetId) {
          sec.classList.add("active-section");
          // 平滑捲動至頂端
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.target === targetId);
      });

      // 關閉手機抽屜
      if (navMenu) navMenu.classList.remove("open");

      // 如果切換到收藏專區，立即重繪
      if (targetId === "favorites-section") {
        this.renderFavoritesGrid();
      }
      // 如果切換到轉盤專區，重繪 Canvas 避免尺寸錯誤
      if (targetId === "wheel-section" && this.wheel) {
        setTimeout(() => {
          this.wheel.setupHiDPI();
          this.wheel.draw();
        }, 80);
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        switchSection(targetId);
      });
    });

    // 首頁快捷卡片與按鈕點擊切換
    document.querySelectorAll("[data-nav-target]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.dataset.navTarget;
        switchSection(targetId);
      });
    });

    // 手機漢堡選單切換
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  },

  /**
   * 功能 5：今日美食推薦 🍰
   * 日期決定論演算法 (同日重新整理保證一致，隔日自動更新)
   */
  setupDailyLuckyFood() {
    const container = document.getElementById("daily-lucky-card");
    if (!container) return;

    // 以本地日期 YYYY-MM-DD 計算雜湊值
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = (hash << 5) - hash + dateStr.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % FOOD_DATABASE.length;
    const dailyFood = FOOD_DATABASE[index];

    const isFav = this.isFavorite(dailyFood.id);

    container.innerHTML = `
      <div class="daily-food-inner">
        <div class="daily-badge-ribbon">
          <span>今日幸運美食 ♡</span>
        </div>
        <div class="daily-image-wrap">
          <img 
            src="${dailyFood.image}" 
            alt="${dailyFood.name}"
            onerror="window.handleImageError(this, '${dailyFood.name}')"
            class="daily-food-img"
          />
          <span class="daily-category-tag">${dailyFood.category} · ${dailyFood.mealType}</span>
        </div>
        <div class="daily-content-wrap">
          <div class="daily-header-row">
            <div>
              <span class="daily-date-pill">📅 ${dateStr} 今日推薦</span>
              <h3 class="daily-food-title">${dailyFood.name}</h3>
            </div>
            <div class="daily-price-tag">NT$ ${dailyFood.price}</div>
          </div>
          <p class="daily-food-desc">${dailyFood.description}</p>
          <div class="daily-reason-box">
            <span class="sparkle-icon">✨</span>
            <p><strong>幸運小語：</strong>今天的美食小幸運，就是你啦！好好犒賞自己，展開甜蜜美好的一天 ♡</p>
          </div>
          <div class="daily-actions">
            <button class="btn btn-primary start-wheel-from-daily" data-nav-target="wheel-section">
              🎡 轉盤試試看
            </button>
            <button 
              class="btn btn-outline heart-toggle ${isFav ? "favorited" : ""}" 
              data-id="${dailyFood.id}"
              data-name="${dailyFood.name}"
            >
              ${isFav ? "❤️ 已在收藏清單" : "♡ 加入美食收藏"}
            </button>
          </div>
        </div>
      </div>
    `;

    // 綁定收藏按鈕
    const heartBtn = container.querySelector(`.heart-toggle[data-id="${dailyFood.id}"]`);
    if (heartBtn) {
      heartBtn.addEventListener("click", () => {
        const added = this.toggleFavorite(dailyFood.id, dailyFood.name);
        heartBtn.textContent = added ? "❤️ 已在收藏清單" : "♡ 加入美食收藏";
      });
    }

    // 綁定直接切換轉盤
    container.querySelector(".start-wheel-from-daily")?.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector('.nav-link[data-target="wheel-section"]')?.click();
    });
  },

  /**
   * 功能 1：美食命運轉盤 🎡
   */
  setupWheelSection() {
    this.wheel = new FoodWheel("fortune-wheel-canvas");

    const categorySelect = document.getElementById("wheel-category-select");
    const budgetSelect = document.getElementById("wheel-budget-select");
    const spinBtn = document.getElementById("spin-wheel-btn");
    const shuffleBtn = document.getElementById("shuffle-wheel-btn");

    // 建立轉盤候選清單
    const updateWheelItems = () => {
      const cat = categorySelect ? categorySelect.value : "all";
      const budget = budgetSelect ? budgetSelect.value : "all";

      let filtered = FOOD_DATABASE.filter((food) => {
        const matchCat = cat === "all" || food.category === cat;
        let matchBudget = true;
        if (budget === "tier1") matchBudget = food.price <= 100;
        else if (budget === "tier2") matchBudget = food.price >= 101 && food.price <= 200;
        else if (budget === "tier3") matchBudget = food.price >= 201 && food.price <= 300;
        else if (budget === "tier4") matchBudget = food.price > 300;

        return matchCat && matchBudget;
      });

      // 如果篩選結果少於 4 個，彈性回退放寬條件
      if (filtered.length < 4) {
        filtered = FOOD_DATABASE.slice();
      }

      // 洗牌演算法
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      // 取 8 ~ 10 個作為轉盤扇形，視覺排版最美觀
      const candidateCount = Math.min(Math.max(shuffled.length, 6), 8);
      this.wheelCandidates = shuffled.slice(0, candidateCount);

      this.wheel.setItems(this.wheelCandidates);
      this.renderWheelCandidateTags();
    };

    if (categorySelect) categorySelect.addEventListener("change", updateWheelItems);
    if (budgetSelect) budgetSelect.addEventListener("change", updateWheelItems);
    if (shuffleBtn) shuffleBtn.addEventListener("click", updateWheelItems);

    // 開始旋轉轉盤
    if (spinBtn) {
      spinBtn.addEventListener("click", () => {
        if (this.wheel.isSpinning) return;
        spinBtn.disabled = true;
        spinBtn.classList.add("spinning");
        spinBtn.textContent = "美食魔法旋轉中… ♡";

        this.wheel.spin(null, (winner) => {
          spinBtn.disabled = false;
          spinBtn.classList.remove("spinning");
          spinBtn.textContent = "🎡 再次旋轉命運";
          this.showWheelResultModal(winner);
        });
      });
    }

    // 初始化轉盤項目
    updateWheelItems();
  },

  /**
   * 渲染轉盤候選名單小標籤
   */
  renderWheelCandidateTags() {
    const container = document.getElementById("wheel-candidate-tags");
    if (!container) return;

    container.innerHTML = this.wheelCandidates
      .map(
        (f) => `
        <span class="candidate-tag" title="${f.category} · NT$ ${f.price}">
          🍓 ${f.name}
        </span>
      `
      )
      .join("");
  },

  /**
   * 顯示轉盤命定結果彈窗
   */
  showWheelResultModal(winner) {
    const modal = document.getElementById("result-modal");
    if (!modal || !winner) return;

    const isFav = this.isFavorite(winner.id);

    modal.querySelector(".modal-body-content").innerHTML = `
      <div class="result-celebrate-badge">🎉 命運之神的決定！</div>
      <h3 class="result-title">今天的命定美食是：</h3>
      <div class="result-food-name">${winner.name}</div>
      <div class="result-image-box">
        <img 
          src="${winner.image}" 
          alt="${winner.name}" 
          onerror="window.handleImageError(this, '${winner.name}')" 
        />
        <span class="result-category-pill">${winner.category} · ${winner.mealType}</span>
      </div>
      <div class="result-meta-row">
        <span class="result-price">參考價格：<strong>NT$ ${winner.price}</strong></span>
      </div>
      <p class="result-desc">${winner.description}</p>
      <div class="result-actions">
        <button class="btn btn-outline" id="respin-modal-btn">🎡 重新抽選</button>
        <button 
          class="btn btn-primary heart-toggle ${isFav ? "favorited" : ""}" 
          id="fav-modal-btn"
          data-id="${winner.id}"
          data-name="${winner.name}"
        >
          ${isFav ? "❤️ 已在收藏清單" : "♡ 加入我的收藏"}
        </button>
      </div>
    `;

    // 綁定彈窗按鈕
    modal.querySelector("#respin-modal-btn").addEventListener("click", () => {
      this.closeModal("result-modal");
      document.getElementById("spin-wheel-btn")?.click();
    });

    const modalFavBtn = modal.querySelector("#fav-modal-btn");
    modalFavBtn.addEventListener("click", () => {
      const added = this.toggleFavorite(winner.id, winner.name);
      modalFavBtn.textContent = added ? "❤️ 已在收藏清單" : "♡ 加入我的收藏";
      modalFavBtn.classList.toggle("favorited", added);
    });

    this.openModal("result-modal");
  },

  /**
   * 功能 2：心情選食物 💗
   */
  setupMoodSection() {
    const moodBtns = document.querySelectorAll(".mood-btn[data-mood]");
    const refreshBtn = document.getElementById("refresh-mood-recommendation");

    moodBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        moodBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentMood = btn.dataset.mood;
        this.renderMoodFoodCards();
      });
    });

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.renderMoodFoodCards();
        this.showToast("已為你換上一批新推薦 ♡", "info");
      });
    }

    // 初始渲染開心美食
    this.renderMoodFoodCards();
  },

  /**
   * 渲染符合心情的美食推薦 (3 ~ 6 個卡片)
   */
  renderMoodFoodCards() {
    const container = document.getElementById("mood-food-grid");
    const moodInfoBox = document.getElementById("mood-header-info");
    if (!container) return;

    const moodData = MOOD_DICT[this.currentMood] || MOOD_DICT.happy;

    // 更新心情引導文案
    if (moodInfoBox) {
      moodInfoBox.innerHTML = `
        <div class="current-mood-pill">
          <span class="mood-big-emoji">${moodData.emoji}</span>
          <div>
            <h4>當前心情：${moodData.label}</h4>
            <p>「${moodData.tagline}」— ${moodData.description}</p>
          </div>
        </div>
      `;
    }

    // 篩選符合此心情的美食
    let matched = FOOD_DATABASE.filter((f) => f.moods.includes(this.currentMood));
    if (matched.length === 0) matched = FOOD_DATABASE.slice();

    // 隨機打亂並取 4 ~ 6 種
    const shuffled = [...matched].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    container.innerHTML = selected
      .map((food) => this.createFoodCardHTML(food, { showMoodReason: true }))
      .join("");

    this.bindCardEvents(container);
  },

  /**
   * 功能 3：預算與分類篩選 💰
   */
  setupExploreSection() {
    const budgetTabs = document.querySelectorAll(".budget-pill[data-budget]");
    const mealTypePills = document.querySelectorAll(".meal-type-pill[data-meal-type]");
    const categorySelect = document.getElementById("explore-category-filter");
    const searchInput = document.getElementById("explore-search-input");
    const sortSelect = document.getElementById("explore-sort-select");

    // 預算切換
    budgetTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        budgetTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        this.budgetFilter = tab.dataset.budget;
        this.renderExploreGrid();
      });
    });

    // 餐點類型切換
    mealTypePills.forEach((pill) => {
      pill.addEventListener("click", () => {
        mealTypePills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.mealTypeFilter = pill.dataset.mealType;
        this.renderExploreGrid();
      });
    });

    // 料理菜系切換
    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        this.categoryFilter = categorySelect.value;
        this.renderExploreGrid();
      });
    }

    // 關鍵字搜尋
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchKeyword = e.target.value.trim().toLowerCase();
        this.renderExploreGrid();
      });
    }

    // 排序切換
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        this.sortBy = sortSelect.value;
        this.renderExploreGrid();
      });
    }

    // 初始渲染
    this.renderExploreGrid();
  },

  /**
   * 渲染探索美食網格
   */
  renderExploreGrid() {
    const container = document.getElementById("explore-food-grid");
    const countBadge = document.getElementById("explore-result-count");
    if (!container) return;

    let list = FOOD_DATABASE.filter((food) => {
      // 1. 預算篩選
      let matchBudget = true;
      if (this.budgetFilter === "tier1") matchBudget = food.price <= 100;
      else if (this.budgetFilter === "tier2") matchBudget = food.price >= 101 && food.price <= 200;
      else if (this.budgetFilter === "tier3") matchBudget = food.price >= 201 && food.price <= 300;
      else if (this.budgetFilter === "tier4") matchBudget = food.price > 300;

      // 2. 餐點類型篩選
      const matchMealType = this.mealTypeFilter === "全部類型" || food.mealType === this.mealTypeFilter;

      // 3. 料理菜系篩選
      const matchCategory = this.categoryFilter === "全部料理" || food.category === this.categoryFilter;

      // 4. 關鍵字搜尋
      const matchSearch =
        !this.searchKeyword ||
        food.name.toLowerCase().includes(this.searchKeyword) ||
        food.description.toLowerCase().includes(this.searchKeyword) ||
        food.category.toLowerCase().includes(this.searchKeyword) ||
        food.mealType.toLowerCase().includes(this.searchKeyword);

      return matchBudget && matchMealType && matchCategory && matchSearch;
    });

    // 排序
    if (this.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    // 更新數量提示
    if (countBadge) {
      countBadge.innerHTML = `找到 <strong>${list.length}</strong> 種美味料理 ♡`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-icon">🍰</div>
          <h3>沒有找到符合的美食</h3>
          <p>試試放寬預算、更換餐點類型，或清除搜尋關鍵字吧！</p>
          <button class="btn btn-outline" id="reset-explore-filter-btn">重設篩選條件</button>
        </div>
      `;
      container.querySelector("#reset-explore-filter-btn")?.addEventListener("click", () => {
        document.querySelector('.budget-pill[data-budget="all"]')?.click();
        document.querySelector('.meal-type-pill[data-meal-type="全部類型"]')?.click();
        const searchInput = document.getElementById("explore-search-input");
        if (searchInput) searchInput.value = "";
        this.searchKeyword = "";
        this.renderExploreGrid();
      });
      return;
    }

    container.innerHTML = list.map((food) => this.createFoodCardHTML(food)).join("");
    this.bindCardEvents(container);
  },

  /**
   * 功能 4：我的美食收藏 ❤️
   */
  setupFavoritesSection() {
    const categoryFilter = document.getElementById("favorites-category-filter");
    const clearAllBtn = document.getElementById("clear-favorites-btn");

    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        this.renderFavoritesGrid(categoryFilter.value);
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", () => {
        if (this.favorites.length === 0) return;
        if (confirm("確定要清空所有收藏的美食清單嗎？♡")) {
          this.favorites = [];
          this.saveFavorites();
          this.renderFavoritesGrid();
          this.showToast("已清空所有美食收藏", "info");
        }
      });
    }
  },

  /**
   * 渲染收藏清單網格
   */
  renderFavoritesGrid(filterCategory = "all") {
    const container = document.getElementById("favorites-food-grid");
    const countDisplay = document.getElementById("favorites-total-count");
    if (!container) return;

    const favFoods = FOOD_DATABASE.filter((f) => this.favorites.includes(f.id));
    const filtered =
      filterCategory === "all" ? favFoods : favFoods.filter((f) => f.category === filterCategory);

    if (countDisplay) {
      countDisplay.textContent = `共收藏 ${favFoods.length} 款美食`;
    }

    if (favFoods.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-icon">🎀</div>
          <h3>你的美食口袋清單還是空的</h3>
          <p>看到心動的美食，隨時點擊卡片上的愛心加入收藏吧 ♡</p>
          <button class="btn btn-primary" data-nav-target="explore-section">
            🍓 前往探索美食
          </button>
        </div>
      `;
      container.querySelector("[data-nav-target]")?.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.nav-link[data-target="explore-section"]')?.click();
      });
      return;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-icon">🍽️</div>
          <h3>此分類下暫無收藏</h3>
          <p>切換為全部料理，即可檢視所有收藏的美食！</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((food) => this.createFoodCardHTML(food)).join("");
    this.bindCardEvents(container);
  },

  /**
   * 通用卡片 HTML 模板 (韓系甜點店菜單精緻風格)
   */
  createFoodCardHTML(food, options = {}) {
    const isFav = this.isFavorite(food.id);
    const moodTags = food.moods
      .map((m) => {
        const item = MOOD_DICT[m];
        return item ? `<span class="mood-tag ${item.badgeClass}">${item.emoji} ${item.label}</span>` : "";
      })
      .join("");

    return `
      <div class="food-card" data-food-id="${food.id}">
        <div class="food-card-img-wrap">
          <img 
            src="${food.image}" 
            alt="${food.name}" 
            loading="lazy"
            onerror="window.handleImageError(this, '${food.name}')" 
          />
          <div class="card-img-vignette"></div>
          <button 
            class="card-heart-btn heart-toggle ${isFav ? "favorited" : ""}" 
            data-id="${food.id}" 
            data-name="${food.name}"
            title="${isFav ? "已收藏，點擊取消" : "加入收藏"}"
          >
            <svg class="icon-heart" viewBox="0 0 24 24" fill="${isFav ? "#FF477E" : "none"}" stroke="${isFav ? "#FF477E" : "currentColor"}" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <div class="card-badge-row">
            <span class="card-cuisine-pill">${food.category}</span>
            <span class="card-meal-pill">${food.mealType}</span>
          </div>
        </div>
        <div class="food-card-body">
          <div class="food-header-row">
            <h4 class="food-card-title">${food.name}</h4>
            <div class="food-card-price-seal">
              <span class="price-symbol">NT$</span>
              <span class="price-value">${food.price}</span>
            </div>
          </div>
          <p class="food-card-desc">${food.description}</p>
          ${
            options.showMoodReason && food.moodReason
              ? `<div class="card-mood-reason">
                   <span class="reason-icon">💗</span>
                   <p><strong>推薦理由：</strong>${food.moodReason}</p>
                 </div>`
              : ""
          }
          <div class="card-footer-row">
            <div class="food-card-moods">${moodTags}</div>
            <div class="card-view-hint">
              <span>詳細 ♡</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 綁定卡片點擊事件 (愛心收藏與詳細彈窗)
   */
  bindCardEvents(container) {
    // 綁定愛心按鈕
    container.querySelectorAll(".card-heart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        this.toggleFavorite(id, name);
      });
    });

    // 綁定整張卡片點擊查看詳細
    container.querySelectorAll(".food-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.foodId;
        const food = FOOD_DATABASE.find((f) => f.id === id);
        if (food) this.showFoodDetailModal(food);
      });
    });
  },

  /**
   * 顯示食物詳細彈窗
   */
  showFoodDetailModal(food) {
    const modal = document.getElementById("detail-modal");
    if (!modal) return;

    const isFav = this.isFavorite(food.id);
    const moodPills = food.moods
      .map((m) => {
        const item = MOOD_DICT[m];
        return item
          ? `<span class="mood-tag ${item.badgeClass}">${item.emoji} ${item.label} · ${item.tagline}</span>`
          : "";
      })
      .join("");

    modal.querySelector(".modal-body-content").innerHTML = `
      <div class="detail-modal-header">
        <span class="detail-category-badge">${food.category} · ${food.mealType}</span>
        <h3 class="detail-title">${food.name}</h3>
      </div>
      <div class="detail-image-box">
        <img 
          src="${food.image}" 
          alt="${food.name}"
          onerror="window.handleImageError(this, '${food.name}')" 
        />
      </div>
      <div class="detail-price-box">
        <span class="detail-price-label">參考價格：</span>
        <span class="detail-price-val">NT$ ${food.price}</span>
      </div>
      <p class="detail-description">${food.description}</p>
      ${
        food.moodReason
          ? `<div class="detail-mood-reason">
              <span class="sparkle">✨</span>
              <p><strong>推薦心情私房語：</strong>${food.moodReason}</p>
            </div>`
          : ""
      }
      <div class="detail-mood-tags">
        <label>適合心情：</label>
        <div class="tags-row">${moodPills}</div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-outline close-current-modal">關閉</button>
        <button 
          class="btn btn-primary heart-toggle ${isFav ? "favorited" : ""}" 
          id="detail-fav-btn"
          data-id="${food.id}"
          data-name="${food.name}"
        >
          ${isFav ? "❤️ 已加入收藏" : "♡ 收藏這道美食"}
        </button>
      </div>
    `;

    modal.querySelector(".close-current-modal").addEventListener("click", () => {
      this.closeModal("detail-modal");
    });

    const favBtn = modal.querySelector("#detail-fav-btn");
    favBtn.addEventListener("click", () => {
      const added = this.toggleFavorite(food.id, food.name);
      favBtn.textContent = added ? "❤️ 已加入收藏" : "♡ 收藏這道美食";
      favBtn.classList.toggle("favorited", added);
    });

    this.openModal("detail-modal");
  },

  /**
   * 彈窗通訊機制
   */
  setupModals() {
    // 點擊關閉按鈕或遮罩關閉彈窗
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.closest(".modal-close-btn")) {
          this.closeModal(modal.id);
        }
      });
    });

    // ESC 鍵關閉彈窗
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach((modal) => {
          this.closeModal(modal.id);
        });
      }
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  },

  /**
   * 回到頂端浮動按鈕
   */
  setupScrollToTop() {
    const topBtn = document.getElementById("scroll-top-btn");
    if (!topBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        topBtn.classList.add("visible");
      } else {
        topBtn.classList.remove("visible");
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};

// DOM 載入完畢後啟動
document.addEventListener("DOMContentLoaded", () => {
  YummyApp.init();
});
