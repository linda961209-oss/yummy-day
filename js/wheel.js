/**
 * Yummy Day — 美食命運轉盤 (Fortune Wheel)
 * 韓系奶油甜點盤視覺風格 (Boutique Cafe Cake Platter Design)
 * 真正物理減速旋轉、精確指針判定、自選類別/預算、結果彈窗與音效支援
 */

class FoodWheel {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    
    // 設定高解析度 (Retina 螢幕防模糊)
    this.setupHiDPI();
    
    this.items = [];
    this.currentAngle = 0; // 當前轉動角度 (弧度)
    this.isSpinning = false;
    this.animationId = null;
    this.lastTickIndex = -1;
    
    // 韓系法式甜點馬卡龍頂級粉彩 (Boutique Cafe Macaron Palette)
    this.palette = [
      "#FFB5C0", // 草莓馬卡龍生乳粉
      "#FFE39F", // 蜂蜜金黃戚風奶油
      "#C6E7BE", // 靜岡宇治抹茶雪酪
      "#FFD2BA", // 蜜桃伯爵焦糖奶茶
      "#D9CCF5", // 薰衣草香芋生乳酪
      "#BAE8E0", // 薄荷晨光冰茶藍
      "#FFE6B8", // 法式香草烤布蕾黃
      "#FFC2D0"  // 甜心櫻花白桃慕斯
    ];
    
    // 綁定視窗縮放重繪
    window.addEventListener("resize", () => {
      this.setupHiDPI();
      this.draw();
    });
  }

  /**
   * 處理 Canvas 在 Retina 高解析度螢幕上的清晰度與響應式尺寸
   */
  setupHiDPI() {
    const container = this.canvas.parentElement;
    const containerRect = container ? container.getBoundingClientRect() : null;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let displayWidth = rect.width;
    if (!displayWidth || displayWidth < 60) {
      displayWidth = containerRect && containerRect.width > 60 ? containerRect.width : 420;
    }
    let displayHeight = rect.height;
    if (!displayHeight || displayHeight < 60) {
      displayHeight = containerRect && containerRect.height > 60 ? containerRect.height : displayWidth;
    }

    // 確保轉盤維持正圓形 (上限 440px)
    const size = Math.min(displayWidth, displayHeight, 440);
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);
    this.width = size;
    this.height = size;
    this.radius = size / 2 - 20; // 預留外圈精緻珠飾外框空間
  }

  /**
   * 設定轉盤項目 (通常為 6 ~ 10 個，視覺效果最佳)
   */
  setItems(items) {
    if (!items || items.length === 0) return;
    this.items = items;
    this.draw();
  }

  /**
   * 繪製韓系奶油法式甜點盤轉盤
   */
  draw() {
    const ctx = this.ctx;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const n = this.items.length;

    ctx.clearRect(0, 0, this.width, this.height);

    if (n === 0) {
      // 空狀態溫柔提示
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#8C7B7D";
      ctx.font = "bold 15px 'Noto Sans TC', sans-serif";
      ctx.fillText("請先篩選美食候補名單 ♡", centerX, centerY);
      ctx.restore();
      return;
    }

    const arc = (2 * Math.PI) / n;

    // ── 1. 轉盤最外層：甜點托盤立體柔霧陰影 ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius + 14, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFF9F4";
    ctx.shadowColor = "rgba(220, 130, 150, 0.22)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    ctx.fill();
    ctx.restore();

    // ── 2. 法式復古珍珠珠飾外圈 (Scalloped Pearl Beads) ──
    const pearlCount = 32;
    const pearlOrbit = this.radius + 8;
    for (let p = 0; p < pearlCount; p++) {
      const pAngle = (p * 2 * Math.PI) / pearlCount;
      const px = centerX + Math.cos(pAngle) * pearlOrbit;
      const py = centerY + Math.sin(pAngle) * pearlOrbit;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 3.8, 0, 2 * Math.PI);
      ctx.fillStyle = p % 2 === 0 ? "#FFFFFF" : "#FFE5B4";
      ctx.strokeStyle = "#F0C895";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "rgba(240, 180, 120, 0.35)";
      ctx.shadowBlur = 3;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // ── 3. 復古金邊蕾絲內圈 ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius + 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "#F2C779";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 虛線裝飾環
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.arc(centerX, centerY, this.radius - 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.restore();

    // ── 4. 繪製各扇形區塊 (馬卡龍色系 + 漸層微光 + 白色嵌線) ──
    for (let i = 0; i < n; i++) {
      const angle = this.currentAngle + i * arc;
      const baseColor = this.palette[i % this.palette.length];

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, this.radius, angle, angle + arc);
      ctx.closePath();

      // 扇形填充色
      ctx.fillStyle = baseColor;
      ctx.fill();

      // 扇形白色微柔分界線 (精緻工整)
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3.5;
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      // ── 5. 繪製扇形文字與小圖標 ──
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      
      // 文字字體與深焙咖啡豆色 (#3A2E2F)，更具備頂級生活感
      ctx.fillStyle = "#3A2E2F";
      ctx.font = "bold 14px 'Noto Sans TC', 'Nunito', sans-serif";

      // 截斷過長名稱
      let text = this.items[i].name;
      if (text.length > 7) {
        text = text.substring(0, 6) + "…";
      }

      // 純白微發光文字陰影，確保在各色扇形上字體立體清晰
      ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
      ctx.shadowBlur = 5;
      ctx.fillText(text, this.radius - 28, 0);

      // 文字前方精緻小糖粒金星/草莓點綴
      ctx.beginPath();
      ctx.arc(this.radius - 14, 0, 3.2, 0, 2 * Math.PI);
      ctx.fillStyle = "#FF5277";
      ctx.shadowColor = "rgba(255, 82, 119, 0.4)";
      ctx.shadowBlur = 4;
      ctx.fill();

      ctx.restore();
    }

    // ── 6. 轉盤中心：立體甜點鮮奶油泡芙金幣輪轂 (Center Glossy Macaron Hub) ──
    ctx.save();
    
    // 金箔底座環
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#F5D48E";
    ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 3;
    ctx.fill();

    // 鮮奶油純白圓餅
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // 草莓馬卡龍內環
    ctx.beginPath();
    ctx.arc(centerX, centerY, 26, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFF0F4";
    ctx.strokeStyle = "#FF7597";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // 中心精緻草莓圖標
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "22px sans-serif";
    ctx.fillText("🍓", centerX, centerY + 1);
    ctx.restore();
  }

  /**
   * 計算當前指針（正上方 12 點鐘，即 270° / 3π/2 處）指著哪一個項目
   */
  getCurrentIndex() {
    const n = this.items.length;
    if (n === 0) return -1;
    const arc = (2 * Math.PI) / n;
    
    // 指針在正上方 270 度 (3 * Math.PI / 2)
    const pointerAngle = (3 * Math.PI) / 2;
    
    // 將當前旋轉角度規範到 [0, 2π)
    let normalized = this.currentAngle % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;

    // 計算相對指針的角度差
    let relativeAngle = (pointerAngle - normalized) % (2 * Math.PI);
    if (relativeAngle < 0) relativeAngle += 2 * Math.PI;

    return Math.floor(relativeAngle / arc) % n;
  }

  /**
   * 執行轉盤旋轉動畫 (包含流暢物理減速與精準對齊)
   * @param {number} targetIndex - 預定選中的項目索引 (若未指定則隨機挑選)
   * @param {function} onComplete - 轉動結束後回呼 (傳入選中的 item 物件)
   */
  spin(targetIndex = null, onComplete = null) {
    if (this.isSpinning || this.items.length === 0) return;

    this.isSpinning = true;
    const n = this.items.length;
    const arc = (2 * Math.PI) / n;

    // 若未指定目標，隨機決定一個中獎項目
    if (targetIndex === null || targetIndex < 0 || targetIndex >= n) {
      targetIndex = Math.floor(Math.random() * n);
    }

    // 計算指針正上方對齊該項目時所需的最終角度
    // 嚴格保證 targetIndex 的扇形停在指針 (3π/2) 正下方
    const jitter = 0.25 + Math.random() * 0.5;
    const targetOffsetInSlice = targetIndex * arc + arc * jitter;
    const pointerAngle = (3 * Math.PI) / 2;

    // 基礎圈數：旋轉 6 ~ 8 圈以營造期待感
    const extraSpins = 6 + Math.floor(Math.random() * 3);
    const startAngle = this.currentAngle;
    
    // 算出目標角度 (必須大於 startAngle)
    let baseTargetAngle = pointerAngle - targetOffsetInSlice;
    while (baseTargetAngle <= startAngle) {
      baseTargetAngle += 2 * Math.PI;
    }
    const finalAngle = baseTargetAngle + extraSpins * 2 * Math.PI;
    const totalAngleDelta = finalAngle - startAngle;

    // 動畫總時間 (毫秒)
    const duration = 4800;
    const startTime = performance.now();

    // 三次貝茲減速曲線 (Cubic Easing Out)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // 指針動畫搖晃節奏
    const pointerEl = document.querySelector(".wheel-pointer");

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      this.currentAngle = startAngle + totalAngleDelta * easedProgress;
      this.draw();

      // 檢查是否跨過扇形邊界，觸發滴答聲與指針微晃
      const currentIndex = this.getCurrentIndex();
      if (currentIndex !== this.lastTickIndex) {
        this.lastTickIndex = currentIndex;
        window.SoundFX?.tick();

        // 指針輕巧彈跳
        if (pointerEl) {
          pointerEl.classList.remove("pointer-tick");
          void pointerEl.offsetWidth; // 強制重繪觸發動畫
          pointerEl.classList.add("pointer-tick");
        }
      }

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.currentAngle = finalAngle % (2 * Math.PI);
        this.draw();

        if (pointerEl) pointerEl.classList.remove("pointer-tick");

        // 取得最終確定的項目 (驗證與預期 targetIndex 100% 一致)
        const finalWinnerIndex = this.getCurrentIndex();
        const winner = this.items[finalWinnerIndex];

        // 播放勝利音效與撒花效果
        window.SoundFX?.win();
        window.triggerConfetti?.();

        if (onComplete) {
          onComplete(winner);
        }
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }
}

// 導出至全域
window.FoodWheel = FoodWheel;
