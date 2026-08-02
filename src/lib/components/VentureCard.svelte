<script>
  import { TrendingUp, Rocket, ShieldCheck, Award, Layers } from '@lucide/svelte';
  let { theme = 'gold' } = $props();

  let activeTab = $state('MERRICKSON');
</script>

<div class="ventures-section my-6">
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
        <Award class="w-5 h-5" />
      </div>
      <div>
        <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-gold-gradient uppercase">
          02 // VENTURES & REVENUE DECK
        </h2>
        <p class="font-mono text-[11px] text-slate-400">CO-FOUNDED AGENCIES & METRIC TRACK RECORD</p>
      </div>
    </div>

    <!-- Venture Tab Switcher -->
    <div class="flex gap-1.5">
      <button 
        onclick={() => activeTab = 'MERRICKSON'}
        class="px-3 py-1 rounded font-mono text-[11px] font-bold uppercase transition-all border"
        class:bg-amber-400={activeTab === 'MERRICKSON'}
        class:text-black={activeTab === 'MERRICKSON'}
        class:border-amber-400={activeTab === 'MERRICKSON'}
        class:border-white-10={activeTab !== 'MERRICKSON'}
        class:text-slate-400={activeTab !== 'MERRICKSON'}
      >
        MERRICKSON
      </button>

      <button 
        onclick={() => activeTab = 'RAAW_THEORY'}
        class="px-3 py-1 rounded font-mono text-[11px] font-bold uppercase transition-all border"
        class:bg-cyan-400={activeTab === 'RAAW_THEORY'}
        class:text-black={activeTab === 'RAAW_THEORY'}
        class:border-cyan-400={activeTab === 'RAAW_THEORY'}
        class:border-white-10={activeTab !== 'RAAW_THEORY'}
        class:text-slate-400={activeTab !== 'RAAW_THEORY'}
      >
        RAAW THEORY
      </button>
    </div>
  </div>

  <!-- Key Revenue Metric Spotlight -->
  <div class="revenue-banner relative overflow-hidden rounded-xl p-5 mb-4 border border-amber-400/30 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 shadow-xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div class="md:col-span-2">
        <div class="font-mono text-[11px] text-amber-400 tracking-wider mb-1">
          FINANCIAL MILESTONE // CO-FOUNDER TRACK RECORD
        </div>
        <h3 class="font-display text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight">
          <span class="text-gold-gradient">₹2,00,000 REVENUE</span> GENERATED IN 2 MONTHS
        </h3>
        <p class="text-slate-300 text-xs mt-2 leading-relaxed font-mono">
          Co-founded <strong class="text-amber-300">Merrickson Services</strong> and <strong class="text-cyan-300">Raaw Theory Media</strong>. Scaled client web architecture, software engineering, and visual media to reach ₹2 Lakhs in revenue within 60 days.
        </p>
      </div>

      <div class="bg-black/80 p-3.5 rounded-lg border border-white/10 flex flex-col gap-2">
        <div class="flex justify-between items-center font-mono text-[11px] border-b border-white/10 pb-1">
          <span class="text-slate-400">TOTAL REVENUE:</span>
          <span class="text-emerald-400 font-bold">₹200,000 INR</span>
        </div>
        <div class="flex justify-between items-center font-mono text-[11px] border-b border-white/10 pb-1">
          <span class="text-slate-400">TIMELINE:</span>
          <span class="text-amber-400 font-bold">60 DAYS</span>
        </div>
        <div class="flex justify-between items-center font-mono text-[11px]">
          <span class="text-slate-400">SUCCESS RATE:</span>
          <span class="text-cyan-400 font-bold">100% DELIVERED</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Active Venture Card -->
  {#if activeTab === 'MERRICKSON'}
    <div class="chrome-card p-5">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2.5">
          <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
            <Rocket class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-display text-xl font-bold text-white tracking-wide">MERRICKSON SERVICES</h3>
            <p class="font-mono text-[10px] text-amber-400 uppercase">CO-FOUNDER & TECH LEAD</p>
          </div>
        </div>
        <span class="font-mono text-[10px] px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          ACTIVE VENTURE
        </span>
      </div>

      <p class="text-slate-300 text-xs font-mono leading-relaxed mb-4">
        Full-scale technology agency providing bespoke web development, mobile software engineering, custom REST API microservices, and automated client software infrastructures.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
        <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 text-slate-300">
          <ShieldCheck class="w-4 h-4 text-emerald-400" />
          <span>Client Web & App Engineering</span>
        </div>
        <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 text-slate-300">
          <ShieldCheck class="w-4 h-4 text-emerald-400" />
          <span>API & Microservice Architectures</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="chrome-card p-5">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2.5">
          <div class="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
            <Layers class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-display text-xl font-bold text-white tracking-wide">RAAW THEORY MEDIA</h3>
            <p class="font-mono text-[10px] text-cyan-400 uppercase">CO-FOUNDER & MEDIA ARCHITECT</p>
          </div>
        </div>
        <span class="font-mono text-[10px] px-2.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-semibold">
          ACTIVE VENTURE
        </span>
      </div>

      <p class="text-slate-300 text-xs font-mono leading-relaxed mb-4">
        Digital media and creative technology house specializing in brand design, dynamic media systems, visual UI/UX identity, and interactive web showcases.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
        <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 text-slate-300">
          <ShieldCheck class="w-4 h-4 text-cyan-400" />
          <span>Digital Brand & Content Strategy</span>
        </div>
        <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 text-slate-300">
          <ShieldCheck class="w-4 h-4 text-cyan-400" />
          <span>Interactive Visual UI/UX & Motion Design</span>
        </div>
      </div>
    </div>
  {/if}
</div>
