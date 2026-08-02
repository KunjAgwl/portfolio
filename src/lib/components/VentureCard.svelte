<script>
  import { TrendingUp, Rocket, ShieldCheck, Award, Layers } from '@lucide/svelte';
  let { theme = 'gold' } = $props();
</script>

<div class="ventures-section my-6">
  <div class="flex items-center gap-2 mb-4">
    <div class="p-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
      <Award class="w-5 h-5" />
    </div>
    <div>
      <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-glow uppercase">
        VENTURES & CO-FOUNDING SPOTLIGHT
      </h2>
      <p class="font-mono text-[11px] text-slate-400">DIGITAL SERVICES & MEDIA AGENCIES</p>
    </div>
  </div>

  <!-- Key Revenue Banner -->
  <div class="revenue-banner relative overflow-hidden rounded-xl p-5 sm:p-6 mb-6 border border-amber-400/30 bg-gradient-to-r from-amber-950/40 via-zinc-950/80 to-amber-950/40 shadow-xl">
    <div class="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
      <TrendingUp class="w-48 h-48 text-amber-400" />
    </div>

    <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div class="md:col-span-2">
        <div class="pulse-badge mb-2">
          <span class="pulse-dot"></span>
          <span>MILESTONE // CO-FOUNDER TRACK RECORD</span>
        </div>
        <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide leading-snug">
          <span class="text-amber-400 text-glow-gold">₹2,00,000 IN REVENUE</span> IN JUST 2 MONTHS
        </h3>
        <p class="text-slate-300 text-xs mt-2 leading-relaxed font-mono">
          Co-founded <strong class="text-amber-300">Merrickson Services</strong> and <strong class="text-cyan-300">Raaw Theory Media</strong> alongside my partner. Scaled digital services, web engineering, and visual media to reach ₹2 Lakhs in revenue within 60 days.
        </p>
      </div>

      <div class="bg-black/50 backdrop-blur p-4 rounded-lg border border-white/10 flex flex-col justify-center gap-2">
        <div class="flex justify-between items-center border-b border-white/10 pb-1.5 font-mono text-[11px]">
          <span class="text-slate-400">TOTAL REVENUE:</span>
          <span class="text-emerald-400 font-bold">₹200,000+ INR</span>
        </div>
        <div class="flex justify-between items-center border-b border-white/10 pb-1.5 font-mono text-[11px]">
          <span class="text-slate-400">TIMELINE:</span>
          <span class="text-amber-400 font-bold">60 DAYS</span>
        </div>
        <div class="flex justify-between items-center font-mono text-[11px]">
          <span class="text-slate-400">CLIENT DELIVERABLES:</span>
          <span class="text-cyan-400 font-bold">100% SUCCESS</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Cards Grid for Merrickson Services & Raaw Theory Media -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Merrickson Services Card -->
    <div class="chrome-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-3">
          <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
            <Rocket class="w-6 h-6" />
          </div>
          <span class="font-mono text-[10px] px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
            CO-FOUNDER & TECH LEAD
          </span>
        </div>
        <h3 class="font-display text-xl font-bold text-white tracking-wide mb-1.5">
          MERRICKSON SERVICES
        </h3>
        <p class="text-slate-300 text-xs font-mono leading-relaxed mb-3">
          Technology agency providing client web development, mobile application architecture, cloud deployment, and custom software solutions.
        </p>

        <div class="space-y-1.5 mb-4">
          <div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
            <span>Client Web & Mobile Software Engineering</span>
          </div>
          <div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise Integration & API Architecture</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[10px]">
        <span class="text-slate-400">ROLE: CO-FOUNDER</span>
        <span class="text-amber-400">ACTIVE VENTURE</span>
      </div>
    </div>

    <!-- Raaw Theory Media Card -->
    <div class="chrome-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-3">
          <div class="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
            <Layers class="w-6 h-6" />
          </div>
          <span class="font-mono text-[10px] px-2.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-semibold">
            CO-FOUNDER & MEDIA ARCHITECT
          </span>
        </div>
        <h3 class="font-display text-xl font-bold text-white tracking-wide mb-1.5">
          RAAW THEORY MEDIA
        </h3>
        <p class="text-slate-300 text-xs font-mono leading-relaxed mb-3">
          Digital media and creative technology house specializing in brand design, dynamic content systems, and visual web experiences.
        </p>

        <div class="space-y-1.5 mb-4">
          <div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <ShieldCheck class="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Brand Architecture & Strategy</span>
          </div>
          <div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <ShieldCheck class="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Visual UI/UX & Motion Design</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[10px]">
        <span class="text-slate-400">ROLE: CO-FOUNDER</span>
        <span class="text-cyan-400">ACTIVE VENTURE</span>
      </div>
    </div>
  </div>
</div>
