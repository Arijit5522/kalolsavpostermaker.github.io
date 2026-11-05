// Photo editor controller: handles upload, drag-to-pan, zoom, rotation, clipboard paste

export class PhotoEditor {
  constructor(options) {
    this.canvas = options.canvas;
    this.renderer = options.renderer;
    this.onUpdate = options.onUpdate || (() => {});

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initPanX = 0;
    this.initPanY = 0;

    this.setupListeners();
  }

  setupListeners() {
    // 1. Mouse drag on canvas to pan photo
    this.canvas.addEventListener("mousedown", (e) => this.handleDragStart(e.clientX, e.clientY));
    window.addEventListener("mousemove", (e) => this.handleDragMove(e.clientX, e.clientY));
    window.addEventListener("mouseup", () => this.handleDragEnd());

    // 2. Touch drag on mobile
    this.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (this.isDragging && e.touches.length === 1) {
        this.handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchend", () => this.handleDragEnd());

    // 3. Paste image from clipboard (Ctrl+V / Cmd+V)
    window.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          this.loadImageFile(blob);
          break;
        }
      }
    });

    // 4. Drag & Drop file onto canvas
    this.canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.canvas.classList.add("ring-4", "ring-amber-400");
    });

    this.canvas.addEventListener("dragleave", () => {
      this.canvas.classList.remove("ring-4", "ring-amber-400");
    });

    this.canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      this.canvas.classList.remove("ring-4", "ring-amber-400");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.loadImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  handleDragStart(clientX, clientY) {
    if (!this.renderer.userImage) return;
    this.isDragging = true;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    this.initPanX = this.renderer.photoTransform.panX;
    this.initPanY = this.renderer.photoTransform.panY;
  }

  handleDragMove(clientX, clientY) {
    if (!this.isDragging) return;
    // Scale delta based on display canvas vs render canvas resolution
    const rect = this.canvas.getBoundingClientRect();
    const scaleFactor = this.canvas.width / rect.width;

    const dx = (clientX - this.dragStartX) * scaleFactor;
    const dy = (clientY - this.dragStartY) * scaleFactor;

    this.renderer.setPhotoTransform({
      panX: this.initPanX + dx,
      panY: this.initPanY + dy
    });
    this.renderer.render();
    this.onUpdate();
  }

  handleDragEnd() {
    this.isDragging = false;
  }

  loadImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        this.renderer.setUserImage(img);
        this.renderer.resetPhotoTransform();
        this.renderer.render();
        this.onUpdate();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  loadSamplePhoto(sampleType = "dancer") {
    // Generate an illustrative photo on an offscreen canvas
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = 600;
    sampleCanvas.height = 600;
    const sCtx = sampleCanvas.getContext("2d");

    if (sampleType === "dancer") {
      // Elegant Kerala dance performer illustration
      const bgGrad = sCtx.createLinearGradient(0, 0, 600, 600);
      bgGrad.addColorStop(0, "#fde047");
      bgGrad.addColorStop(1, "#ca8a04");
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, 600, 600);

      // Traditional circular ornament
      sCtx.fillStyle = "#854d0e";
      sCtx.beginPath();
      sCtx.arc(300, 300, 260, 0, Math.PI * 2);
      sCtx.fill();

      // Portrait silhouette with golden ornaments
      sCtx.fillStyle = "#fef08a";
      sCtx.beginPath();
      sCtx.arc(300, 240, 110, 0, Math.PI * 2);
      sCtx.fill();

      // Kireedam / Headgear
      sCtx.fillStyle = "#f59e0b";
      sCtx.beginPath();
      sCtx.moveTo(220, 190);
      sCtx.lineTo(300, 90);
      sCtx.lineTo(380, 190);
      sCtx.closePath();
      sCtx.fill();

      // Costume drape
      sCtx.fillStyle = "#eab308";
      sCtx.beginPath();
      sCtx.ellipse(300, 480, 200, 160, 0, 0, Math.PI * 2);
      sCtx.fill();
    } else {
      // Modern student portrait illustration
      const bgGrad = sCtx.createLinearGradient(0, 0, 0, 600);
      bgGrad.addColorStop(0, "#e2e8f0");
      bgGrad.addColorStop(1, "#94a3b8");
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, 600, 600);

      sCtx.fillStyle = "#475569";
      sCtx.beginPath();
      sCtx.arc(300, 240, 110, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.beginPath();
      sCtx.ellipse(300, 520, 210, 160, 0, 0, Math.PI * 2);
      sCtx.fill();
    }

    const img = new Image();
    img.onload = () => {
      this.renderer.setUserImage(img);
      this.renderer.resetPhotoTransform();
      this.renderer.render();
      this.onUpdate();
    };
    img.src = sampleCanvas.toDataURL("image/png");
  }

  setZoom(zoomVal) {
    this.renderer.setPhotoTransform({ zoom: parseFloat(zoomVal) });
    this.renderer.render();
  }

  rotate90() {
    let nextRotation = (this.renderer.photoTransform.rotation + 90) % 360;
    this.renderer.setPhotoTransform({ rotation: nextRotation });
    this.renderer.render();
  }

  reset() {
    this.renderer.resetPhotoTransform();
    this.renderer.render();
    this.onUpdate();
  }

  clearPhoto() {
    this.renderer.setUserImage(null);
    this.renderer.resetPhotoTransform();
    this.renderer.render();
    this.onUpdate();
  }
}
