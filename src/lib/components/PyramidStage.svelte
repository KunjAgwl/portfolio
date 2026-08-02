<script>
  import { onMount } from 'svelte';

  let { theme = 'gold' } = $props();

  let canvas;
  let animId;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 220);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 220;
      }
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;
    let laserOffset = 0;

    // Starfield particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.5 + 0.1,
      alpha: Math.random() * 0.7 + 0.3
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#040508');
      bgGrad.addColorStop(1, '#0e1017');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render star particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = theme === 'gold' ? `rgba(255, 215, 0, ${p.alpha})` : `rgba(0, 240, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Pyramid Grid (Alive 2007 Stage)
      const centerX = width / 2;
      const apexY = height * 0.22;
      const baseWidth = Math.min(width * 0.7, 450);
      const baseY = height * 0.85;

      const levels = 8;
      const primaryColor = theme === 'gold' ? '#ffd700' : '#00f0ff';
      const secondaryColor = theme === 'gold' ? '#ff0055' : '#ffd700';

      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = primaryColor;
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;

      // Draw pyramid outer outline
      ctx.beginPath();
      ctx.moveTo(centerX, apexY);
      ctx.lineTo(centerX - baseWidth / 2, baseY);
      ctx.lineTo(centerX + baseWidth / 2, baseY);
      ctx.closePath();
      ctx.stroke();

      // Draw pyramid horizontal tiers & diagonal mesh
      for (let i = 1; i <= levels; i++) {
        const ratio = i / levels;
        const currentY = apexY + (baseY - apexY) * ratio;
        const currentWidth = (baseWidth / 2) * ratio;

        ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor;
        ctx.beginPath();
        ctx.moveTo(centerX - currentWidth, currentY);
        ctx.lineTo(centerX + currentWidth, currentY);
        ctx.stroke();

        // Center spine
        ctx.beginPath();
        ctx.moveTo(centerX, apexY);
        ctx.lineTo(centerX, currentY);
        ctx.stroke();
      }

      // Laser spotlight beams shooting from pyramid apex
      laserOffset += 0.03;
      const laserCount = 5;
      for (let i = 0; i < laserCount; i++) {
        const lAngle = Math.sin(laserOffset + i) * 0.8;
        const targetX = centerX + Math.tan(lAngle) * (height - apexY);

        ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(centerX, apexY);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      ctx.restore();

      // Equalizer baseline floor
      const numBars = 36;
      const barWidth = width / numBars;
      for (let b = 0; b < numBars; b++) {
        const barHeight = Math.abs(Math.sin(angle + b * 0.4)) * 35 + 5;
        ctx.fillStyle = b % 2 === 0 ? primaryColor : secondaryColor;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(b * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
      }

      angle += 0.05;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div class="pyramid-container relative w-full overflow-hidden rounded-2xl border border-white/10 my-4 shadow-xl">
  <canvas bind:this={canvas} class="w-full block"></canvas>
  <div class="absolute top-3 left-4 font-mono text-xs text-white/60 tracking-wider flex items-center gap-2">
    <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
    ALIVE 2007 STAGE VISUALIZER // REALTIME CANVAS
  </div>
</div>
