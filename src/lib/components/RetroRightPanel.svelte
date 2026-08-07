<script>
  import { onMount } from 'svelte';

  let { theme = 'gold' } = $props();

  let timeString = $state('22:47:19');
  let dateString = $state('08 AUG 2026');

  let cpuUsage = $state(42);
  let memoryUsage = $state(61);

  let globeCanvas;
  let mountainCanvas;

  onMount(() => {
    // 1. Live ticking clock & fluctuating telemetry
    const updateClock = () => {
      const now = new Date();
      timeString = now.toTimeString().split(' ')[0];
      const day = String(now.getDate()).padStart(2, '0');
      const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      dateString = `${day} ${month} ${year}`;

      // Gently fluctuate CPU & Memory for live telemetry movement
      cpuUsage = Math.floor(40 + Math.random() * 6);
      memoryUsage = Math.floor(60 + Math.random() * 4);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

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

        // Outer rim
        gctx.beginPath();
        gctx.arc(center, center, radius, 0, Math.PI * 2);
        gctx.stroke();

        // Parallels
        for (let i = -2; i <= 2; i++) {
          const latY = center + i * 7;
          const rLat = Math.sqrt(Math.max(0, radius * radius - (i * 7) * (i * 7)));
          gctx.beginPath();
          gctx.ellipse(center, latY, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
          gctx.stroke();
        }

        // Rotating Meridian
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
      const mh = (mountainCanvas.height = 100);
      let gridOffset = 0;

      const drawMountains = () => {
        mctx.clearRect(0, 0, mw, mh);
        mctx.fillStyle = '#050505';
        mctx.fillRect(0, 0, mw, mh);

        gridOffset = (gridOffset + 0.8) % 12;

        // Crescent moon
        mctx.fillStyle = '#c084fc';
        mctx.beginPath();
        mctx.arc(mw - 30, 22, 9, 0, Math.PI * 2);
        mctx.fill();
        mctx.fillStyle = '#050505';
        mctx.beginPath();
        mctx.arc(mw - 33, 19, 9, 0, Math.PI * 2);
        mctx.fill();

        // Wireframe Mountains
        mctx.strokeStyle = '#e6a15c';
        mctx.lineWidth = 1;

        const horizon = mh * 0.55;
        const pts = [
          [0, horizon], [mw * 0.2, horizon - 20], [mw * 0.38, horizon - 42],
          [mw * 0.52, horizon - 15], [mw * 0.72, horizon - 32], [mw, horizon]
        ];

        mctx.beginPath();
        mctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          mctx.lineTo(pts[i][0], pts[i][1]);
        }
        mctx.stroke();

        // Continuously Scrolling Perspective Grid Lines
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

    return () => {
      clearInterval(interval);
      if (globeAnim) cancelAnimationFrame(globeAnim);
      if (mAnim) cancelAnimationFrame(mAnim);
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

    <!-- VISUAL FEED.exe Box (Continuously Scrolling Grid) -->
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

    <!-- SYSTEM MONITOR.sys Box (Live Fluctuating Telemetry) -->
    <div class="retro-sub-box mb-2">
      <div class="sub-box-header">
        <span class="text-amber font-bold text-[11px]">SYSTEM MONITOR.sys</span>
        <span class="text-muted text-[10px]">↗</span>
      </div>

      <div class="space-y-2 text-[11px]">
        <div>
          <div class="flex justify-between text-muted text-[10px] mb-0.5">
            <span>CPU USAGE</span>
            <span class="text-amber">{cpuUsage}%</span>
          </div>
          <div class="w-full bg-black h-2 rounded border border-[var(--border-amber)] overflow-hidden p-0.5">
            <div class="bg-amber h-full rounded transition-all duration-500" style="width: {cpuUsage}%;"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-muted text-[10px] mb-0.5">
            <span>MEMORY</span>
            <span class="text-amber">{memoryUsage}%</span>
          </div>
          <div class="w-full bg-black h-2 rounded border border-[var(--border-amber)] overflow-hidden p-0.5">
            <div class="bg-amber h-full rounded transition-all duration-500" style="width: {memoryUsage}%;"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-muted text-[10px] mb-0.5">
            <span>CREATIVITY</span>
            <span class="text-green-bright">99%</span>
          </div>
          <div class="w-full bg-black h-2 rounded border border-[var(--border-amber)] overflow-hidden p-0.5">
            <div class="bg-green-bright h-full rounded" style="width: 99%;"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-muted text-[10px] mb-0.5">
            <span>CAFFEINE</span>
            <span class="text-amber-bright">83%</span>
          </div>
          <div class="w-full bg-black h-2 rounded border border-[var(--border-amber)] overflow-hidden p-0.5">
            <div class="bg-amber-bright h-full rounded" style="width: 83%;"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-muted text-[10px] mb-0.5">
            <span>VIBES</span>
            <span class="text-green-bright">100%</span>
          </div>
          <div class="w-full bg-black h-2 rounded border border-[var(--border-amber)] overflow-hidden p-0.5">
            <div class="bg-green-bright h-full rounded" style="width: 100%;"></div>
          </div>
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
