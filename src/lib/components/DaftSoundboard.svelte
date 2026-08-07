<script>
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  const pads = [
    { label: 'HARDER', sound: 'harder', key: 'Q' },
    { label: 'BETTER', sound: 'better', key: 'W' },
    { label: 'FASTER', sound: 'faster', key: 'E' },
    { label: 'STRONGER', sound: 'stronger', key: 'R' },
    { label: 'ROBOT', sound: 'robot', key: 'A' },
    { label: 'HUMAN', sound: 'human', key: 'S' },
    { label: 'TECHNOLOGIC', sound: 'technologic', key: 'D' },
    { label: 'DISCO BASS', sound: 'funk', key: 'F' },
    { label: 'KICK', sound: 'kick', key: 'Z' },
    { label: 'SNARE', sound: 'snare', key: 'X' },
    { label: 'LASER', sound: 'laser', key: 'C' }
  ];

  let activePad = $state(null);

  function triggerSound(pad) {
    activePad = pad.label;
    audio.playSound(pad.sound);
    setTimeout(() => {
      if (activePad === pad.label) activePad = null;
    }, 200);
  }
</script>

<div class="retro-sub-box font-mono my-2 p-3">
  <div class="sub-box-header">
    <span class="text-amber-bright font-bold text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>VOCODER SYNTHESIZER SOUNDBOARD</span>
    </span>
    <span class="text-muted text-[10px]">↗</span>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
    {#each pads as p}
      <button
        onclick={() => triggerSound(p)}
        class="bg-black p-2.5 rounded border border-[var(--border-amber)] hover:border-amber transition-all cursor-pointer text-left flex flex-col justify-between h-16 select-none active:scale-95"
        class:bg-amber={activePad === p.label}
        class:text-black={activePad === p.label}
        class:font-bold={activePad === p.label}
      >
        <div class="flex justify-between items-center text-[9px] opacity-70">
          <span>[{p.key}]</span>
          <span>♪</span>
        </div>
        <div class="text-xs font-bold truncate">
          {p.label}
        </div>
      </button>
    {/each}
  </div>
</div>
