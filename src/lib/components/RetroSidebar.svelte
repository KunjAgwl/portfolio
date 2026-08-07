<script>
  import { audio } from '../audio.js';
  import { onMount } from 'svelte';

  let { activeTab = 'HOME', onSelectTab = () => {} } = $props();

  let isPlaying = $state(false);
  let secondsElapsed = $state(47);
  let activeTrackIndex = $state(0);

  let helmetCanvas;
  let waveformCanvas;

  const menuItems = [
    { id: 'HOME', label: '01: HOME' },
    { id: 'ABOUT', label: '02: ABOUT' },
    { id: 'PROJECTS', label: '03: PROJECTS' },
    { id: 'REWIND', label: '04: REWIND' },
    { id: 'VENTURES', label: '05: VENTURES' },
    { id: 'CONTACT', label: '06: CONTACT' }
  ];

  const tracks = [
    { artist: 'KUNJ AGARWAL', title: 'TOUCH (INSTRUMENTAL)' },
    { artist: 'KUNJ AGARWAL', title: 'HARDER BETTER FASTER' },
    { artist: 'KUNJ AGARWAL', title: 'AROUND THE WORLD' },
    { artist: 'KUNJ AGARWAL', title: 'HUMAN AFTER ALL' }
  ];

  let formattedTime = $derived(() => {
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  });

  onMount(() => {
    // 1. Helmet Canvas Stipple Art
    if (helmetCanvas) {
      const hctx = helmetCanvas.getContext('2d');
      const size = (helmetCanvas.width = helmetCanvas.height = 120);
      hctx.fillStyle = '#040404';
      hctx.fillRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      hctx.fillStyle = '#e6a15c';
      for (let y = -45; y <= 45; y += 2) {
        for (let x = -35; x <= 35; x += 2) {
          if ((x * x) / (35 * 35) + (y * y) / (45 * 45) <= 1) {
            const isVisor = y >= -12 && y <= 12 && Math.abs(x) <= 33;
            if (Math.random() < 0.8) {
              hctx.fillStyle = isVisor ? (Math.random() > 0.25 ? '#fbb36b' : '#332211') : (Math.random() > 0.35 ? '#e6a15c' : '#544131');
              hctx.fillRect(cx + x, cy + y, 1.5, 1.5);
            }
          }
        }
      }
    }

    // 2. Real-Time Audio Module Oscilloscope Waveform Canvas
    let waveAnim;
    if (waveformCanvas) {
      const wctx = waveformCanvas.getContext('2d');
      const ww = (waveformCanvas.width = waveformCanvas.parentElement.clientWidth || 200);
      const wh = (waveformCanvas.height = 36);
      let phase = 0;

      const drawWaveform = () => {
        wctx.clearRect(0, 0, ww, wh);
        wctx.fillStyle = '#050505';
        wctx.fillRect(0, 0, ww, wh);

        phase += isPlaying ? 0.2 : 0.03;

        const bars = 18;
        const barWidth = ww / bars;
        wctx.fillStyle = '#2d1f14';
        for (let i = 0; i < bars; i++) {
          const h = isPlaying ? Math.abs(Math.sin(phase + i * 0.45)) * (wh * 0.75) + 5 : 4;
          wctx.fillRect(i * barWidth + 1, wh - h, barWidth - 2, h);
        }

        wctx.strokeStyle = isPlaying ? '#33ff88' : '#44bba4';
        wctx.lineWidth = 1.6;
        wctx.shadowBlur = isPlaying ? 8 : 0;
        wctx.shadowColor = '#33ff88';

        wctx.beginPath();
        for (let x = 0; x < ww; x++) {
          const amp = isPlaying ? (wh * 0.38) : 2.5;
          const freq = isPlaying ? 0.09 : 0.04;
          const y = (wh / 2) + Math.sin(x * freq + phase) * amp * Math.cos(x * 0.02 + phase * 0.5);
          if (x === 0) wctx.moveTo(x, y);
          else wctx.lineTo(x, y);
        }
        wctx.stroke();

        waveAnim = requestAnimationFrame(drawWaveform);
      };
      drawWaveform();
    }

    const interval = setInterval(() => {
      if (isPlaying) {
        secondsElapsed = (secondsElapsed + 1) % 499;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (waveAnim) cancelAnimationFrame(waveAnim);
      audio.stopBeat();
    };
  });

  function handleTabClick(id) {
    audio.playSound('technologic');
    onSelectTab(id);
  }

  function toggleAudio() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audio.startBeat();
    } else {
      audio.stopBeat();
    }
  }

  function nextTrack() {
    activeTrackIndex = (activeTrackIndex + 1) % tracks.length;
    audio.playSound('laser');
  }

  function prevTrack() {
    activeTrackIndex = (activeTrackIndex - 1 + tracks.length) % tracks.length;
    audio.playSound('kick');
  }
</script>

<aside class="retro-panel h-full flex flex-col justify-between font-mono text-xs select-none p-2.5">
  <div>
    <!-- Header Block -->
    <div class="border-b border-[var(--border-amber-dark)] pb-2 mb-2">
      <div class="text-amber font-bold text-xs tracking-wider flex items-center justify-between">
        <span>KUNJ.AGARWAL // PORTFOLIO</span>
        <span class="w-1.5 h-1.5 rounded-full bg-amber animate-ping"></span>
      </div>
      <div class="text-muted text-[10px]">ver. 1.0.1</div>
      <div class="text-amber opacity-40 text-[10px] truncate">====================</div>
    </div>

    <!-- Helmet Status Block -->
    <div class="mb-3">
      <div class="text-amber text-[10px]">&gt; HELMET STATUS</div>
      <div class="text-green-bright font-bold text-xs flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-green-bright animate-pulse"></span>
        <span>ONLINE</span>
      </div>

      <!-- High Definition Guy-Manuel Chrome 3D Helmet SVG -->
      <div class="w-full h-36 my-2 bg-black border border-[var(--border-amber)] rounded flex items-center justify-center overflow-hidden shadow-inner">
        <svg width="110" height="110" style="width: 110px; height: 110px;" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="42" fill="#040404" stroke="#241911" stroke-width="1"/>
          <path d="M50 12 C28 12 18 26 18 50 C18 74 30 88 50 88 C70 88 82 74 82 50 C82 26 72 12 50 12 Z" fill="#0c0a08" stroke="#e6a15c" stroke-width="2"/>
          <path d="M22 42 C22 28 32 18 50 18 C68 18 78 28 78 42" stroke="#7a5e42" stroke-width="1.5" stroke-dasharray="2 2"/>
          
          <path d="M24 38 L76 38 L72 58 L28 58 Z" fill="#e6a15c"/>
          <path d="M28 42 L72 42" stroke="#000000" stroke-width="2"/>
          
          <circle cx="65" cy="30" r="1.5" fill="#fbb36b" />
          <circle cx="68" cy="35" r="1.5" fill="#fbb36b" />
          <circle cx="70" cy="42" r="1.5" fill="#fbb36b" />
          <circle cx="67" cy="60" r="1.5" fill="#e6a15c" />
          <circle cx="62" cy="72" r="1.5" fill="#e6a15c" />

          <circle cx="18" cy="50" r="6" fill="#1c150e" stroke="#e6a15c" stroke-width="1.5"/>
          <circle cx="82" cy="50" r="6" fill="#1c150e" stroke="#e6a15c" stroke-width="1.5"/>

          <path d="M36 72 L64 72" stroke="#e6a15c" stroke-width="1.5"/>
          <path d="M40 76 L60 76" stroke="#7a5e42" stroke-width="1"/>
        </svg>
      </div>

      <div class="text-muted text-[10px]">SYS: ALL SYSTEMS NOMINAL</div>
    </div>

    <!-- Numbered Navigation Menu (SYNTH Option Removed) -->
    <nav class="flex flex-col gap-1 border-t border-[var(--border-amber-dark)] pt-2 mb-3">
      {#each menuItems as item}
        <button
          onclick={() => handleTabClick(item.id)}
          class="nav-menu-btn"
          class:active={activeTab === item.id}
        >
          <span>{item.label}</span>
          {#if activeTab === item.id}
            <span class="text-black font-bold">&lt;</span>
          {/if}
        </button>
      {/each}
    </nav>
  </div>

  <!-- Audio Module Box -->
  <div>
    <div class="retro-sub-box mb-2">
      <div class="sub-box-header">
        <span class="text-amber font-bold text-[11px] flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-green-bright" class:animate-ping={isPlaying}></span>
          <span>AUDIO MODULE</span>
        </span>
        <span class="text-muted text-[10px]">↗</span>
      </div>

      <div class="text-[10px] text-green font-bold">
        {tracks[activeTrackIndex].artist}
      </div>
      <div class="text-[10px] text-green-bright truncate mb-1">
        {tracks[activeTrackIndex].title}
      </div>

      <div class="flex justify-between text-[9px] text-muted mb-1 font-mono">
        <span>{formattedTime()}</span>
        <span>08:19</span>
      </div>

      <!-- Seek Bar -->
      <div class="w-full bg-[#1c150e] h-1 rounded my-1 border border-[#3d2b1f] overflow-hidden">
        <div class="bg-amber h-full transition-all duration-300" style="width: {(secondsElapsed / 499) * 100}%;"></div>
      </div>

      <!-- Real-Time Oscilloscope Waveform Canvas -->
      <div class="w-full h-9 bg-black border border-[var(--border-amber-dark)] rounded overflow-hidden my-1.5 shadow-inner">
        <canvas bind:this={waveformCanvas} class="w-full h-full block"></canvas>
      </div>

      <!-- Controls -->
      <div class="flex justify-center items-center gap-4 text-amber text-xs pt-1 border-t border-[var(--border-amber-dark)]">
        <button onclick={prevTrack} class="hover:text-amber-bright cursor-pointer font-bold transition-transform active:scale-95">◀◀</button>
        <button onclick={toggleAudio} class="hover:text-amber-bright cursor-pointer font-bold transition-transform active:scale-95 text-green-bright">
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button onclick={nextTrack} class="hover:text-amber-bright cursor-pointer font-bold transition-transform active:scale-95">▶▶</button>
      </div>
    </div>

    <!-- Copyright Footer -->
    <div class="text-[10px] text-muted text-center border-t border-[var(--border-amber-dark)] pt-1">
      © KUNJ.AGARWAL MMXXVI
    </div>
  </div>
</aside>
