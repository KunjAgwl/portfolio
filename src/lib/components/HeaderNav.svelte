<script>
  import { audio } from '../audio.js';
  import { Volume2, VolumeX, Sparkles, Disc, Terminal } from '@lucide/svelte';

  let { theme = 'gold', onToggleTheme = () => {} } = $props();

  let isMuted = $state(false);

  function toggleAudio() {
    isMuted = audio.toggleMute();
  }
</script>

<header class="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10 px-4 sm:px-8 py-3 transition-all duration-300">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <!-- Brand Logo -->
    <a href="#hero" class="flex items-center gap-3 group">
      <div class="p-2 rounded-xl border transition-all duration-300 group-hover:scale-105"
        class:border-amber-400={theme === 'gold'}
        class:border-cyan-400={theme === 'silver'}
        class:bg-amber-500-10={theme === 'gold'}
        class:bg-cyan-500-10={theme === 'silver'}
      >
        <Disc class="w-6 h-6 animate-spin" style="color: {theme === 'gold' ? '#ffd700' : '#00f0ff'}; animation-duration: 10s;" />
      </div>

      <div>
        <div class="font-display font-black text-lg sm:text-xl tracking-wider text-white group-hover:text-amber-300 transition-colors">
          KUNJ AGARWAL
        </div>
        <div class="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          VIT CHENNAI CSE // ROBOTICS & AI
        </div>
      </div>
    </a>

    <!-- Navigation Links -->
    <nav class="hidden lg:flex items-center gap-6 font-mono text-xs text-slate-300">
      <a href="#pyramid" class="hover:text-amber-400 transition-colors">STAGE</a>
      <a href="#ventures" class="hover:text-amber-400 transition-colors flex items-center gap-1">
        <span>VENTURES</span>
        <span class="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[9px]">₹200K</span>
      </a>
      <a href="#skills" class="hover:text-amber-400 transition-colors">SKILLS</a>
      <a href="#projects" class="hover:text-amber-400 transition-colors">PROJECTS</a>
      <a href="#terminal" class="hover:text-amber-400 transition-colors">TERMINAL</a>
    </nav>

    <!-- Controls & Actions -->
    <div class="flex items-center gap-3">
      <!-- Persona Switcher -->
      <button 
        onclick={onToggleTheme}
        class="px-3 py-1.5 rounded-lg border font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center gap-1.5"
        class:border-amber-400={theme === 'gold'}
        class:text-amber-300={theme === 'gold'}
        class:border-cyan-400={theme === 'silver'}
        class:text-cyan-300={theme === 'silver'}
        title="Toggle Daft Punk Persona (Gold / Silver)"
      >
        <Sparkles class="w-3.5 h-3.5" />
        <span>{theme === 'gold' ? 'GOLD MODE' : 'SILVER MODE'}</span>
      </button>

      <!-- Audio Mute Button -->
      <button 
        onclick={toggleAudio}
        class="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
        aria-label="Toggle Sound"
        title="Toggle Synthesizer Sound"
      >
        {#if isMuted}
          <VolumeX class="w-4 h-4 text-red-500" />
        {:else}
          <Volume2 class="w-4 h-4 text-emerald-400 animate-pulse" />
        {/if}
      </button>

      <!-- GitHub Link -->
      <a 
        href="https://github.com/KunjAgwl"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        aria-label="GitHub Profile"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  </div>
</header>

<style>
  .animate-spin-slow {
    animation: spin 10s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
