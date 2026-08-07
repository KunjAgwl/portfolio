<script>
  import { onMount } from 'svelte';

  let neuralCanvas;

  onMount(() => {
    // Interactive Neural Network Graph Canvas Renderer
    let nAnim;
    if (neuralCanvas) {
      const nctx = neuralCanvas.getContext('2d');
      const nw = (neuralCanvas.width = neuralCanvas.parentElement.clientWidth || 380);
      const nh = (neuralCanvas.height = 180);
      let pulseProgress = 0;

      const layers = [
        [ {x: 40, y: 35}, {x: 40, y: 90}, {x: 40, y: 145} ],
        [ {x: 140, y: 25}, {x: 140, y: 70}, {x: 140, y: 115}, {x: 140, y: 155} ],
        [ {x: 240, y: 25}, {x: 240, y: 70}, {x: 240, y: 115}, {x: 240, y: 155} ],
        [ {x: 340, y: 55}, {x: 340, y: 125} ]
      ];

      const drawNeural = () => {
        nctx.clearRect(0, 0, nw, nh);
        nctx.fillStyle = '#050505';
        nctx.fillRect(0, 0, nw, nh);

        pulseProgress = (pulseProgress + 0.02) % 1;

        // Connections
        nctx.strokeStyle = '#3a2b1f';
        nctx.lineWidth = 1;
        for (let l = 0; l < layers.length - 1; l++) {
          layers[l].forEach(n1 => {
            layers[l+1].forEach(n2 => {
              nctx.beginPath(); nctx.moveTo(n1.x, n1.y); nctx.lineTo(n2.x, n2.y); nctx.stroke();
            });
          });
        }

        // Signal Pulses flowing through network
        for (let l = 0; l < layers.length - 1; l++) {
          layers[l].forEach((n1, i) => {
            layers[l+1].forEach((n2, j) => {
              if ((i + j) % 2 === 0) {
                const px = n1.x + (n2.x - n1.x) * pulseProgress;
                const py = n1.y + (n2.y - n1.y) * pulseProgress;
                nctx.fillStyle = '#33ff88';
                nctx.beginPath(); nctx.arc(px, py, 2.5, 0, Math.PI * 2); nctx.fill();
              }
            });
          });
        }

        // Nodes
        layers.forEach((layer, lIdx) => {
          layer.forEach(n => {
            nctx.fillStyle = lIdx === 0 ? '#44bba4' : (lIdx === layers.length - 1 ? '#c084fc' : '#e6a15c');
            nctx.beginPath(); nctx.arc(n.x, n.y, 5.5, 0, Math.PI * 2); nctx.fill();
            nctx.strokeStyle = '#ffffff';
            nctx.lineWidth = 1;
            nctx.stroke();
          });
        });

        nAnim = requestAnimationFrame(drawNeural);
      };
      drawNeural();
    }

    return () => {
      if (nAnim) cancelAnimationFrame(nAnim);
    };
  });
</script>

<div class="my-2 font-mono">
  <!-- AI / Neural Network Signal Flow Topology -->
  <div class="retro-sub-box p-3">
    <div class="sub-box-header">
      <span class="text-purple font-bold text-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-purple animate-ping"></span>
        <span>AI // PYTORCH DEEP NEURAL NETWORK TOPOLOGY</span>
      </span>
      <span class="text-muted text-[10px]">REAL-TIME SIGNAL PULSE</span>
    </div>

    <div class="w-full h-44 bg-black border border-[var(--border-amber-dark)] rounded overflow-hidden shadow-inner">
      <canvas bind:this={neuralCanvas} class="w-full h-full block"></canvas>
    </div>
  </div>
</div>
