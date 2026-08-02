<script>
  import { audio } from '../audio.js';
  import { Volume2, VolumeX, Disc, Zap } from '@lucide/svelte';

  let { theme = 'gold' } = $props();

  let isMuted = $state(false);
  let activePad = $state(null);

  const vocalPads = [
    { id: 'harder', label: 'HARDER', note: 'A4 Synth', color: '#ffd700' },
    { id: 'better', label: 'BETTER', note: 'C#5 Synth', color: '#00f0ff' },
    { id: 'faster', label: 'FASTER', note: 'E5 Synth', color: '#ff0055' },
    { id: 'stronger', label: 'STRONGER', note: 'A5 Octave', color: '#00ff66' },
    { id: 'robot', label: 'ROBOT', note: 'Vocoder FX', color: '#ffaa00' },
    { id: 'human', label: 'HUMAN', note: 'Filter Sweep', color: '#a855f7' },
    { id: 'technologic', label: 'TECHNOLOGIC', note: 'Arpeggio', color: '#ec4899' },
    { id: 'around_world', label: 'DISCO BASS', note: 'Funk Loop', color: '#3b82f6' }
  ];

  const rhythmPads = [
    { id: 'kick', label: 'KICK DRUM', type: 'Beat' },
    { id: 'snare', label: 'SNARE DRUM', type: 'Beat' },
    { id: 'laser', label: 'LASER ZAP', type: 'FX' }
  ];

  function triggerPad(id) {
    activePad = id;
    audio.playSound(id);
    setTimeout(() => {
      if (activePad === id) activePad = null;
    }, 200);
  }

  function toggleMute() {
    isMuted = audio.toggleMute();
  }
</script>

<div class="soundboard-card chrome-card p-4 sm:p-5 my-4">
  <div class="flex flex-wrap justify-between items-center mb-4 gap-3 border-b border-white/10 pb-3">
    <div>
      <div class="flex items-center gap-2">
        <Disc class="w-5 h-5 text-amber-400 animate-spin" style="animation-duration: 8s;" />
        <h2 class="font-display text-lg sm:text-xl font-bold tracking-wider text-glow uppercase">
          ALIVE SYNTH SOUNDBOARD
        </h2>
      </div>
      <p class="font-mono text-[11px] text-slate-400 mt-0.5">
        WEB AUDIO API SYNTHESIZER // ZERO AUDIO FILES REQUIRED
      </p>
    </div>

    <button 
      onclick={toggleMute} 
      class="led-button text-[11px] py-1.5 px-3"
      aria-label="Toggle Sound"
    >
      {#if isMuted}
        <VolumeX class="w-3.5 h-3.5 text-red-500" />
        <span>MUTED</span>
      {:else}
        <Volume2 class="w-3.5 h-3.5 text-emerald-400" />
        <span>AUDIO ON</span>
      {/if}
    </button>
  </div>

  <!-- Robot Vocal Launchpad Grid -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
    {#each vocalPads as pad}
      <button
        onclick={() => triggerPad(pad.id)}
        class="pad-button relative p-2.5 rounded-lg border font-display flex flex-col items-center justify-center transition-all duration-150 select-none overflow-hidden"
        class:active={activePad === pad.id}
        style="border-color: {pad.color}40; background: linear-gradient(180deg, rgba(16,18,26,0.8) 0%, rgba(8,9,14,0.95) 100%);"
      >
        <span class="text-[10px] font-mono text-slate-400 mb-0.5">{pad.note}</span>
        <span class="text-sm font-bold tracking-wide" style="color: {pad.color};">
          {pad.label}
        </span>
        <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style="background-color: {pad.color};"></span>
      </button>
    {/each}
  </div>

  <!-- Rhythm & FX Section -->
  <div class="bg-black/30 p-3 rounded-lg border border-white/5 flex flex-wrap justify-between items-center gap-2">
    <div class="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
      <Zap class="w-3.5 h-3.5 text-cyan-400" />
      <span>PERCUSSION ENGINE</span>
    </div>

    <div class="flex flex-wrap gap-2">
      {#each rhythmPads as rpad}
        <button
          onclick={() => triggerPad(rpad.id)}
          class="px-3 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500 hover:text-black"
          class:active={activePad === rpad.id}
        >
          {rpad.label}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .pad-button:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.4) !important;
  }

  .pad-button:active, .pad-button.active {
    transform: scale(0.97);
    filter: brightness(1.5);
  }
</style>
