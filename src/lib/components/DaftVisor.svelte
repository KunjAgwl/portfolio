<script>
  import { audio } from '../audio.js';

  let { 
    theme = 'gold', 
    text = "KUNJ AGARWAL // 3RD YEAR CSE VIT CHENNAI // ROBOTICS • ML/DL • WEB & APP DEV // CO-FOUNDER MERRICKSON SERVICES & RAAW THEORY MEDIA // ₹2 LAKH REVENUE IN 2 MONTHS // HARDER BETTER FASTER STRONGER" 
  } = $props();

  let isFlashing = $state(false);

  function triggerVisorFlash() {
    audio.playLaser();
    isFlashing = true;
    setTimeout(() => {
      isFlashing = false;
    }, 300);
  }
</script>

<div class="visor-wrapper relative flex flex-col items-center justify-center py-2 px-2">
  <!-- Helmet Graphic Shell -->
  <div 
    class="helmet-frame relative w-full max-w-xl bg-gradient-to-b from-zinc-900 via-slate-950 to-black p-4 rounded-2xl border transition-all duration-300 shadow-xl cursor-pointer select-none"
    class:gold-theme={theme === 'gold'}
    class:silver-theme={theme === 'silver'}
    class:flashing={isFlashing}
    onclick={triggerVisorFlash}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Enter' && triggerVisorFlash()}
  >
    <!-- Helmet Top Ridge -->
    <div class="helmet-ridge flex justify-between items-center mb-2 px-2">
      <div class="flex items-center gap-1.5">
        <span class="status-dot"></span>
        <span class="font-mono text-[10px] tracking-widest uppercase text-slate-400">
          VISOR HUD // OPERATIONAL
        </span>
      </div>
      <div class="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 uppercase">
        {theme === 'gold' ? 'GUY-MANUEL (GOLD)' : 'THOMAS (SILVER)'}
      </div>
    </div>

    <!-- LED Visor Screen Outer Rim -->
    <div class="visor-rim relative p-2 rounded-xl overflow-hidden">
      <!-- Visor LED Screen -->
      <div class="visor-screen relative h-20 sm:h-24 rounded-lg flex items-center overflow-hidden border border-white/10">
        <div class="scanline-overlay"></div>
        <div class="grid-mesh"></div>

        <!-- Animated Scrolling LED Text -->
        <div class="led-marquee-container w-full whitespace-nowrap overflow-hidden">
          <div class="led-text-track flex items-center font-display text-sm sm:text-base font-bold tracking-widest">
            <span class="marquee-text px-4">{text}</span>
            <span class="marquee-text px-4">{text}</span>
          </div>
        </div>

        <!-- Equalizer Spectrum Bar -->
        <div class="visor-eq-bar absolute bottom-1.5 left-4 right-4 flex justify-between items-end h-2.5 gap-0.5 opacity-70">
          {#each Array(28) as _, i}
            <div 
              class="eq-pillar flex-1 rounded-t"
              style="height: {Math.floor(20 + Math.random() * 80)}%; animation: pulsePillar 0.5s infinite alternate {i * 0.04}s;"
            ></div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Hint -->
    <div class="mt-2 flex justify-between items-center px-2 font-mono text-[10px] text-slate-400">
      <span>[ CLICK HELMET FOR AUDIO PULSE ]</span>
      <span>[ LIVE LED HUD v3.0 ]</span>
    </div>
  </div>
</div>

<style>
  .gold-theme {
    border-color: rgba(255, 215, 0, 0.4);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
  }

  .gold-theme .visor-rim {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(15, 15, 18, 0.95) 100%);
    border: 1px solid rgba(255, 215, 0, 0.3);
  }

  .gold-theme .visor-screen {
    background: #080700;
    box-shadow: inset 0 0 20px rgba(255, 215, 0, 0.25);
  }

  .gold-theme .marquee-text {
    color: #ffd700;
    text-shadow: 0 0 8px #ffd700, 0 0 15px rgba(255, 215, 0, 0.5);
  }

  .gold-theme .eq-pillar {
    background: #ffd700;
  }

  .silver-theme {
    border-color: rgba(0, 240, 255, 0.4);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
  }

  .silver-theme .visor-rim {
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(15, 15, 18, 0.95) 100%);
    border: 1px solid rgba(0, 240, 255, 0.3);
  }

  .silver-theme .visor-screen {
    background: #00080a;
    box-shadow: inset 0 0 20px rgba(0, 240, 255, 0.25);
  }

  .silver-theme .marquee-text {
    color: #00f0ff;
    text-shadow: 0 0 8px #00f0ff, 0 0 15px rgba(0, 240, 255, 0.5);
  }

  .silver-theme .eq-pillar {
    background: #00f0ff;
  }

  .flashing {
    filter: brightness(1.4);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #00ff66;
  }

  .led-text-track {
    animation: marquee-scroll 28s linear infinite;
  }

  @keyframes marquee-scroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .scanline-overlay {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3) 0px,
      rgba(0, 0, 0, 0.3) 1px,
      transparent 1px,
      transparent 3px
    );
    pointer-events: none;
    z-index: 10;
  }

  .grid-mesh {
    position: absolute;
    inset: 0;
    background-size: 6px 6px;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    pointer-events: none;
    z-index: 5;
  }

  @keyframes pulsePillar {
    0% { height: 20%; }
    100% { height: 95%; }
  }
</style>
