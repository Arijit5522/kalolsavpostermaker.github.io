// Canvas rendering engine for Sub District Kalolsavam Poster Generator
import { THEMES, DEFAULT_PROFILES } from "./presets.js";

export class PosterRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.aspectRatios = {
      "4:5": { width: 1200, height: 1500 },
      "9:16": { width: 1200, height: 2133 },
      "1:1": { width: 1200, height: 1200 }
    };
    this.currentAspect = "4:5";
    this.userImage = null;
    this.logoImage = null;
    this.language = "ml"; // 'ml' or 'en'
    
    // Photo transformations
    this.photoTransform = {
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0
    };

    // Poster state with authentic, realistic defaults (NEVER say "schoolname and stuff")
    this.state = {
      ...DEFAULT_PROFILES.ml,
      positionBadge: "🥇",
      gradeBadge: "⭐",
      themeId: "royal_blue",
      showStars: true,
      showBokeh: true,
      showKathakaliMotif: false,
      hideLabels: false, // clean minimalist pills vs labeled pills
      photoFrameStyle: "gold_ring"
    };
  }

  setLanguage(lang) {
    this.language = lang;
  }

  setAspectRatio(ratioKey) {
    if (this.aspectRatios[ratioKey]) {
      this.currentAspect = ratioKey;
      const { width, height } = this.aspectRatios[ratioKey];
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  updateState(partialState) {
    this.state = { ...this.state, ...partialState };
  }

  setUserImage(img) {
    this.userImage = img;
  }

  setLogoImage(img) {
    this.logoImage = img;
  }

  setPhotoTransform(transform) {
    this.photoTransform = { ...this.photoTransform, ...transform };
  }

  resetPhotoTransform() {
    this.photoTransform = {
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0
    };
  }

  // Draw the entire poster
  render() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    const theme = THEMES[this.state.themeId] || THEMES.royal_blue;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // 1. Background Gradient
    this.drawBackground(theme, w, h);

    // 2. Bokeh Orbs
    if (this.state.showBokeh) {
      this.drawBokehOrbs(theme, w, h);
    }

    // 3. Cultural Motif Watermark (Optional)
    if (this.state.showKathakaliMotif) {
      this.drawKathakaliMotif(theme, w, h);
    }

    // 4. Golden Borders & Corner Ornaments
    this.drawBordersAndCorners(theme, w, h);

    // Compute dynamic vertical layout based on aspect ratio
    const layout = this.computeLayout(w, h);

    // 5. Header: Sub-District, Kalolsavam Title, Venue & Dates
    this.drawHeader(theme, layout);

    // 6. Circular Photo Frame & Avatar / Student Photo
    this.drawPhoto(theme, layout);

    // 7. Greeting & Student Info
    this.drawStudentInfo(theme, layout);

    // 8. Result Card / Capsule Pills (Clean & never says "schoolname")
    this.drawResultCard(theme, layout);

    ctx.restore();
  }

  drawBackground(theme, w, h) {
    const { ctx } = this;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, theme.gradientStart);
    grad.addColorStop(0.45, theme.gradientMid);
    grad.addColorStop(1, theme.gradientEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Radial highlight at top-center for festive radiance
    const radial = ctx.createRadialGradient(w / 2, 170, 40, w / 2, 260, 520);
    radial.addColorStop(0, "rgba(255, 215, 0, 0.14)");
    radial.addColorStop(0.5, "rgba(255, 215, 0, 0.04)");
    radial.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);
  }

  drawBokehOrbs(theme, w, h) {
    const { ctx } = this;
    const orbs = [
      { x: w * 0.15, y: h * 0.16, r: 190, color: theme.bokehColor1 },
      { x: w * 0.86, y: h * 0.22, r: 160, color: theme.bokehColor2 },
      { x: w * 0.12, y: h * 0.48, r: 200, color: theme.bokehColor1 },
      { x: w * 0.85, y: h * 0.74, r: 240, color: theme.bokehColor1 },
      { x: w * 0.88, y: h * 0.48, r: 140, color: theme.bokehColor3 },
      { x: w * 0.22, y: h * 0.88, r: 180, color: theme.bokehColor2 }
    ];

    orbs.forEach(orb => {
      ctx.save();
      const radial = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      radial.addColorStop(0, orb.color);
      radial.addColorStop(0.7, orb.color);
      radial.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fillStyle = radial;
      ctx.fill();
      ctx.restore();
    });
  }

  drawKathakaliMotif(theme, w, h) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = "rgba(255, 215, 0, 0.07)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.40, 340, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.40, 360, 0, Math.PI * 2);
    ctx.setLineDash([12, 12]);
    ctx.stroke();
    ctx.restore();
  }

  drawBordersAndCorners(theme, w, h) {
    const { ctx } = this;
    const margin = 28;
    const innerMargin = 38;

    ctx.save();
    // Outer border
    ctx.strokeStyle = theme.goldBorder;
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

    // Inner subtle border
    ctx.strokeStyle = "rgba(255, 215, 0, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerMargin, innerMargin, w - innerMargin * 2, h - innerMargin * 2);

    // Corner diamond accents
    this.drawDiamond(ctx, margin + 4, margin + 4, 10, theme.goldPrimary);
    this.drawDiamond(ctx, w - margin - 4, margin + 4, 10, theme.goldPrimary);
    this.drawDiamond(ctx, margin + 4, h - margin - 4, 10, theme.goldPrimary);
    this.drawDiamond(ctx, w - margin - 4, h - margin - 4, 10, theme.goldPrimary);

    // Top Sparkles / Diamonds (matching reference photo)
    if (this.state.showStars) {
      const topStarY = innerMargin + 32;
      this.drawDiamond(ctx, w * 0.08, topStarY + 4, 11, theme.goldSecondary);
      this.drawDiamond(ctx, w * 0.15, topStarY, 15, theme.goldPrimary);
      this.drawDiamond(ctx, w * 0.23, topStarY + 4, 12, theme.goldSecondary);
    }

    ctx.restore();
  }

  drawDiamond(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(234, 179, 8, 0.6)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.8, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.8, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  computeLayout(w, h) {
    if (this.currentAspect === "9:16") {
      return {
        headerTop: h * 0.065,
        photoCenterY: h * 0.40,
        photoRadius: 215,
        greetingY: h * 0.585,
        studentNameY: h * 0.64,
        itemY: h * 0.69,
        cardY: h * 0.74,
        cardHeight: 330,
        cardWidth: w * 0.86
      };
    } else if (this.currentAspect === "1:1") {
      return {
        headerTop: h * 0.05,
        photoCenterY: h * 0.38,
        photoRadius: 165,
        greetingY: h * 0.58,
        studentNameY: h * 0.64,
        itemY: h * 0.695,
        cardY: h * 0.745,
        cardHeight: 250,
        cardWidth: w * 0.90
      };
    }
    // Default 4:5 Poster ratio
    return {
      headerTop: h * 0.06,
      photoCenterY: h * 0.395,
      photoRadius: 195,
      greetingY: h * 0.585,
      studentNameY: h * 0.645,
      itemY: h * 0.695,
      cardY: h * 0.745,
      cardHeight: 285,
      cardWidth: w * 0.87
    };
  }

  drawHeader(theme, layout) {
    const { ctx } = this;
    const w = this.canvas.width;
    let currentY = layout.headerTop;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const fontFamily = this.language === "en" 
      ? "'Outfit', -apple-system, sans-serif" 
      : "'Manjari', 'Noto Sans Malayalam', sans-serif";

    // 1. Sub-District
    if (this.state.subDistrict && this.state.subDistrict.trim()) {
      ctx.font = `700 34px ${fontFamily}`;
      ctx.fillStyle = theme.goldPrimary;
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 6;
      ctx.fillText(this.state.subDistrict.trim(), w / 2, currentY);
      currentY += 46;
    }

    // 2. Kalolsavam Title
    const titleLines = (this.state.kalolsavamTitle || "").split("\n").filter(Boolean);
    ctx.fillStyle = theme.textColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    titleLines.forEach((line) => {
      ctx.font = `800 58px ${fontFamily}`;
      ctx.fillText(line.trim(), w / 2, currentY);
      currentY += 62;
    });

    currentY -= 8;

    // 3. Venue
    if (this.state.venue && this.state.venue.trim()) {
      ctx.font = `600 27px ${fontFamily}`;
      ctx.fillStyle = theme.subTextColor;
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 4;
      ctx.fillText(this.state.venue.trim(), w / 2, currentY);
      currentY += 36;
    }

    // 4. Dates
    if (this.state.dates && this.state.dates.trim()) {
      ctx.font = `500 24px ${fontFamily}`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(this.state.dates.trim(), w / 2, currentY);
    }

    // Logo (if uploaded)
    if (this.logoImage) {
      const logoSize = 80;
      ctx.drawImage(this.logoImage, 55, layout.headerTop - 15, logoSize, logoSize);
    }

    ctx.restore();
  }

  drawPhoto(theme, layout) {
    const { ctx } = this;
    const w = this.canvas.width;
    const cx = w / 2;
    const cy = layout.photoCenterY;
    const r = layout.photoRadius;

    ctx.save();

    // Soft drop shadow under photo
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;
    ctx.fill();
    ctx.restore();

    // Clip circle for student image or placeholder
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (this.userImage) {
      ctx.save();
      ctx.translate(cx + this.photoTransform.panX, cy + this.photoTransform.panY);
      ctx.rotate((this.photoTransform.rotation * Math.PI) / 180);
      ctx.scale(this.photoTransform.zoom, this.photoTransform.zoom);

      const img = this.userImage;
      const imgAspect = img.width / img.height;
      let drawW, drawH;
      if (imgAspect > 1) {
        drawH = r * 2;
        drawW = drawH * imgAspect;
      } else {
        drawW = r * 2;
        drawH = drawW / imgAspect;
      }
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      this.drawPlaceholderAvatar(cx, cy, r);
    }

    ctx.restore(); // end clip

    // Golden metallic border ring
    ctx.save();
    const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    ringGrad.addColorStop(0, "#fde047");
    ringGrad.addColorStop(0.3, "#eab308");
    ringGrad.addColorStop(0.6, "#ca8a04");
    ringGrad.addColorStop(0.85, "#fef08a");
    ringGrad.addColorStop(1, "#b45309");

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 9;
    ctx.strokeStyle = ringGrad;
    ctx.shadowColor = "rgba(234, 179, 8, 0.5)";
    ctx.shadowBlur = 12;
    ctx.stroke();

    // Inner rim
    ctx.beginPath();
    ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  }

  drawPlaceholderAvatar(cx, cy, r) {
    const { ctx } = this;
    const bgGrad = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
    bgGrad.addColorStop(0, "#d1d5db");
    bgGrad.addColorStop(1, "#cbd5e1");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    // Head
    ctx.fillStyle = "#7c8ba1";
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.16, r * 0.38, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.82, r * 0.68, r * 0.52, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawStudentInfo(theme, layout) {
    const { ctx } = this;
    const w = this.canvas.width;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const isEn = this.language === "en";
    const greetingFont = isEn 
      ? "'Outfit', -apple-system, sans-serif" 
      : "'Gayathri', 'Manjari', sans-serif";
    const nameFont = isEn 
      ? "'Outfit', -apple-system, sans-serif" 
      : "'Manjari', 'Noto Sans Malayalam', sans-serif";

    // 1. Congratulations
    if (this.state.greeting && this.state.greeting.trim()) {
      ctx.font = `800 48px ${greetingFont}`;
      ctx.fillStyle = theme.goldPrimary;
      ctx.shadowColor = "rgba(234, 179, 8, 0.4)";
      ctx.shadowBlur = 10;
      ctx.fillText(this.state.greeting.trim(), w / 2, layout.greetingY);
    }

    // 2. Student Name (Clean, never generic "Student Name")
    let studentName = (this.state.studentName || "").trim();
    if (studentName) {
      ctx.font = `800 56px ${nameFont}`;
      ctx.fillStyle = theme.textColor;
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 3;

      const maxWidth = w * 0.84;
      if (ctx.measureText(studentName).width > maxWidth) {
        ctx.font = `800 44px ${nameFont}`;
      }
      ctx.fillText(studentName, w / 2, layout.studentNameY);
    }

    // 3. Participated Item / Event
    let itemName = (this.state.itemName || "").trim();
    if (itemName) {
      ctx.font = `600 32px ${nameFont}`;
      ctx.fillStyle = theme.labelColor;
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fillText(itemName, w / 2, layout.itemY);
    }

    ctx.restore();
  }

  drawResultCard(theme, layout) {
    const { ctx } = this;
    const w = this.canvas.width;
    const cardW = layout.cardWidth;
    const cardH = layout.cardHeight;
    const cardX = (w - cardW) / 2;
    const cardY = layout.cardY;
    const isEn = this.language === "en";
    const font = isEn ? "'Outfit', sans-serif" : "'Manjari', 'Noto Sans Malayalam', sans-serif";

    ctx.save();

    // Filter valid rows: do NOT display empty rows or "schoolname and stuff"
    const isPlaceholderText = (text) => {
      if (!text) return true;
      const lower = text.trim().toLowerCase();
      const forbidden = [
        "schoolname", "school name", "സ്കൂളിന്റെ പേര്", "സ്കൂൾ പേര്",
        "studentname", "student name", "വിദ്യാർത്ഥിയുടെ പേര്",
        "participated item", "പങ്കെടുത്ത ഇനം", "inam",
        "sthanam", "സ്ഥാനം", "position",
        "grade", "ഗ്രേഡ്"
      ];
      return forbidden.includes(lower);
    };

    const validRows = [];

    // Row 1: School (only if user provided an actual school name)
    const schoolVal = (this.state.schoolName || "").trim();
    if (schoolVal && !isPlaceholderText(schoolVal)) {
      validRows.push({
        label: this.state.schoolLabel || (isEn ? "School" : "സ്കൂൾ"),
        value: schoolVal,
        icon: "🏫",
        badge: ""
      });
    }

    // Row 2: Position
    const posVal = (this.state.position || "").trim();
    if (posVal && !isPlaceholderText(posVal)) {
      validRows.push({
        label: this.state.positionLabel || (isEn ? "Position" : "ലഭിച്ച സ്ഥാനം"),
        value: posVal,
        icon: "🏆",
        badge: this.state.positionBadge || ""
      });
    }

    // Row 3: Grade
    const gradeVal = (this.state.grade || "").trim();
    if (gradeVal && !isPlaceholderText(gradeVal)) {
      validRows.push({
        label: this.state.gradeLabel || (isEn ? "Grade" : "ഗ്രേഡ്"),
        value: gradeVal,
        icon: "⭐",
        badge: this.state.gradeBadge || ""
      });
    }

    // If all rows were empty, fallback to authentic default
    if (validRows.length === 0) {
      validRows.push({
        label: isEn ? "Position" : "ലഭിച്ച സ്ഥാനം",
        value: isEn ? "First Place" : "ഒന്നാം സ്ഥാനം",
        icon: "🏆",
        badge: "🥇"
      });
    }

    const pillCount = validRows.length;
    const gap = 12;
    const pillH = Math.min(84, (cardH - gap * (pillCount - 1)) / pillCount);
    const pillRadius = 14;
    const startY = cardY + (cardH - (pillH * pillCount + gap * (pillCount - 1))) / 2;

    validRows.forEach((row, i) => {
      const currentY = startY + i * (pillH + gap);
      const centerY = currentY + pillH / 2;

      // 1. Draw rounded capsule pill box
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, currentY, cardW, pillH, pillRadius);
      ctx.fillStyle = theme.cardBg;
      ctx.fill();

      // Translucent pill border
      ctx.strokeStyle = theme.cardBorder;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.textBaseline = "middle";

      let valText = row.value;
      if (row.badge && row.badge !== "none" && !valText.includes(row.badge)) {
        valText = `${row.value} ${row.badge}`;
      }

      if (this.state.hideLabels) {
        // Minimalist / Centered mode (clean badges without redundant "School:" label)
        ctx.textAlign = "center";
        ctx.fillStyle = theme.textColor;
        ctx.font = `700 30px ${font}`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fillText(`${row.icon}  ${valText}`, cardX + cardW / 2, centerY);
      } else {
        // Classic 2-column mode (Label on left, Value on right - exactly like reference)
        ctx.textAlign = "left";
        ctx.font = `700 27px ${font}`;
        ctx.fillStyle = theme.goldSecondary;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(row.label, cardX + 34, centerY);

        ctx.fillStyle = theme.textColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 6;

        const rightColStartX = cardX + cardW * 0.38;
        const rightColMaxW = cardW * 0.58;

        let fontSize = 29;
        ctx.font = `700 ${fontSize}px ${font}`;
        while (ctx.measureText(valText).width > rightColMaxW && fontSize > 18) {
          fontSize -= 1.5;
          ctx.font = `700 ${fontSize}px ${font}`;
        }
        ctx.fillText(valText, rightColStartX, centerY);
      }

      ctx.restore();
    });

    // Decorative sparkles next to bottom pill (matching reference photo)
    if (this.state.showStars && pillCount > 1) {
      const bottomPillY = startY + (pillCount - 1) * (pillH + gap);
      this.drawDiamond(ctx, cardX + cardW - 160, bottomPillY - 2, 7, theme.goldSecondary);
      this.drawDiamond(ctx, cardX + cardW - 75, bottomPillY + 8, 11, theme.goldPrimary);
      this.drawDiamond(ctx, cardX + cardW + 8, bottomPillY - 4, 8, theme.goldSecondary);
    }

    ctx.restore();
  }

  getExportDataURL(format = "image/png", quality = 0.96) {
    return this.canvas.toDataURL(format, quality);
  }

  getExportBlob(format = "image/png", quality = 0.96) {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => resolve(blob), format, quality);
    });
  }
}
