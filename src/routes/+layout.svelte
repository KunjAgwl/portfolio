<script>
  import '../app.css';
  import HeaderNav from '../lib/components/HeaderNav.svelte';
  
  let { children } = $props();
  let theme = $state('gold');

  function toggleTheme() {
    theme = theme === 'gold' ? 'silver' : 'gold';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
</script>

<div class="min-h-screen flex flex-col font-body" data-theme={theme}>
  <HeaderNav {theme} onToggleTheme={toggleTheme} />
  
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
    {@render children()}
  </main>

  <footer class="border-t border-white/10 py-8 px-4 text-center font-mono text-xs text-slate-400 mt-16 bg-black/60 backdrop-blur">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <span class="text-amber-400 font-bold">KUNJ AGARWAL</span> // DAFT PUNK CYBER EDITION
      </div>
      <div>
        3RD YEAR CSE VIT CHENNAI • CO-FOUNDER MERRICKSON SERVICES & RAAW THEORY MEDIA
      </div>
      <div>
        SYNTHESIZED WITH SVELTEKIT & WEB AUDIO API
      </div>
    </div>
  </footer>
</div>
