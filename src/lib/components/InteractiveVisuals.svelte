<script>
  import { onMount } from 'svelte';
  import { audio } from '../audio.js';

  let robotCanvas;
  let neuralCanvas;

  // Robot Arm Angles
  let baseAngle = $state(45);
  let elbowAngle = $state(-30);
  let wristAngle = $state(20);

  onMount(() => {
    // 1. Interactive Robotic Arm 2D/3D Canvas Renderer
    let rAnim;
    if (robotCanvas) {
      const rctx = robotCanvas.getContext('2d');
      const rw = (robotCanvas.width = robotCanvas.parentElement.clientWidth || 380);
      const rh = (robotCanvas.height = 180);

      const drawRobot = () => {
        rctx.clearRect(0, 0, rw, rh);
        rctx.fillStyle = '#050505';
        rctx.fillRect(0, 0, rw, rh);

        // Grid floor
        rctx.strokeStyle = '#1a2228';
        rctx.lineWidth = 1;
        for (let x = 0; x < rw; x += 20) {
          rctx.beginPath(); rctx.moveTo(x, rh - 20); rctx.lineTo(x, rh); rctx.stroke();
        }
        rctx.strokeStyle = '#44bba4';
        rctx.beginPath(); rctx.moveTo(0, rh - 20); rctx.lineTo(rw, rh - 20); rctx.stroke();

        // Base Origin
        const bx = rw * 0.3;
        const by = rh - 20;

        // Kinematics Chain Calculation
        const l1 = 55; // Shoulder length
        const l2 = 45; // Forearm length
        const l3 = 25; // End effector

        const a1 = (baseAngle - 90) * (Math.PI / 180);
        const j1x = bx + l1 * Math.cos(a1);
        const j1y = by + l1 * Math.sin(a1);

        const a2 = a1 + (elbowAngle * (Math.PI / 180));
        const j2x = j1x + l2 * Math.cos(a2);
        const j2y = j1y + l2 * Math.sin(a2);

        const a3 = a2 + (wristAngle * (Math.PI / 180));
        const j3x = j2x + l3 * Math.cos(a3);
        const j3y = j2y + l3 * Math.sin(a3);

        // Base Pillar
        rctx.fillStyle = '#2a1f17';
        rctx.fillRect(bx - 18, by - 12, 36, 12);
        rctx.strokeStyle = '#e6a15c';
        rctx.strokeRect(bx - 18, by - 12, 36, 12);

        // Link 1 (Shoulder)
        rctx.strokeStyle = '#e6a15c';
        rctx.lineWidth = 6;
        rctx.beginPath(); rctx.moveTo(bx, by - 12); rctx.lineTo(j1x, j1y); rctx.stroke();

        // Link 2 (Forearm)
        rctx.strokeStyle = '#44bba4';
        rctx.lineWidth = 4;
        rctx.beginPath(); rctx.moveTo(j1x, j1y); rctx.lineTo(j2x, j2y); rctx.stroke();

        // Link 3 (Wrist)
        rctx.strokeStyle = '#33ff88';
        rctx.lineWidth = 2;
        rctx.beginPath(); rctx.moveTo(j2x, j2y); rctx.lineTo(j3x, j3y); rctx.stroke();

        // Joints
        rctx.fillStyle = '#ffaa00';
        [ [bx, by - 12], [j1x, j1y], [j2x, j2y] ].forEach(([jx, jy]) => {
          rctx.beginPath(); rctx.arc(jx, jy, 4, 0, Math.PI * 2); rctx.fill();
        });

        // End Effector Laser Target Beam
        rctx.strokeStyle = '#ff2e3d';
        rctx.lineWidth = 1.5;
        rctx.setLineDash([3, 3]);
        rctx.beginPath(); rctx.moveTo(j3x, j3y); rctx.lineTo(j3x + 40, j3y + 40); rctx.stroke();
        rctx.setLineDash([]);

        rAnim = requestAnimationFrame(drawRobot);
      };
      drawRobot();
    }

    // 2. Interactive Neural Network Graph Canvas Renderer
    let nAnim;
    if (neuralCanvas) {
      const nctx = neuralCanvas.getContext('2d');
      const nw = (neuralCanvas.width = neuralCanvas.parentElement.clientWidth || 380);
      const nh = (neuralCanvas.height = 160);
      let pulseProgress = 0;

      const layers = [
        [ {x: 40, y: 30}, {x: 40, y: 80}, {x: 40, y: 130} ],
        [ {x: 140, y: 25}, {x: 140, y: 65}, {x: 140, y: 105}, {x: 140, y: 145} ],
        [ {x: 240, y: 25}, {x: 240, y: 65}, {x: 240, y: 105}, {x: 240, y: 145} ],
        [ {x: 340, y: 50}, {x: 340, y: 110} ]
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
            nctx.beginPath(); nctx.arc(n.x, n.y, 5, 0, Math.PI * 2); nctx.fill();
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
      if (rAnim) cancelAnimationFrame(rAnim);
      if (nAnim) cancelAnimationFrame(nAnim);
    };
  });

  function updateAngle(type, val) {
    audio.playSound('technologic');
    if (type === 'base') baseAngle = val;
    if (type === 'elbow') elbowAngle = val;
    if (type === 'wrist') wristAngle = val;
  }
</script>

<div class="space-y-2 my-2 font-mono">
  <!-- 1. Interactive Robotic Arm Manipulator -->
  <div class="retro-sub-box p-3">
    <div class="sub-box-header">
      <span class="text-green-bright font-bold text-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
        <span>ROBOTICS // ROS2 6-DOF ROBOT ARM SIMULATOR</span>
      </span>
      <span class="text-muted text-[10px]">LIVE MANIPULATOR</span>
    </div>

    <!-- Robot Arm Canvas -->
    <div class="w-full h-44 bg-black border border-[var(--border-amber-dark)] rounded overflow-hidden mb-3">
      <canvas bind:this={robotCanvas} class="w-full h-full block"></canvas>
    </div>

    <!-- Joint Angle Control Sliders -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-black p-2.5 rounded border border-[var(--border-amber-dark)]">
      <div>
        <div class="flex justify-between text-[10px] text-amber mb-1">
          <span>BASE ANGLE</span>
          <span class="text-green-bright font-bold">{baseAngle}°</span>
        </div>
        <input 
          type="range" min="0" max="180" bind:value={baseAngle}
          oninput={(e) => updateAngle('base', +e.target.value)}
          class="w-full accent-amber cursor-pointer"
        />
      </div>

      <div>
        <div class="flex justify-between text-[10px] text-amber mb-1">
          <span>ELBOW ANGLE</span>
          <span class="text-green-bright font-bold">{elbowAngle}°</span>
        </div>
        <input 
          type="range" min="-90" max="90" bind:value={elbowAngle}
          oninput={(e) => updateAngle('elbow', +e.target.value)}
          class="w-full accent-amber cursor-pointer"
        />
      </div>

      <div>
        <div class="flex justify-between text-[10px] text-amber mb-1">
          <span>WRIST ANGLE</span>
          <span class="text-green-bright font-bold">{wristAngle}°</span>
        </div>
        <input 
          type="range" min="-90" max="90" bind:value={wristAngle}
          oninput={(e) => updateAngle('wrist', +e.target.value)}
          class="w-full accent-amber cursor-pointer"
        />
      </div>
    </div>
  </div>

  <!-- 2. AI / Neural Network Signal Flow Topology -->
  <div class="retro-sub-box p-3">
    <div class="sub-box-header">
      <span class="text-purple font-bold text-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-purple animate-ping"></span>
        <span>AI // PYTORCH DEEP NEURAL NETWORK TOPOLOGY</span>
      </span>
      <span class="text-muted text-[10px]">REAL-TIME SIGNAL PULSE</span>
    </div>

    <div class="w-full h-40 bg-black border border-[var(--border-amber-dark)] rounded overflow-hidden">
      <canvas bind:this={neuralCanvas} class="w-full h-full block"></canvas>
    </div>
  </div>
</div>
