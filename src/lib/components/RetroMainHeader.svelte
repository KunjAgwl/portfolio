<script>
  import { onMount } from 'svelte';

  let { theme = 'gold' } = $props();

  let sunsetCanvas;

  onMount(() => {
    // 60 FPS Real-Time Animated Synthwave Beach Sunset Canvas
    let animId;
    if (sunsetCanvas) {
      const ctx = sunsetCanvas.getContext('2d');
      const w = (sunsetCanvas.width = sunsetCanvas.parentElement.clientWidth || 420);
      const h = (sunsetCanvas.height = 200);

      let time = 0;
      let gridOffset = 0;

      // Random twinkling stars in sky
      const stars = Array.from({ length: 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * (h * 0.5),
        size: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2
      }));

      // Shooting star state
      let shootingStar = { active: false, x: 0, y: 0, dx: 0, dy: 0, life: 0 };

      const drawScene = () => {
        ctx.clearRect(0, 0, w, h);
        time += 0.03;
        gridOffset = (gridOffset + 0.6) % 14;

        // 1. Deep Cosmic Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
        skyGrad.addColorStop(0, '#04000b');
        skyGrad.addColorStop(0.5, '#1c002b');
        skyGrad.addColorStop(1, '#4a0040');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h * 0.6);

        // 2. Twinkling Stars
        stars.forEach(s => {
          const alpha = 0.4 + Math.sin(time * 2 + s.phase) * 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Occasional Shooting Star
        if (!shootingStar.active && Math.random() < 0.015) {
          shootingStar = {
            active: true,
            x: Math.random() * (w * 0.6) + w * 0.2,
            y: Math.random() * 30 + 5,
            dx: -4 - Math.random() * 3,
            dy: 2 + Math.random() * 2,
            life: 25
          };
        }
        if (shootingStar.active) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.life / 25})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x + shootingStar.dx * 6, shootingStar.y + shootingStar.dy * 6);
          ctx.stroke();

          shootingStar.x += shootingStar.dx;
          shootingStar.y += shootingStar.dy;
          shootingStar.life--;
          if (shootingStar.life <= 0) shootingStar.active = false;
        }

        // 3. Pulsing Radiant Synthwave Sun
        const sunX = w * 0.5;
        const sunY = h * 0.4;
        const sunPulse = Math.sin(time * 1.5) * 2;
        const sunR = 52 + sunPulse;

        // Outer Aura
        const auraGrad = ctx.createRadialGradient(sunX, sunY, sunR * 0.7, sunX, sunY, sunR + 12);
        auraGrad.addColorStop(0, 'rgba(255, 0, 119, 0.4)');
        auraGrad.addColorStop(1, 'rgba(255, 0, 119, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR + 12, 0, Math.PI * 2);
        ctx.fill();

        // Core Sun
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.3, '#ffdd00');
        sunGrad.addColorStop(0.7, '#ff7700');
        sunGrad.addColorStop(1, '#ff1a40');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fill();

        // Precision Sun Scanlines
        ctx.fillStyle = '#06020c';
        const lineCount = 5;
        for (let i = 0; i < lineCount; i++) {
          const sy = sunY + 8 + i * 8;
          const sw = Math.sqrt(Math.max(0, sunR * sunR - (sy - sunY) * (sy - sunY))) * 2;
          ctx.fillRect(sunX - sw / 2, sy, sw, 2 + i * 0.8);
        }

        // 4. Ocean Water Base
        const waterY = h * 0.6;
        const waterGrad = ctx.createLinearGradient(0, waterY, 0, h);
        waterGrad.addColorStop(0, '#0e0420');
        waterGrad.addColorStop(0.5, '#090a1a');
        waterGrad.addColorStop(1, '#020308');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, waterY, w, h - waterY);

        // 5. Glistening Sun Reflection Ripples on Ocean Water (Animated Shimmer)
        const rippleCount = 10;
        for (let i = 0; i < rippleCount; i++) {
          const ry = waterY + 4 + i * 7.5;
          const shimmer = Math.sin(time * 3 + i * 0.8) * 8;
          const rWidth = (60 + i * 24) + shimmer;

          // Golden/Orange Glow Reflection
          ctx.strokeStyle = (i % 2 === 0) ? '#ff7700' : '#ffea00';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sunX - rWidth / 2, ry);
          ctx.lineTo(sunX + rWidth / 2, ry);
          ctx.stroke();
        }

        // 6. Continuously Scrolling Cyan Perspective Grid Overlay on Ocean
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.45;

        // Horizontally moving grid lines
        for (let y = waterY + (gridOffset % 10); y < h; y += 10) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Radial perspective lines
        const vanishX = sunX;
        for (let x = -w * 0.5; x <= w * 1.5; x += 35) {
          ctx.beginPath();
          ctx.moveTo(vanishX, waterY);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

        // 7. Tropical Palm Tree Silhouettes (Gently Swaying in Breeze)
        const sway = Math.sin(time * 1.2) * 2;
        ctx.fillStyle = '#04000b';
        ctx.strokeStyle = '#04000b';

        // Left Palm
        ctx.save();
        ctx.translate(15 + sway * 0.5, 45);
        ctx.beginPath();
        ctx.moveTo(28, 140);
        ctx.quadraticCurveTo(32 + sway, 80, 48 + sway, 15);
        ctx.lineTo(52 + sway, 15);
        ctx.quadraticCurveTo(36 + sway, 80, 30, 140);
        ctx.closePath();
        ctx.fill();

        // Fronds
        ctx.lineWidth = 1.5;
        const frondSway = sway * 0.8;
        ctx.beginPath();
        ctx.moveTo(48 + sway, 15); ctx.quadraticCurveTo(15 + frondSway, 5, -10 + frondSway, 25);
        ctx.moveTo(48 + sway, 15); ctx.quadraticCurveTo(25 + frondSway, -15, 0 + frondSway, -30);
        ctx.moveTo(48 + sway, 15); ctx.quadraticCurveTo(70 + frondSway, -25, 95 + frondSway, -18);
        ctx.moveTo(48 + sway, 15); ctx.quadraticCurveTo(80 + frondSway, 10, 105 + frondSway, 35);
        ctx.stroke();
        ctx.restore();

        // Beach Shoreline Dune
        ctx.fillStyle = '#030008';
        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.quadraticCurveTo(70, 130, 140, 160);
        ctx.quadraticCurveTo(210, 190, w, 185);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();

        // Neon Dune Edge Accent
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.quadraticCurveTo(70, 130, 140, 160);
        ctx.quadraticCurveTo(210, 190, w, 185);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        animId = requestAnimationFrame(drawScene);
      };
      drawScene();
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  });
</script>

<div class="retro-panel font-mono mb-2 p-3 overflow-hidden">
  <!-- Top Title Bar -->
  <div class="flex justify-between items-center mb-1">
    <div class="text-[10px] text-muted tracking-widest flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>WELCOME TO THE HOME OF</span>
    </div>
    <div class="text-green text-xs font-mono font-bold tracking-wider">
      HUMAN AFTER ALL
    </div>
  </div>

  <!-- Signature Crimson Red Brush Title: Kunj Agarwal -->
  <div class="mb-2">
    <span class="daft-logo-text">Kunj Agarwal</span>
  </div>

  <div class="banner-grid">
    <!-- Left Hero Art: 60 FPS Real-Time Live Animated Synthwave Beach Sunset Canvas -->
    <div class="relative w-full h-52 bg-black border border-[var(--border-amber-light)] rounded overflow-hidden flex items-center justify-center shadow-2xl">
      <canvas bind:this={sunsetCanvas} class="w-full h-full block"></canvas>
    </div>

    <!-- Right Hero Text List (Matching Target Screenshot) -->
    <div class="font-mono text-xs space-y-2 text-amber leading-relaxed pl-2">
      <div>I BUILD DIGITAL THINGS.</div>
      <div>I PROGRAM ROBOTS.</div>
      <div>I DESIGN FUTURES.</div>
      <div>I LIKE 80S STUFF.</div>
      <div>I MAKE SOME MUSIC.</div>
      <div class="pt-1 text-xs">
        WELCOME TO <span class="text-purple font-bold">MY UNIVERSE.</span>
      </div>
      <div class="text-purple font-bold text-sm">→</div>
    </div>
  </div>
</div>
