<script>
  import { onMount } from 'svelte';
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let canvas;
  let animId;
  let mouseX = $state(0);
  let mouseY = $state(0);

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 240;
      }
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.005;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let rotY = 0;
    let rotX = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      rotY += (mouseX - rotY) * 0.05 + 0.005;
      rotX += (mouseY - rotX) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const scale = 75;

      // Geometric 3D Helmet Vertices (Guy-Manuel / Thomas hybrid shape)
      const rawVertices = [
        // Dome Top
        [0, -1.4, 0], [0.5, -1.2, 0.4], [-0.5, -1.2, 0.4], [0.5, -1.2, -0.4], [-0.5, -1.2, -0.4],
        // Visor Bar Front
        [-0.9, -0.2, 0.8], [0.9, -0.2, 0.8], [0.9, 0.3, 0.8], [-0.9, 0.3, 0.8],
        // Visor Bar Back
        [-0.9, -0.2, -0.8], [0.9, -0.2, -0.8], [0.9, 0.3, -0.8], [-0.9, 0.3, -0.8],
        // Jaw / Base
        [-0.6, 1.0, 0.6], [0.6, 1.0, 0.6], [0.6, 1.0, -0.6], [-0.6, 1.0, -0.6]
      ];

      const edges = [
        [0,1],[0,2],[0,3],[0,4],[1,2],[3,4],[1,3],[2,4],
        [5,6],[6,7],[7,8],[8,5],
        [9,10],[10,11],[11,12],[12,9],
        [5,9],[6,10],[7,11],[8,12],
        [5,13],[6,14],[7,14],[8,13],
        [13,14],[14,15],[15,16],[16,13]
      ];

      // Rotate & Project
      const projected = rawVertices.map(([x, y, z]) => {
        // Y rotation
        let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
        let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);

        // X rotation
        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const fov = 300 / (300 + z2 * 50);
        return [
          centerX + x1 * scale * fov,
          centerY + y2 * scale * fov
        ];
      });

      const color = theme === 'gold' ? '#ffd700' : '#00f0ff';

      // Render wireframe
      ctx.save();
      ctx.strokeStyle = color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;
      ctx.lineWidth = 1.5;

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });

      // Render Visor LED Pulse
      ctx.fillStyle = theme === 'gold' ? 'rgba(255, 215, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(projected[5][0], projected[5][1]);
      ctx.lineTo(projected[6][0], projected[6][1]);
      ctx.lineTo(projected[7][0], projected[7][1]);
      ctx.lineTo(projected[8][0], projected[8][1]);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  function handleCanvasClick() {
    audio.playLaser();
  }
</script>

<div 
  class="holo-helmet-wrapper relative w-full overflow-hidden rounded-xl border border-white/10 my-4 bg-black/60 shadow-2xl cursor-pointer"
  onclick={handleCanvasClick}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && handleCanvasClick()}
>
  <canvas bind:this={canvas} class="w-full block"></canvas>
  <div class="absolute bottom-2 left-4 font-mono text-[10px] text-slate-400 tracking-wider flex items-center gap-2">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
    <span>3D HOLOGRAPHIC HELMET WIREFRAME // MOUSE PARALLAX ACTIVE</span>
  </div>
</div>
