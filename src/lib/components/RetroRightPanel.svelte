<script>
  import { onMount } from 'svelte';

  let { theme = 'gold' } = $props();

  let timeString = $state('22:47:19');
  let dateString = $state('08 AUG 2026');

  let cpuUsage = $state(42);
  let memoryUsage = $state(61);
  let creativityUsage = $state(99);
  let caffeineUsage = $state(83);
  let vibesUsage = $state(100);

  let globeCanvas;
  let mountainCanvas;
  let neuralCanvas;

  onMount(() => {
    // 1. Live ticking clock & telemetry movement
    const updateClock = () => {
      const now = new Date();
      timeString = now.toTimeString().split(' ')[0];
      const day = String(now.getDate()).padStart(2, '0');
      const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      dateString = `${day} ${month} ${year}`;

      cpuUsage = Math.floor(40 + Math.random() * 6);
      memoryUsage = Math.floor(59 + Math.random() * 4);
      caffeineUsage = Math.floor(81 + Math.random() * 4);
    };
    updateClock();
    const interval = setInterval(updateClock, 800);

    // 2. Rotating 3D Globe Canvas Animation
    let globeAnim;
    if (globeCanvas) {
      const gctx = globeCanvas.getContext('2d');
      const size = (globeCanvas.width = globeCanvas.height = 64);
      let angle = 0;

      const drawGlobe = () => {
        gctx.clearRect(0, 0, size, size);
        const center = size / 2;
        const radius = 25;

        gctx.strokeStyle = '#e6a15c';
        gctx.lineWidth = 1;

        gctx.beginPath();
        gctx.arc(center, center, radius, 0, Math.PI * 2);
        gctx.stroke();

        for (let i = -2; i <= 2; i++) {
          const latY = center + i * 7;
          const rLat = Math.sqrt(Math.max(0, radius * radius - (i * 7) * (i * 7)));
          gctx.beginPath();
          gctx.ellipse(center, latY, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
          gctx.stroke();
        }

        angle += 0.04;
        const rLon = radius * Math.sin(angle);
        gctx.beginPath();
        gctx.ellipse(center, center, Math.abs(rLon), radius, 0, 0, Math.PI * 2);
        gctx.stroke();

        globeAnim = requestAnimationFrame(drawGlobe);
      };
      drawGlobe();
    }

    // 3. Continuously Scrolling VISUAL FEED Mountain Canvas
    let mAnim;
    if (mountainCanvas) {
      const mctx = mountainCanvas.getContext('2d');
      const mw = (mountainCanvas.width = mountainCanvas.parentElement.clientWidth || 220);
      const mh = (mountainCanvas.height = 85);
      let gridOffset = 0;

      const drawMountains = () => {
        mctx.clearRect(0, 0, mw, mh);
        mctx.fillStyle = '#050505';
        mctx.fillRect(0, 0, mw, mh);

        gridOffset = (gridOffset + 0.8) % 12;

        mctx.fillStyle = '#c084fc';
        mctx.beginPath();
        mctx.arc(mw - 25, 20, 8, 0, Math.PI * 2);
        mctx.fill();
        mctx.fillStyle = '#050505';
        mctx.beginPath();
        mctx.arc(mw - 28, 17, 8, 0, Math.PI * 2);
        mctx.fill();

        mctx.strokeStyle = '#e6a15c';
        mctx.lineWidth = 1;

        const horizon = mh * 0.55;
        const pts = [
          [0, horizon], [mw * 0.2, horizon - 18], [mw * 0.38, horizon - 38],
          [mw * 0.52, horizon - 14], [mw * 0.72, horizon - 28], [mw, horizon]
        ];

        mctx.beginPath();
        mctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          mctx.lineTo(pts[i][0], pts[i][1]);
        }
        mctx.stroke();

        for (let y = horizon + (gridOffset % 6); y < mh; y += 6) {
          mctx.beginPath();
          mctx.moveTo(0, y);
          mctx.lineTo(mw, y);
          mctx.stroke();
        }

        mAnim = requestAnimationFrame(drawMountains);
      };
      drawMountains();
    }

    // 4. PyTorch Deep Neural Network Canvas
    let nAnim;
    if (neuralCanvas) {
      const nctx = neuralCanvas.getContext('2d');
      const nw = (neuralCanvas.width = neuralCanvas.parentElement.clientWidth || 220);
      const nh = (neuralCanvas.height = 95);
      let pulseProgress = 0;

      const layers = [
        [ {x: 25, y: 20}, {x: 25, y: 48}, {x: 25, y: 76} ],
        [ {x: 85, y: 15}, {x: 85, y: 36}, {x: 85, y: 58}, {x: 85, y: 80} ],
        [ {x: 145, y: 15}, {x: 145, y: 36}, {x: 145, y: 58}, {x: 145, y: 80} ],
        [ {x: 195, y: 30}, {x: 195, y: 66} ]
      ];

      const drawNeural = () => {
        nctx.clearRect(0, 0, nw, nh);
        nctx.fillStyle = '#050505';
        nctx.fillRect(0, 0, nw, nh);

        pulseProgress = (pulseProgress + 0.025) % 1;

        nctx.strokeStyle = '#3a2b1f';
        nctx.lineWidth = 1;
        for (let l = 0; l < layers.length - 1; l++) {
          layers[l].forEach(n1 => {
            layers[l+1].forEach(n2 => {
              nctx.beginPath(); nctx.moveTo(n1.x, n1.y); nctx.lineTo(n2.x, n2.y); nctx.stroke();
            });
          });
        }

        for (let l = 0; l < layers.length - 1; l++) {
          layers[l].forEach((n1, i) => {
            layers[l+1].forEach((n2, j) => {
              if ((i + j) % 2 === 0) {
                const px = n1.x + (n2.x - n1.x) * pulseProgress;
                const py = n1.y + (n2.y - n1.y) * pulseProgress;
                nctx.fillStyle = '#33ff88';
                nctx.beginPath(); nctx.arc(px, py, 2, 0, Math.PI * 2); nctx.fill();
              }
            });
          });
        }

        layers.forEach((layer, lIdx) => {
          layer.forEach(n => {
            nctx.fillStyle = lIdx === 0 ? '#44bba4' : (lIdx === layers.length - 1 ? '#c084fc' : '#e6a15c');
            nctx.beginPath(); nctx.arc(n.x, n.y, 4, 0, Math.PI * 2); nctx.fill();
          });
        });

        nAnim = requestAnimationFrame(drawNeural);
      };
      drawNeural();
    }

    return () => {
      clearInterval(interval);
      if (globeAnim) cancelAnimationFrame(globeAnim);
      if (mAnim) cancelAnimationFrame(mAnim);
      if (nAnim) cancelAnimationFrame(nAnim);
    };
  });
</script>

<aside class="retro-panel h-full flex flex-col justify-between font-mono text-xs select-none p-2.5">
  <div>
    <!-- Date & Location Box -->
    <div class="retro-sub-box mb-2">
      <div class="flex justify-between items-center">
        <div class="space-y-1 text-[11px]">
          <div>DATE: <span class="text-amber-bright font-bold">{dateString}</span></div>
          <div>TIME: <span class="text-green-bright font-bold">{timeString}</span></div>
          <div>LOCATION: <span class="text-green font-bold">EARTH</span></div>
          <div>CONNECTION: <span class="text-amber font-bold">56K MODEM</span></div>
        </div>

        <div class="w-16 h-16 flex items-center justify-center">
          <canvas bind:this={globeCanvas}></canvas>
        </div>
      </div>
    </div>

    <!-- VISUAL FEED.exe Box -->
    <div class="retro-sub-box mb-2">
      <div class="sub-box-header">
        <span class="text-amber font-bold text-[11px] flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
          <span>VISUAL FEED.exe</span>
        </span>
        <span class="text-muted text-[10px]">↗</span>
      </div>

      <div class="w-full rounded border border-[var(--border-amber-dark)] overflow-hidden">
        <canvas bind:this={mountainCanvas} class="w-full block"></canvas>
      </div>
    </div>

    <!-- AI NEURAL NETWORK TOPOLOGY -->
    <div class="retro-sub-box mb-2">
      <div class="sub-box-header">
        <span class="text-purple font-bold text-[11px] flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-purple animate-ping"></span>
          <span>AI NEURAL TOPOLOGY</span>
        </span>
        <span class="text-muted text-[10px]">↗</span>
      </div>

      <div class="w-full h-24 bg-black rounded border border-[var(--border-amber-dark)] overflow-hidden">
        <canvas bind:this={neuralCanvas} class="w-full block"></canvas>
      </div>
    </div>

    <!-- SYSTEM MONITOR.sys (1:1 EXACT MATCH TO REFERENCE SCREENSHOT DITHERED RETRO BARS) -->
    <div class="retro-sub-box mb-2">
      <div class="sub-box-header">
        <span class="text-amber font-bold text-[11px]">SYSTEM MONITOR.sys</span>
        <span class="text-muted text-[10px]">↗</span>
      </div>

      <div class="space-y-2.5 text-[11px] font-mono p-1">
        <!-- CPU USAGE Row -->
        <div class="flex items-center justify-between">
          <span class="w-24 text-amber truncate">CPU USAGE</span>
          <div class="flex-1 mx-2 h-2.5 bg-black border border-[var(--border-amber-light)] rounded-xs overflow-hidden relative">
            <div 
              class="h-full transition-all duration-500" 
              style="width: {cpuUsage}%; background-color: #cbb299; background-image: repeating-linear-gradient(90deg, #cbb299 0px, #cbb299 2px, #000000 2px, #000000 4px);"
            ></div>
          </div>
          <span class="w-8 text-right text-amber font-bold">{cpuUsage}%</span>
        </div>

        <!-- MEMORY Row -->
        <div class="flex items-center justify-between">
          <span class="w-24 text-amber truncate">MEMORY</span>
          <div class="flex-1 mx-2 h-2.5 bg-black border border-[var(--border-amber-light)] rounded-xs overflow-hidden relative">
            <div 
              class="h-full transition-all duration-500" 
              style="width: {memoryUsage}%; background-color: #cbb299; background-image: repeating-linear-gradient(90deg, #cbb299 0px, #cbb299 2px, #000000 2px, #000000 4px);"
            ></div>
          </div>
          <span class="w-8 text-right text-amber font-bold">{memoryUsage}%</span>
        </div>

        <!-- CREATIVITY Row -->
        <div class="flex items-center justify-between">
          <span class="w-24 text-amber truncate">CREATIVITY</span>
          <div class="flex-1 mx-2 h-2.5 bg-black border border-[var(--border-amber-light)] rounded-xs overflow-hidden relative">
            <div 
              class="h-full" 
              style="width: {creativityUsage}%; background-color: #cbb299; background-image: repeating-linear-gradient(90deg, #cbb299 0px, #cbb299 2px, #000000 2px, #000000 4px);"
            ></div>
          </div>
          <span class="w-8 text-right text-amber font-bold">{creativityUsage}%</span>
        </div>

        <!-- CAFFEINE Row -->
        <div class="flex items-center justify-between">
          <span class="w-24 text-amber truncate">CAFFEINE</span>
          <div class="flex-1 mx-2 h-2.5 bg-black border border-[var(--border-amber-light)] rounded-xs overflow-hidden relative">
            <div 
              class="h-full transition-all duration-500" 
              style="width: {caffeineUsage}%; background-color: #cbb299; background-image: repeating-linear-gradient(90deg, #cbb299 0px, #cbb299 2px, #000000 2px, #000000 4px);"
            ></div>
          </div>
          <span class="w-8 text-right text-amber font-bold">{caffeineUsage}%</span>
        </div>

        <!-- VIBES Row -->
        <div class="flex items-center justify-between">
          <span class="w-24 text-amber truncate">VIBES</span>
          <div class="flex-1 mx-2 h-2.5 bg-black border border-[var(--border-amber-light)] rounded-xs overflow-hidden relative">
            <div 
              class="h-full" 
              style="width: {vibesUsage}%; background-color: #cbb299; background-image: repeating-linear-gradient(90deg, #cbb299 0px, #cbb299 2px, #000000 2px, #000000 4px);"
            ></div>
          </div>
          <span class="w-8 text-right text-amber font-bold">{vibesUsage}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Status Footer -->
  <div class="pt-2 border-t border-[var(--border-amber-dark)] flex justify-between text-[10px]">
    <span class="text-muted">STATUS:</span>
    <span class="text-green-bright font-bold flex items-center gap-1">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-pulse"></span>
      <span>IN THE ZONE</span>
    </span>
  </div>
</aside>
